import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  test('TC-01 Open GreenCity homepage', async ({ page }) => {
    const homePage = new HomePage(page);

   await homePage.open();

  await expect(page).toHaveURL(/greencity/i);
  });
});