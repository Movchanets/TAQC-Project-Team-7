import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * EcoNewsPage
 *
 * Handles interactions with the Eco News page, listing items,
 * and navigating to the news creation form.
 */
export class EcoNewsPage extends BasePage {
  readonly createNewsButton: Locator;
  readonly newsItems: Locator;

  constructor(page: Page) {
    super(page);
    
    // Локатори для GreenCity EcoNews
    this.createNewsButton = page.locator('#create-button, button:has-text("Create news")');
    this.newsItems = page.locator('app-eco-news-list-item, .gallery-view-table-list');
  }

  /**
   * Натискає кнопку створення новини
   */
  async clickCreateNews() {
    await this.createNewsButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.createNewsButton.click();
  }

  /**
   * Повертає кількість знайдених новин на сторінці
   */
  async getNewsItemsCount(): Promise<number> {
    await this.newsItems.first().waitFor({ state: 'visible', timeout: 5000 });
    return await this.newsItems.count();
  }
}