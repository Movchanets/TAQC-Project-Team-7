import { BaseComponent } from './base.component';
import type { Locator, Page } from '@playwright/test';

/**
 * HeaderComponent
 * Handles top navigation and authentication triggers.
 */
export class HeaderComponent extends BaseComponent {
  readonly logo: Locator;
  readonly loginButton: Locator;
  readonly ecoNewsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('.header_logo, a.logo, img[alt="logo"]');
    this.loginButton = page.locator('.header_sign-in-link');
    this.ecoNewsLink = page.locator('header a[href*="news"]');
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'attached', timeout: 5000 });
    await this.loginButton.evaluate((element: HTMLElement) => element.click());
  }

  async clickEcoNews() {
    await this.ecoNewsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.ecoNewsLink.click();
  }
}