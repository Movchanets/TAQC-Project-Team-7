import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TIMEOUTS } from '../utils/constants';

/**
 * BaseNewsPage
 *
 * Shared base for NewsPreviewPage and NewsDetailsPage.
 * Encapsulates common news display locators (title, date, author, tags, content).
 */
export class BaseNewsPage extends BasePage {
  readonly tagsContainer: Locator;
  readonly tagItems: Locator;
  readonly newsContentContainer: Locator;
  readonly newsTitle: Locator;
  readonly newsDate: Locator;
  readonly newsAuthor: Locator;
  readonly newsMainImage: Locator;
  readonly contentText: Locator;

  constructor(page: Page) {
    super(page);

    this.tagsContainer = page.locator('.tags');
    this.tagItems = this.tagsContainer.locator('.tags-item');
    this.newsContentContainer = page.locator('.news-content');
    this.newsTitle = page.locator('.news-title');
    this.newsDate = page.locator('.news-info-date');
    this.newsAuthor = page.locator('.news-info-author');
    this.newsMainImage = page.locator('img.news-image');
    this.contentText = page.locator('.news-text-content.word-wrap');
  }

  /** Navigate — must be overridden by concrete subclasses. */
  async navigate(): Promise<void> {
    throw new Error('navigate() must be implemented by subclass');
  }

  /** Wait for the news content to be fully rendered. */
  async waitForPageReady(): Promise<void> {
    await this.waitForVisible(this.newsTitle, TIMEOUTS.LONG);
    await this.page.waitForTimeout(300);
  }

  /** Get all tag labels displayed on the news article. */
  async getTags(): Promise<string[]> {
    await this.waitForVisible(this.tagItems.first(), TIMEOUTS.MEDIUM);
    return this.tagItems.allInnerTexts();
  }

  /** Get the news title text. */
  async getTitle(): Promise<string> {
    await this.waitForVisible(this.newsTitle, TIMEOUTS.MEDIUM);
    return (await this.newsTitle.innerText()).trim();
  }

  /** Get the news date text. */
  async getDate(): Promise<string> {
    await this.waitForVisible(this.newsDate, TIMEOUTS.MEDIUM);
    return (await this.newsDate.innerText()).trim();
  }

  /** Get the news author text. */
  async getAuthor(): Promise<string> {
    await this.waitForVisible(this.newsAuthor, TIMEOUTS.MEDIUM);
    return (await this.newsAuthor.innerText()).trim();
  }

  /** Get the main content text. */
  async getContent(): Promise<string> {
    await this.waitForVisible(this.contentText, TIMEOUTS.MEDIUM);
    return (await this.contentText.innerText()).trim();
  }
}
