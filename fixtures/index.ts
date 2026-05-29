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
   * Pre-authenticated page context (via Global Setup & storageState).
   * This fixture no longer performs UI login. It relies on the 'auth.setup.ts'
   * script to inject session cookies/tokens before the test suite starts.
   * Simply navigates to the home page and returns the authenticated context.
   */
  authenticatedPage: async ({ page, homePage }, use) => {
    // Navigate to the home page (which should now be authenticated due to storageState)
    await homePage.navigate();

    await use(page);
  },
});

export { expect };