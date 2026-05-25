import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ENV } from '../utils/env';

/**
 * CreateNewsPage
 *
 * Page Object Model representing the "Create News" form page (`#/greenCity/news/create-news`).
 * Encapsulates form inputs, tag selections, image upload, date/author static section,
 * and submit actions.
 */
export class CreateNewsPage extends BasePage {
  readonly titleInput: Locator;
  readonly tagButtons: Locator;
  readonly fileInput: Locator;
  readonly imageDropzone: Locator;
  readonly contentEditor: Locator;
  readonly authorDateSection: Locator;
  readonly sourceInput: Locator;

  readonly cancelButton: Locator;
  readonly previewButton: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    super(page);

    this.titleInput = page.locator('textarea[formcontrolname="title"]');
    this.tagButtons = page.locator('button.tag-button');
    this.fileInput = page.locator('input[type="file"]');
    this.imageDropzone = page.locator('div.dropzone');
    this.contentEditor = page.locator('div.ql-editor');
    this.authorDateSection = page.locator('div.date');
    this.sourceInput = page.locator('input[formcontrolname="source"]');

    this.cancelButton = page.locator('div.submit-buttons button.tertiary-global-button');
    this.previewButton = page.locator('div.submit-buttons button.secondary-global-button');
    this.publishButton = page.locator('div.submit-buttons button.primary-global-button[type="submit"]');
  }

  /**
   * Navigate directly to the Create News form
   */
  async navigate() {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = `${url.hash || '#/greenCity'}/news/create-news`;
    await this.page.goto(targetRoute);
  }

  /**
   * Get tag button locator by its text name
   * @param name Name of the tag (e.g., 'News', 'Events', 'Education', 'Initiatives', 'Ads')
   */
  getTagButton(name: string): Locator {
    return this.tagButtons.filter({ hasText: new RegExp(`^${name}$`) });
  }
}
