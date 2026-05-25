import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page Tests', () => {

  test('TC-01 Open GreenCity homepage', async ({ page }) => {
    const homePage = new HomePage(page);

    // 1. Переходимо на головну сторінку
    await homePage.navigate();

    // 2. Перевіряємо, що логотип у хедері видимий
    await expect(homePage.header.logo).toBeVisible();

    // 3. Перевіряємо, що тайтл вкладки браузера містить назву сайту
    await expect(page).toHaveTitle(/GreenCity/);
  });

});