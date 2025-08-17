import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './integration-tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 1 : '50%',
  reporter: process.env['CI'] ? 'github' : 'dot',
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
    command: 'pnpm dev -p 3001',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: false,
    env: {
      NEXT_PUBLIC_E2E_TESTING: 'true',
    },
  },
})
