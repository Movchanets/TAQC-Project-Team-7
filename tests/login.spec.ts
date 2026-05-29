import { test, expect } from '../fixtures/index';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {

  test.beforeEach(async ({ homePage }) => {
    await test.step('Open login modal from homepage', async () => {
      await homePage.navigate();
      await homePage.header.clickLogin();
    });
  });

  test('User cannot login with invalid credentials', async ({ loginPage }) => {
    await test.step('Attempt login with wrong credentials', async () => {
      await loginPage.login('wrong-email@test.com', 'InvalidPassword123');
    });

    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });
});
