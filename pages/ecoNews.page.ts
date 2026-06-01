import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ROUTES, TIMEOUTS } from '../utils/constants';

/**
 * EcoNewsPage
 *
 * Page Object for the Eco News listing page.
 */
export class EcoNewsPage extends BasePage {
  readonly createNewsButton: Locator;
  readonly newsItems: Locator;
  /** User avatar or profile menu — indicates Angular has detected auth state. */
  readonly userMenu: Locator;

  constructor(page: Page) {
    super(page);

    this.createNewsButton = page.getByRole('link', { name: /create news|створити новину/i });
    this.newsItems = page.locator('.list-gallery');
    this.userMenu = page.locator('[class*="profile"], [href*="profile"], .user-avatar, .header_user');
  }

  get url(): string {
    return ROUTES.NEWS;
  }

  /** Wait for the news list to load and Angular to detect auth state. */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('load');
    await this.newsItems.first().waitFor({ state: 'visible', timeout: TIMEOUTS.LONG }).catch(() => {});
    // Wait for Angular to hydrate auth-dependent UI (profile menu = logged-in state detected)
    await this.userMenu.first().waitFor({ state: 'visible', timeout: TIMEOUTS.LONG }).catch(() => {});
  }

  /** Click the Create News button. */
  async clickCreateNews(): Promise<void> {
    await this.step('Click "Create News"', async () => {
      await this.waitForVisible(this.createNewsButton, TIMEOUTS.LONG);
      await this.createNewsButton.click();
      await this.page.waitForURL('**/news/create-news');
    });
  }

  /** Get the count of news items displayed on the page. */
  async getNewsItemsCount(): Promise<number> {
    await this.waitForVisible(this.newsItems.first(), TIMEOUTS.MEDIUM);
    return this.newsItems.count();
  }

  /** Find a news item by its title and return its locator. */
  getNewsItemByTitle(title: string): Locator {
    return this.newsItems.filter({ hasText: title }).first();
  }

  /** Get the tags associated with a news item by its title. */
  getTagsForNewsItem(title: string): Locator {
    const newsCard = this.getNewsItemByTitle(title);
    return newsCard.locator('.filter-tag');
  }

  /** Click a news item by its title to navigate to the article detail page. */
  async clickNewsItemByTitle(title: string): Promise<void> {
    await this.step(`Click news item: "${title}"`, async () => {
      const newsCard = this.getNewsItemByTitle(title);
      await this.waitForVisible(newsCard, TIMEOUTS.MEDIUM);
      await newsCard.click();
    });
  }

}
