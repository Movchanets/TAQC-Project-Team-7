import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./utils/env";

const baseUri = new URL(ENV.BASE_URL);
const domainBaseUrl = `${baseUri.protocol}//${baseUri.host}/`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: ENV.TIMEOUT,
  retries: ENV.RETRIES,
  reporter: [["list"], ["html", { open: "never" }], ["allure-playwright"]],
  use: {
    baseURL: domainBaseUrl,
    headless: ENV.HEADLESS,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    // GreenCity may have self-signed certs in staging environments
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    // ── Setup: runs once, saves auth state ──────────────────────────────
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    // ── Browser projects: depend on setup, load saved session ───────────
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
