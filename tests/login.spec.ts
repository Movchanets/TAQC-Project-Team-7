import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { HeaderComponent } from '../components/header.component';
import { LoginPage } from '../pages/login.page';

test('User cannot login with invalid credentials', async ({ page }) => {
  const homePage = new HomePage(page);
  const header = new HeaderComponent(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await page.waitForLoadState('networkidle');

  await page.goto('https://www.greencity.cx.ua/#/ubs/order');
  
  try {
    await header.clickSignInButton();
  } catch (e) {
    console.log('Іконку не знайдено або модалка вже відкрита');
  }

  await loginPage.login('test@gmail.com', 'wrongpassword');
  await loginPage.verifyErrorMessageVisible();
});