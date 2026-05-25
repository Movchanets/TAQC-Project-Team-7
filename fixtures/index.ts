import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { EcoNewsPage } from '../pages/ecoNews.page';
import { ProfilePage } from '../pages/profile.page';
import { CreateNewsPage } from '../pages/createNews.page';
import { ENV } from '../utils/env';

// ── Fixture Type Definitions ────────────────────────────────────────────────
export type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  ecoNewsPage: EcoNewsPage;
  profilePage: ProfilePage;
  createNewsPage: CreateNewsPage;
  authenticatedPage: Page; // Pre-authenticated browser page context
};

// ── Extend Playwright's Base Test with custom Page Objects & Auth fixtures ────
export const test = base.extend<AppFixtures>({
  
  // Automate initialization of HomePage
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // Automate initialization of LoginPage
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Automate initialization of EcoNewsPage
  ecoNewsPage: async ({ page }, use) => {
    await use(new EcoNewsPage(page));
  },

  // Automate initialization of ProfilePage
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  // Automate initialization of CreateNewsPage
  createNewsPage: async ({ page }, use) => {
    await use(new CreateNewsPage(page));
  },

  // Provide an already authenticated Page context
  authenticatedPage: async ({ page, homePage, loginPage }, use) => {
    // 1. Navigate to home and trigger login modal
    await homePage.navigate();
    await homePage.header.clickLogin();

    // 2. Perform sign in using credentials from environment variables
    await loginPage.login(ENV.LOGIN_EMAIL, ENV.LOGIN_PASSWORD);

    // 3. Wait for the authentication transaction and modal closure to complete
    await page.waitForURL((url) => !url.hash.includes('signin') && !url.hash.includes('login'), { timeout: 10000 });

    // 4. Wait for the material overlay backdrop to detach to make page fully interactive
    await page.locator('.cdk-overlay-backdrop').waitFor({ state: 'detached', timeout: 8000 }).catch(() => {});

    // 5. Pass the authenticated page context to the test
    await use(page);
  }
});

export { expect } from '@playwright/test';
