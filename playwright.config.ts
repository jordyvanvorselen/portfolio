import { defineConfig, devices } from '@playwright/test'

import '@/test/env.setup'

export default defineConfig({
  testDir: './integration-tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : '50%',
  reporter: process.env['CI'] ? 'blob' : 'dot',
  use: {
    baseURL: 'http://127.0.0.1:3001',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      pathTemplate:
        '{testDir}/{testFileDir}/__screenshots__/{arg}-{testFileName}-{projectName}{ext}',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'pnpm build && pnpm start -p 3001',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: !process.env['CI'],
    timeout: 120 * 1000,
    env: {
      NEXT_PUBLIC_E2E_TESTING: 'true',
      NEXT_PUBLIC_MOCK_BACKEND: 'true',
    },
  },
})
