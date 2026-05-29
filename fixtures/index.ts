import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { EcoNewsPage } from '../pages/ecoNews.page';
import { ProfilePage } from '../pages/profile.page';
import { CreateNewsPage } from '../pages/createNews.page';
import { NewsPreviewPage } from '../pages/newsPreview.page';
import { NewsDetailsPage } from '../pages/newsDetails.page';

// ── Fixture Type Definitions ────────────────────────────────────────────
export type AppFixtures = {
  homePage: HomePage;
  ecoNewsPage: EcoNewsPage;
  profilePage: ProfilePage;
  createNewsPage: CreateNewsPage;
  newsPreviewPage: NewsPreviewPage;
  newsDetailsPage: NewsDetailsPage;
};

// ── Page Object Fixtures (test-scoped, fresh per test) ──────────────────
export const test = base.extend<AppFixtures>({

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
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
});

export { expect } from '@playwright/test';
