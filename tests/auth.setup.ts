import { test as setup, expect } from '@playwright/test';
import * as path from 'path';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ENV } from '../utils/env';
import { TIMEOUTS } from '../utils/constants';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

/**
 * Auth Setup — runs ONCE before all tests.
 * Logs in via the UI using page objects, saves storageState.
 * All subsequent tests load this state automatically — no per-test login needed.
 */
setup('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // 1. Navigate to home and open login modal
  await homePage.navigate();
  await homePage.header.clickLogin();

  // 2. Login with credentials from environment
  await loginPage.login(ENV.LOGIN_EMAIL, ENV.LOGIN_PASSWORD);

  // 3. Wait for auth redirect
  await page.waitForURL(
    (url) => !url.hash.includes('signin') && !url.hash.includes('login'),
    { timeout: TIMEOUTS.NAVIGATION }
  );

  // 4. Wait for modal to dismiss
  await page
    .locator('.cdk-overlay-backdrop')
    .waitFor({ state: 'detached', timeout: TIMEOUTS.LONG })
    .catch(() => {});

  // 5. Verify logged in
  await expect(
    page.locator('[class*="profile"], [href*="profile"]').first()
  ).toBeAttached({ timeout: TIMEOUTS.MEDIUM });

  // 6. Save session state
  await page.context().storageState({ path: authFile });
});
