import { http, HttpResponse } from 'msw'

import { crosspost } from '@/lib/substack/crosspost'
import { server } from '@/test/msw/register.server'

const PAYLOAD = 'https://blog.test'
const SUBSTACK = 'https://jordyvanvorselen.substack.com'

const settings = {
  payloadUrl: PAYLOAD,
  email: 'jordy@example.test',
  password: 'secret',
  parseHtml: (html: string) => {
    const container = document.createElement('div')
    container.innerHTML = html
    return container
  },
}

const substackPost = {
  title: 'Why your team gets slower every time a senior leaves',
  subtitle: 'Their workflow left with them. Here’s how to keep it.',
  slug: 'why-your-team-gets-slower',
  post_date: '2026-09-24T07:33:34.821Z',
  cover_image:
    'https://substack-post-media.s3.amazonaws.com/public/images/cover.png',
  canonical_url: `${SUBSTACK}/p/why-your-team-gets-slower`,
  postTags: [{ name: 'AI Native Engineering' }, { name: 'Developer Tools' }],
  body_html: '<p>Your most experienced senior engineer has just resigned.</p>',
}

interface Recorded {
  createdPost?: Record<string, unknown>
  uploads: { alt: string; filename: string }[]
}

const givenPayloadAndSubstack = (
  post: Record<string, unknown> = substackPost,
  existingPosts: Record<string, unknown>[] = []
): Recorded => {
  const recorded: Recorded = { uploads: [] }
  let nextMediaId = 100

  server.use(
    http.get(`${SUBSTACK}/api/v1/posts/:slug`, () => HttpResponse.json(post)),
    http.get(
      'https://substack-post-media.s3.amazonaws.com/public/images/:file',
      () =>
        HttpResponse.arrayBuffer(new ArrayBuffer(8), {
          headers: { 'Content-Type': 'image/png' },
        })
    ),
    http.post(`${PAYLOAD}/api/users/login`, () =>
      HttpResponse.json({ token: 'jwt-token' })
    ),
    http.get(`${PAYLOAD}/api/posts`, ({ request }) => {
      const query = new URL(request.url).searchParams
      const slug = query.get('where[slug][equals]')
      const canonicalUrl = query.get('where[canonicalUrl][equals]')
      const docs = existingPosts.filter(
        existing =>
          (slug !== null && existing['slug'] === slug) ||
          (canonicalUrl !== null && existing['canonicalUrl'] === canonicalUrl)
      )
      return HttpResponse.json({ docs })
    }),
    http.post(`${PAYLOAD}/api/media`, async ({ request }) => {
      const form = await request.formData()
      const file = form.get('file') as File
      const { alt } = JSON.parse(form.get('_payload') as string) as {
        alt: string
      }
      recorded.uploads.push({ alt, filename: file.name })
      return HttpResponse.json({ doc: { id: nextMediaId++ } })
    }),
    http.post(`${PAYLOAD}/api/posts`, async ({ request }) => {
      if (request.headers.get('Authorization') !== 'JWT jwt-token') {
        return HttpResponse.json({ errors: [] }, { status: 401 })
      }
      recorded.createdPost = (await request.json()) as Record<string, unknown>
      return HttpResponse.json({ doc: { id: 7 } })
    })
  )

  return recorded
}

