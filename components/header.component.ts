import { BaseComponent } from './base.component';
import type { Locator, Page } from '@playwright/test';

/**
 * HeaderComponent
 * Handles top navigation bar and authentication triggers.
 */
export class HeaderComponent extends BaseComponent {
  readonly root: Locator;
  readonly logo: Locator;
  readonly loginButton: Locator;
  readonly ecoNewsLink: Locator;
  readonly navigationLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.root = page.locator('header, app-header');
    this.logo = page.locator('.header_logo, a.logo, img[alt="logo"]');
    this.loginButton = page.locator('.header_sign-in-link');
    this.ecoNewsLink = page.locator('header a[href*="news"]');
    this.navigationLinks = page.locator('header nav a, header .nav-link');
  }

  /** Wait for the header to be rendered and visible. */
  async waitForReady(): Promise<void> {
    await this.root.waitFor({ state: 'visible', timeout: 5000 });
  }

  /** Check if the header is currently visible. */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  async clickLogin() {
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click({ force: true });
  }

  async clickEcoNews() {
    await this.ecoNewsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.ecoNewsLink.click();
  }

  /**
   * Navigate to a section by its link text (e.g., 'Eco News', 'About us').
   */
  async navigateTo(linkText: string | RegExp) {
    const link = this.navigationLinks.filter({ hasText: linkText });
    await link.waitFor({ state: 'visible', timeout: 5000 });
    await link.click();
  }
}
