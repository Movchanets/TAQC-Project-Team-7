import { test as setup, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
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

  // 1. Navigate to home and wait for page load
  await homePage.navigate();
  await page.waitForLoadState('load');

  // 2. Open login modal
  await homePage.header.clickLogin();

  // 3. Login with credentials from environment
  await loginPage.login(ENV.LOGIN_EMAIL, ENV.LOGIN_PASSWORD);

  // 4. Wait for auth redirect
  await page.waitForURL(
    (url) => !url.hash.includes('signin') && !url.hash.includes('login'),
    { timeout: TIMEOUTS.NAVIGATION }
  );

  // 5. Wait for modal to dismiss
  await page
    .locator('.cdk-overlay-backdrop')
    .waitFor({ state: 'detached', timeout: TIMEOUTS.LONG })
    .catch(() => {});

  // 6. Wait for Angular to re-hydrate after login
  await page.waitForLoadState('load');

  // 7. Verify logged in — profile link or user avatar is visible
  await expect(
    page.locator('[class*="profile"], [href*="profile"]').first()
  ).toBeAttached({ timeout: TIMEOUTS.MEDIUM });

  // 8. Save session state
  await page.context().storageState({ path: authFile });

  // 9. Verify the auth file was written
  const stat = fs.statSync(authFile);
  expect(stat.size).toBeGreaterThan(0);
});
