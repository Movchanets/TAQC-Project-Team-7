import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.navigate();
    await homePage.header.clickLogin(); 
  });

  test('User cannot login with invalid credentials', async () => {
    await loginPage.login('wrong-email@test.com', 'InvalidPassword123');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});