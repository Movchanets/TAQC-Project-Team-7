import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { EcoNewsPage } from '../pages/ecoNews.page';
import { ProfilePage } from '../pages/profile.page';
import { CreateNewsPage } from '../pages/createNews.page';
import { NewsPreviewPage } from '../pages/newsPreview.page';
import { NewsDetailsPage } from '../pages/newsDetails.page';
import { ENV } from '../utils/env';
import { TIMEOUTS } from '../utils/constants';

// ── Fixture Type Definitions ────────────────────────────────────────────
export type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  ecoNewsPage: EcoNewsPage;
  profilePage: ProfilePage;
  createNewsPage: CreateNewsPage;
  newsPreviewPage: NewsPreviewPage;
  newsDetailsPage: NewsDetailsPage;
  authenticatedPage: Page;
  ensureAuthenticated: void;
};

// ── Extend Playwright's Base Test ───────────────────────────────────────
export const test = base.extend<AppFixtures>({

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  ecoNewsPage: async ({ page }, use) => {
    await use(new EcoNewsPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  createNewsPage: async ({ page }, use) => {
    await use(new CreateNewsPage(page));
  },

  newsPreviewPage: async ({ page }, use) => {
    await use(new NewsPreviewPage(page));
  },

  newsDetailsPage: async ({ page }, use) => {
    await use(new NewsDetailsPage(page));
  },

  /**
   * Pre-authenticated page context.
   * Navigates to home, logs in, waits for auth to complete.
   * Returns the same page (now authenticated).
   */
  authenticatedPage: async ({ page, homePage, loginPage }, use) => {
    // 1. Navigate to home and open login modal
    await homePage.navigate();
    await homePage.header.clickLogin();

    // 2. Perform sign in
    await loginPage.login(ENV.LOGIN_EMAIL, ENV.LOGIN_PASSWORD);

    // 3. Wait for auth redirect
    await page.waitForURL(
      (url) => !url.hash.includes('signin') && !url.hash.includes('login'),
      { timeout: TIMEOUTS.NAVIGATION }
    );

    // 4. Wait for modal backdrop to dismiss
    await page
      .locator('.cdk-overlay-backdrop')
      .waitFor({ state: 'detached', timeout: 15000 });
    // 5. Pass authenticated page
    await use(page);
  },

  /**
   * Lightweight auth fixture — ensures user is logged in without returning a page.
   * Use in beforeEach when you need auth but want to use page object fixtures.
   */
  ensureAuthenticated: async ({ page, homePage, loginPage }, use) => {
    // Navigate to home and login
    await homePage.navigate();
    await homePage.header.clickLogin();
    await loginPage.login(ENV.LOGIN_EMAIL, ENV.LOGIN_PASSWORD);

    // Wait for auth to settle
    await page.waitForURL(
      (url) => !url.hash.includes('signin') && !url.hash.includes('login'),
      { timeout: 15000 }
    );

    const backdrop = page.locator('.cdk-overlay-backdrop');
    if (await backdrop.count() > 0) {
      await backdrop.waitFor({ state: 'hidden', timeout: 15000 });
    }

    await page.waitForLoadState('domcontentloaded');

    await use(undefined as unknown as void);
  },
});

export { expect } from '@playwright/test';