describe('crosspost', () => {
  it('creates a draft blog post from the Substack post, pointing back to Substack', async () => {
    const recorded = givenPayloadAndSubstack()

    const result = await crosspost(
      `${SUBSTACK}/p/why-your-team-gets-slower`,
      settings
    )

    expect(result).toEqual({
      id: 7,
      adminUrl: `${PAYLOAD}/admin/collections/posts/7`,
    })
    expect(recorded.createdPost).toEqual(
      expect.objectContaining({
        _status: 'draft',
        title: 'Why your team gets slower every time a senior leaves',
        slug: 'why-your-team-gets-slower',
        description: 'Their workflow left with them. Here’s how to keep it.',
        publicationDate: '2026-09-24T07:33:34.821Z',
        tags: ['AI Native Engineering', 'Developer Tools'],
        canonicalUrl: `${SUBSTACK}/p/why-your-team-gets-slower`,
        featuredImage: 100,
      })
    )
    expect(recorded.uploads).toEqual([
      {
        alt: 'Why your team gets slower every time a senior leaves',
        filename: 'cover.png',
      },
    ])
  })

  it('uploads the images in the post and places them in the content', async () => {
    const recorded = givenPayloadAndSubstack({
      ...substackPost,
      cover_image: null,
      body_html:
        '<div class="captioned-image-container"><figure><img src="https://substack-post-media.s3.amazonaws.com/public/images/robot.png" alt="A robot ignores the rules"></figure></div>',
    })

    await crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)

    expect(recorded.uploads).toEqual([
      { alt: 'A robot ignores the rules', filename: 'robot.png' },
    ])
    expect(recorded.createdPost).not.toHaveProperty('featuredImage')
    expect(recorded.createdPost?.['content']).toEqual({
      root: expect.objectContaining({
        children: [expect.objectContaining({ type: 'upload', value: 100 })],
      }),
    })
  })

  it('points link cards at the blog copy when the linked post is already crossposted', async () => {
    const recorded = givenPayloadAndSubstack(
      {
        ...substackPost,
        cover_image: null,
        body_html: `<div class="digest-post-embed" data-attrs="{&quot;title&quot;:&quot;Agents don’t care&quot;,&quot;cover_image&quot;:&quot;https://substack-post-media.s3.amazonaws.com/public/images/agents.png&quot;,&quot;canonical_url&quot;:&quot;${SUBSTACK}/p/agents&quot;}"></div>`,
      },
      [
        {
          slug: 'agents',
          canonicalUrl: `${SUBSTACK}/p/agents`,
          featuredImage: 55,
        },
      ]
    )

    await crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)

    expect(recorded.uploads).toEqual([])
    expect(recorded.createdPost?.['content']).toEqual({
      root: expect.objectContaining({
        children: [
          expect.objectContaining({
            fields: expect.objectContaining({
              blockType: 'linkCard',
              url: '/blog/agents',
              image: 55,
            }),
          }),
        ],
      }),
    })
  })

  it('points link cards at Substack when the linked post is not on the blog yet', async () => {
    const recorded = givenPayloadAndSubstack({
      ...substackPost,
      cover_image: null,
      body_html: `<div class="digest-post-embed" data-attrs="{&quot;title&quot;:&quot;Agents don’t care&quot;,&quot;cover_image&quot;:&quot;https://substack-post-media.s3.amazonaws.com/public/images/agents.png&quot;,&quot;canonical_url&quot;:&quot;${SUBSTACK}/p/agents&quot;}"></div>`,
    })

    await crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)

    expect(recorded.uploads).toEqual([
      { alt: 'Agents don’t care', filename: 'agents.png' },
    ])
    expect(recorded.createdPost?.['content']).toEqual({
      root: expect.objectContaining({
        children: [
          expect.objectContaining({
            fields: expect.objectContaining({
              url: `${SUBSTACK}/p/agents`,
              image: 100,
            }),
          }),
        ],
      }),
    })
  })

  it('refuses to crosspost a post that is already on the blog', async () => {
    const recorded = givenPayloadAndSubstack(substackPost, [
      { id: 3, slug: 'why-your-team-gets-slower' },
    ])

    await expect(
      crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)
    ).rejects.toThrow(
      `"why-your-team-gets-slower" is already on the blog: ${PAYLOAD}/admin/collections/posts/3`
    )
    expect(recorded.uploads).toEqual([])
    expect(recorded.createdPost).toBeUndefined()
  })

  it('explains when Payload rejects the login', async () => {
    givenPayloadAndSubstack()
    server.use(
      http.post(`${PAYLOAD}/api/users/login`, () =>
        HttpResponse.json({ errors: [] }, { status: 401 })
      )
    )

    await expect(
      crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)
    ).rejects.toThrow(`POST ${PAYLOAD}/api/users/login failed: 401`)
  })

  it('shortens long subtitles to the 150 characters a blog description allows', async () => {
    const recorded = givenPayloadAndSubstack({
      ...substackPost,
      subtitle: 'A'.repeat(200),
    })

    await crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)

    const description = recorded.createdPost?.['description'] as string
    expect(description).toHaveLength(150)
    expect(description.endsWith('...')).toBe(true)
  })

  it('explains when the Substack post cannot be found', async () => {
    givenPayloadAndSubstack()
    server.use(
      http.get(`${SUBSTACK}/api/v1/posts/:slug`, () =>
        HttpResponse.json({}, { status: 404 })
      )
    )

    await expect(
      crosspost(`${SUBSTACK}/p/does-not-exist`, settings)
    ).rejects.toThrow(`GET ${SUBSTACK}/api/v1/posts/does-not-exist failed: 404`)
  })

  it('asks for a subtitle, because every blog post needs a description', async () => {
    const recorded = givenPayloadAndSubstack({ ...substackPost, subtitle: '' })

    await expect(
      crosspost(`${SUBSTACK}/p/why-your-team-gets-slower`, settings)
    ).rejects.toThrow(
      'The Substack post has no subtitle. Add one on Substack: the blog uses it as the description.'
    )
    expect(recorded.createdPost).toBeUndefined()
  })
})
