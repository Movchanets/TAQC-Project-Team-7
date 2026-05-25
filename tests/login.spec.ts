import { test, expect } from '../fixtures/index';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await homePage.header.clickLogin(); 
  });

  test('User cannot login with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('wrong-email@test.com', 'InvalidPassword123');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});