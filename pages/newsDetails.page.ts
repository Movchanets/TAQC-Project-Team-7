import { Page, Locator } from '@playwright/test';
import { BaseNewsPage } from './baseNews.page';
import { TIMEOUTS } from '../utils/constants';

/**
 * NewsDetailsPage
 *
 * Page Object for viewing a single news article.
 * Used by TC-09 (edit button visibility) and TC-10 (edit and save).
 */
export class NewsDetailsPage extends BaseNewsPage {
  readonly backToNewsLink: Locator;
  readonly deleteNewsButton: Locator;
  readonly editNewsButton: Locator;

  constructor(page: Page) {
    super(page);

    this.backToNewsLink = page.getByRole('link', { name: /back to news|повернутися до новин/i });
    this.deleteNewsButton = page.getByRole('button', { name: /delete|видалити/i });
    this.editNewsButton = page.getByRole('link', { name: /edit news|редагувати новину/i });
  }

  get url(): string {
    throw new Error('NewsDetailsPage does not have a direct URL. Use navigateToArticle().');
  }

  /** Navigate — NewsDetailsPage requires a specific news ID, so direct navigation is not supported. */
  async navigate(): Promise<void> {
    throw new Error('NewsDetailsPage requires a news article URL. Use navigateToArticle() instead.');
  }

  /** Navigate to a specific news article by its URL. */
  async navigateToArticle(newsUrl: string): Promise<void> {
    await this.step(`Navigate to article: ${newsUrl}`, async () => {
      await this.page.goto(newsUrl);
      await this.waitForPageReady();
    });
  }

  /** Go back to the news listing. */
  async goBackToNews(): Promise<void> {
    await this.step('Click "Back to News"', async () => {
      await this.backToNewsLink.click();
      await this.page.waitForURL('**/news');
    });
  }

  /** Click the Edit News button. Waits for the edit form URL pattern. */
  async editNews(): Promise<void> {
    await this.step('Click "Edit news"', async () => {
      await this.waitForVisible(this.editNewsButton, TIMEOUTS.MEDIUM);
      await this.editNewsButton.click();
      await this.page.waitForURL(/\/news\/create-news\?id=\d+/);
    });
  }

  /** Check if the "Edit news" button is visible (TC-09). */
  async isEditButtonVisible(): Promise<boolean> {
    try {
      await this.editNewsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
      return true;
    } catch {
      return false;
    }
  }

  /** Check if the "Delete" button is visible. */
  async isDeleteButtonVisible(): Promise<boolean> {
    try {
      await this.deleteNewsButton.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
      return true;
    } catch {
      return false;
    }
  }
}
