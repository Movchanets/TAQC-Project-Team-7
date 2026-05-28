import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ENV } from '../utils/env';
import { ROUTES, TIMEOUTS } from '../utils/constants';

/**
 * EcoNewsPage
 *
 * Page Object for the Eco News listing page.
 */
export class EcoNewsPage extends BasePage {
  readonly createNewsButton: Locator;
  readonly newsItems: Locator;
  readonly newsItemLinks: Locator;

  constructor(page: Page) {
    super(page);

    this.createNewsButton = page.locator('#create-button, button:has-text("Create news")');
    this.newsItems = page.locator('app-eco-news-list-item, .gallery-view-table-list');
    this.newsItemLinks = page.locator('app-eco-news-list-item a, .gallery-view-table-list a');
  }

  /** Navigate to the Eco News page. */
  async navigate(): Promise<void> {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = `${url.hash || ROUTES.HOME}/news`;
    await this.page.goto(targetRoute);
    await this.waitForPageReady();
  }

  /** Wait for the news list to load. */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    // Wait for at least one news item or the create button
    await Promise.race([
      this.newsItems.first().waitFor({ state: 'visible', timeout: TIMEOUTS.LONG }),
      this.createNewsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG }),
    ]).catch(() => {});
  }

  /** Click the Create News button. */
  async clickCreateNews(): Promise<void> {
    await this.step('Click "Create News"', async () => {
      await this.waitForVisible(this.createNewsButton, TIMEOUTS.MEDIUM);
      await this.createNewsButton.click();
    });
  }

  /** Get the count of news items displayed on the page. */
  async getNewsItemsCount(): Promise<number> {
    await this.waitForVisible(this.newsItems.first(), TIMEOUTS.MEDIUM);
    return this.newsItems.count();
  }

  /** Click on the first news item to open its details. */
  async clickFirstNewsItem(): Promise<void> {
    await this.step('Click first news item', async () => {
      await this.waitForVisible(this.newsItemLinks.first(), TIMEOUTS.MEDIUM);
      await this.newsItemLinks.first().click();
    });
  }
}
