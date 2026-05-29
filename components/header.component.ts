import { BaseComponent } from './base.component';
import type { Locator, Page } from '@playwright/test';

/**
 * HeaderComponent
 * Scoped to the <header> root element. All child locators are relative to root.
 */
export class HeaderComponent extends BaseComponent {
  readonly logo: Locator;
  readonly loginButton: Locator;
  readonly ecoNewsLink: Locator;
  readonly navigationLinks: Locator;

  constructor(page: Page) {
    const root = page.locator('header, app-header');
    super(page, root);
    this.logo = this.root.locator('.header_logo, a.logo, img[alt="logo"]');
    this.loginButton = this.root.locator('.header_sign-in-link');
    this.ecoNewsLink = this.root.locator('a[href*="news"]');
    this.navigationLinks = this.root.locator('nav a, .nav-link');
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'attached', timeout: 5000 });
    await this.loginButton.evaluate((el: HTMLElement) => el.click());
  }

  async clickEcoNews() {
    await this.ecoNewsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.ecoNewsLink.click();
  }

  async navigateTo(linkText: string | RegExp) {
    const link = this.navigationLinks.filter({ hasText: linkText });
    await link.waitFor({ state: 'visible', timeout: 5000 });
    await link.click();
  }
}
