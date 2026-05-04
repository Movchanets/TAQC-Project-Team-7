import { test, expect } from '@playwright/test';

/**
 * Smoke test — verifies the framework is correctly wired up.
 * This test does NOT assert any real application behaviour.
 *
 * It will be replaced by proper tests in future iterations.
 */
test('framework smoke test', async ({ page }) => {
  // Navigate to the configured BASE_URL
  await page.goto('https://playwright.dev/');

  // Assert the page object exists (always passes — proves Playwright runs)
  expect(page).toBeTruthy();
});
