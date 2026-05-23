import { Locator, Page } from '@playwright/test';
import { allure } from 'allure-playwright';

export class HeaderComponent {
  readonly page: Page;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('header a', { has: page.locator('img, svg') }).first();
  }

  async clickSignInButton(): Promise<void> {
    await allure.step('Click Sign In button in header', async () => {
      await this.page.waitForLoadState('networkidle');
      await this.signInButton.waitFor({ state: 'attached', timeout: 5000 });
      
      await this.signInButton.dispatchEvent('click');
    });
  }
}