import { test, expect } from '../fixtures/index';

test.describe('Home Page Tests', () => {

  test('TC-01 Open GreenCity homepage', async ({ page, homePage }) => {
    await test.step('Navigate to GreenCity homepage', async () => {
      await homePage.navigate();
    });

    await test.step('Verify header logo is visible', async () => {
      await expect(homePage.header.logo).toBeVisible();
    });

    await test.step('Verify page title contains "GreenCity"', async () => {
      await expect(page).toHaveTitle(/GreenCity/);
    });
  });
});
