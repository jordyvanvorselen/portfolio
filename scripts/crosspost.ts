// Usage: PAYLOAD_EMAIL=... PAYLOAD_PASSWORD=... pnpm crosspost <substack post url>
import { Window } from 'happy-dom'

import { crosspost } from '@/lib/substack/crosspost'

const readEnv = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Set ${name} to crosspost.`)
  }
  return value
}

const main = async () => {
  const postUrl = process.argv[2]
  if (!postUrl) {
    throw new Error('Usage: pnpm crosspost <substack post url>')
  }

  const window = new Window()
  const result = await crosspost(postUrl, {
    payloadUrl:
      process.env['PAYLOAD_URL'] ?? 'https://www.jordyvanvorselen.com',
    email: readEnv('PAYLOAD_EMAIL'),
    password: readEnv('PAYLOAD_PASSWORD'),
    parseHtml: html => {
      const container = window.document.createElement('div')
      container.innerHTML = html
      return container as unknown as Element
    },
  })
  await window.happyDOM.close()

  console.log(`Draft created: ${result.adminUrl}`)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
