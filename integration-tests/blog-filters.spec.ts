import { test } from '@/integration-tests/fixtures/pages.fixture'
import { expect } from '@playwright/test'

test.describe('Blog Filters', () => {
  test('filters blog posts by tag using URL parameters', async ({ page }) => {
    // Debug: log all network requests
    page.on('request', request => {
      console.log('Request:', request.url())
    })
    
    // Mock all Contentful API endpoints with debug logging
    await page.route(/.*contentful\.com.*/, route => {
      console.log('Mocking Contentful API request:', route.request().url())
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sys: { type: 'Array' },
          total: 2,
          items: [
            {
              sys: { 
                id: '1',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'react-hooks',
                title: 'React Hooks Guide',
                description: 'Learn about React hooks',
                publicationDate: '2024-01-01',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Learn about React hooks' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['React', 'JavaScript'],
              }
            },
            {
              sys: { 
                id: '2',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'python-tips',
                title: 'Python Tips',
                description: 'Useful Python tips',
                publicationDate: '2024-01-02',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Useful Python tips' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['Python'],
              }
            }
          ]
        })
      })
    })

    // Navigate to blog with React tag filter
    await page.goto('/blog?tag=React')

    // Should show only React posts
    await expect(page.getByText('React Hooks Guide')).toBeVisible()
    await expect(page.getByText('Python Tips')).not.toBeVisible()

    // React tag filter should be active (check for bg-teal-500 instead of 'active' class)
    await expect(page.getByRole('button', { name: 'React' })).toHaveClass(/bg-teal-500/)
  })

  test('filters blog posts by search query using URL parameters', async ({ page }) => {
    await page.route(/.*contentful\.com.*/, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sys: { type: 'Array' },
          total: 2,
          items: [
            {
              sys: { 
                id: '1',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'react-hooks',
                title: 'React Hooks Guide',
                description: 'Learn about React hooks',
                publicationDate: '2024-01-01',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Learn about React hooks' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['React'],
              }
            },
            {
              sys: { 
                id: '2',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'python-tips',
                title: 'Python Tips',
                description: 'Useful Python tips',
                publicationDate: '2024-01-02',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Useful Python tips' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['Python'],
              }
            }
          ]
        })
      })
    })

    // Navigate to blog with search query
    await page.goto('/blog?search=hooks')

    // Should show only posts matching search
    await expect(page.getByText('React Hooks Guide')).toBeVisible()
    await expect(page.getByText('Python Tips')).not.toBeVisible()

    // Search input should contain the query
    await expect(page.getByPlaceholder(/search/i)).toHaveValue('hooks')
  })

  test('combines tag and search filters', async ({ page }) => {
    await page.route(/.*contentful\.com.*/, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          sys: { type: 'Array' },
          total: 3,
          items: [
            {
              sys: { 
                id: '1',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'react-hooks',
                title: 'React Hooks Guide',
                description: 'Learn about React hooks',
                publicationDate: '2024-01-01',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Learn about React hooks' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['React', 'JavaScript'],
              }
            },
            {
              sys: { 
                id: '2',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'react-components',
                title: 'React Components',
                description: 'Building React components',
                publicationDate: '2024-01-02',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Building React components' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['React'],
              }
            },
            {
              sys: { 
                id: '3',
                contentType: { sys: { id: 'blogPost' } }
              },
              fields: {
                slug: 'python-tips',
                title: 'Python Tips',
                description: 'Useful Python tips',
                publicationDate: '2024-01-03',
                content: { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'Useful Python tips' }] }] },
                featuredImage: { fields: { file: { url: '//test-image.jpg' } } },
                tags: ['Python'],
              }
            }
          ]
        })
      })
    })

    // Navigate to blog with both tag and search filters
    await page.goto('/blog?tag=React&search=hooks')

    // Should show only posts matching both filters
    await expect(page.getByText('React Hooks Guide')).toBeVisible()
    await expect(page.getByText('React Components')).not.toBeVisible()
    await expect(page.getByText('Python Tips')).not.toBeVisible()
  })

  test('updates URL when using search input', async ({ page, homePage }) => {
    await page.goto('/blog')

    // Type in search input
    const searchInput = page.getByPlaceholder(/search/i)
    await searchInput.fill('react')

    // URL should be updated with debounced search
    await page.waitForURL('**/blog?search=react')
    await expect(page).toHaveURL(/.*\/blog\?search=react/)
  })

  test('updates URL when clicking tag filters', async ({ page }) => {
    await page.goto('/blog')

    // Wait for page to load and find the first available tag button (not "All")
    const tagButtons = page.getByRole('button').filter({ hasNotText: /^All$/i })
    const firstTag = tagButtons.first()
    
    // Click on first available tag filter
    await firstTag.click()

    // URL should be updated with a tag parameter
    await expect(page).toHaveURL(/.*\/blog\?tag=/)

    // Tag should be active (check for bg-teal-500)
    await expect(firstTag).toHaveClass(/bg-teal-500/)
  })

  test('shows all posts when "All" filter is selected', async ({ page }) => {
    // Start with a filter applied - use first available tag
    await page.goto('/blog')
    
    // Wait for page to load and get the first tag
    const tagButtons = page.getByRole('button').filter({ hasNotText: /^All$/i })
    const firstTag = tagButtons.first()
    await firstTag.click()
    
    // Now click "All" filter
    await page.getByRole('button', { name: /all/i }).click()

    // URL should be updated to remove filter
    await expect(page).toHaveURL('/blog')

    // All filter should be active (check for bg-teal-500 instead of 'active')
    await expect(page.getByRole('button', { name: /all/i })).toHaveClass(/bg-teal-500/)
  })
})