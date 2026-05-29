import { Locator, Page } from '@playwright/test';
import { BaseNewsPage } from './baseNews.page';
import { TIMEOUTS } from '../utils/constants';

/**
 * NewsPreviewPage
 *
 * Page Object for the news preview mode (before publishing).
 * Used by TC-08 to verify preview content matches input.
 */
export class NewsPreviewPage extends BaseNewsPage {
  readonly backToEditingLink: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    super(page);

    this.backToEditingLink = page.getByRole('link', { name: /back to editing|повернутися до редагування/i });
    this.publishButton = page.getByRole('button', { name: /publish|опублікувати/i });
  }

  get url(): string {
    throw new Error('NewsPreviewPage does not have a direct URL. Navigate via CreateNewsPage.clickPreview().');
  }

  /** Navigate — NewsPreviewPage is reached from CreateNewsPage, not via direct URL. */
  async navigate(): Promise<void> {
    throw new Error('NewsPreviewPage is reached from CreateNewsPage.clickPreview(). Use navigateToArticle() instead.');
  }

  /** Navigate back to the edit form. */
  async goBackToEditing(): Promise<void> {
    await this.step('Click "Back to editing"', async () => {
      await this.backToEditingLink.click();
      await this.page.waitForURL('**/news/create-news');
    });
  }

  /** Click the Publish button from preview mode. */
  async publishNews(): Promise<void> {
    await this.step('Publish news from preview', async () => {
      await this.publishButton.click();
      await this.page.waitForURL('**/news');
    });
  }

  /**
   * Verify the preview displays the expected title.
   * @param expectedTitle - The title text that should appear.
   */
  async verifyTitle(expectedTitle: string): Promise<void> {
    await this.step(`Verify preview title: "${expectedTitle}"`, async () => {
      await this.waitForVisible(this.newsTitle, TIMEOUTS.MEDIUM);
      const actual = await this.newsTitle.innerText();
      if (!actual.includes(expectedTitle)) {
        throw new Error(`Preview title mismatch. Expected "${expectedTitle}", got "${actual}"`);
      }
    });
  }

  /**
   * Verify the preview displays the expected content text.
   * @param expectedContent - The content text (or substring) that should appear.
   */
  async verifyContent(expectedContent: string): Promise<void> {
    await this.step(`Verify preview content contains: "${expectedContent.substring(0, 50)}..."`, async () => {
      await this.waitForVisible(this.contentText, TIMEOUTS.MEDIUM);
      const actual = await this.contentText.innerText();
      if (!actual.includes(expectedContent)) {
        throw new Error(`Preview content does not contain expected text.`);
      }
    });
  }

  /**
   * Verify the preview displays today's date.
   */
  async verifyDatePresent(): Promise<void> {
    await this.step('Verify preview date is displayed', async () => {
      await this.waitForVisible(this.newsDate, TIMEOUTS.MEDIUM);
      const dateText = await this.newsDate.innerText();
      if (!dateText.trim()) {
        throw new Error('Preview date is empty');
      }
    });
  }

  /**
   * Verify the preview displays an author name.
   */
  async verifyAuthorPresent(): Promise<void> {
    await this.step('Verify preview author is displayed', async () => {
      await this.waitForVisible(this.newsAuthor, TIMEOUTS.MEDIUM);
      const authorText = await this.newsAuthor.innerText();
      if (!authorText.trim()) {
        throw new Error('Preview author is empty');
      }
    });
  }
}
