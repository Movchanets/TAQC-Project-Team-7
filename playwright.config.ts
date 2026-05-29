import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./utils/env";

// Extract the base domain URL from ENV.BASE_URL to support relative routing with hashes
const baseUri = new URL(ENV.BASE_URL);
const domainBaseUrl = `${baseUri.protocol}//${baseUri.host}/`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: ENV.TIMEOUT,
  retries: ENV.RETRIES,
  workers: undefined,
  reporter: [["list"], ["html", { open: "never" }], ["allure-playwright"]],
  use: {
    baseURL: domainBaseUrl,
    headless: ENV.HEADLESS,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/ 
    },
    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"], 
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'],
    },
    {
      name: "firefox",
      use: { 
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'],
    },
    {
      name: "webkit",
      use: { 
        ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'],
    },
  ],
});
