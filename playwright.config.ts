import { defineConfig, devices } from '@playwright/test';
import { ENV } from './utils/env';

export default defineConfig({
  // Directory where test files are located
  testDir: './tests',

  // Global timeout per test (ms)
  timeout: ENV.TIMEOUT,

  // Number of retries on failure
  retries: ENV.RETRIES,

  // Reporter output
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // Base URL for page.goto('/') calls
    baseURL: ENV.BASE_URL,

    // Run browsers headlessly or with a UI window
    headless: ENV.HEADLESS,

    // Collect trace on first retry for debugging
    trace: 'on-first-retry',

    // Capture screenshot only on failure
    screenshot: 'only-on-failure',
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
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
