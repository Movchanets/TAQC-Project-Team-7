import { test, expect } from '../fixtures/index';

test.describe('Home Page', () => {

  test('GreenCity homepage loads with logo and correct title', async ({ page, homePage }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.navigate();
    });

    await test.step('Header logo is visible', async () => {
      await expect(homePage.header.logo).toBeVisible();
    });

    await test.step('Page title contains "GreenCity"', async () => {
      await expect(page).toHaveTitle(/GreenCity/);
    });
  });
});
