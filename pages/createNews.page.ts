import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ENV } from '../utils/env';
import { FORM_LIMITS, TIMEOUTS, ROUTES, NEWS_TAGS } from '../utils/constants';

/**
 * CreateNewsPage
 *
 * Page Object for the "Create News" form (`#/greenCity/news/create-news`).
 * Encapsulates all form fields, validation checks, and submission actions.
 * Every action method logs an Allure step for detailed reporting.
 */
export class CreateNewsPage extends BasePage {
  // ── Form Fields ──────────────────────────────────────────────────────
  readonly titleInput: Locator;
  readonly tagButtons: Locator;
  readonly fileInput: Locator;
  readonly imageDropzone: Locator;
  readonly contentEditor: Locator;
  readonly authorDateSection: Locator;
  readonly sourceInput: Locator;

  // ── Action Buttons ───────────────────────────────────────────────────
  readonly cancelButton: Locator;
  readonly previewButton: Locator;
  readonly publishButton: Locator;

  // ── Loading State ─────────────────────────────────────────────────────
  readonly loadingSpinner: Locator;
  readonly loadingMessage: Locator;

  // ── Validation & Feedback ────────────────────────────────────────────
  readonly titleCounter: Locator;
  readonly validationErrors: Locator;

  // ── Cancel Modal ─────────────────────────────────────────────────────
  readonly cancelModal: Locator;
  readonly cancelModalYesButton: Locator;
  readonly cancelModalContinueButton: Locator;

  constructor(page: Page) {
    super(page);

    // Form Fields
    this.titleInput = page.locator('textarea[formcontrolname="title"]');
    this.tagButtons = page.locator('button.tag-button');
    this.fileInput = page.locator('input[type="file"]');
    this.imageDropzone = page.locator('div.dropzone');
    this.contentEditor = page.locator('div.ql-editor');
    this.authorDateSection = page.locator('div.date');
    this.sourceInput = page.locator('input[formcontrolname="source"]');

    // Action Buttons
    this.cancelButton = page.locator('div.submit-buttons button.tertiary-global-button');
    this.previewButton = page.locator('div.submit-buttons button.secondary-global-button');
    this.publishButton = page.locator('div.submit-buttons button.primary-global-button[type="submit"]');

    // Loading State (appears after publish)
    this.loadingSpinner = page.locator('.spinner, .loading-spinner, [class*="spinner"]');
    this.loadingMessage = page.getByText(/please wait|loading to website|wait until page refreshes/i);

    // Validation & Feedback
    this.titleCounter = page.locator('span, div, p').filter({ hasText: /\d+\s*\/\s*170/ }).first();
    this.validationErrors = page.locator('.error-message, .mat-error, .validation-error, [class*="error"]');

    // Cancel Modal
    this.cancelModal = page.locator('.modal-dialog, .cdk-overlay-container mat-dialog-container, [role="dialog"]');
    this.cancelModalYesButton = page.getByRole('button', { name: /yes.*cancel|так.*скасувати/i });
    this.cancelModalContinueButton = page.getByRole('button', { name: /continue editing|продовжити редагування/i });
  }

  // ── Navigation ─────────────────────────────────────────────────────────

  get url(): string {
    return ROUTES.CREATE_NEWS;
  }

  /** Navigate directly to the Create News form. */
  async navigate(): Promise<void> {
    const base = new URL(ENV.BASE_URL);
    await this.page.goto(`${base.origin}${base.pathname}${ROUTES.CREATE_NEWS}`);
    await this.waitForPageReady();
  }

  /** Wait for the form to be fully loaded (title input visible). */
  async waitForFormReady(): Promise<void> {
    await this.titleInput.waitFor({ state: 'visible', timeout: TIMEOUTS.LONG });
  }

  // ── Field Actions ──────────────────────────────────────────────────────

  /** Fill the Title field. Clears any existing text first. */
  async fillTitle(title: string): Promise<void> {
    await this.step(`Fill title: "${title}"`, async () => {
      await this.titleInput.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await this.titleInput.fill(title);
      await this.titleInput.dispatchEvent('input');
    });
  }

  /** Get the current value of the Title field. */
  async getTitleValue(): Promise<string> {
    return this.titleInput.inputValue();
  }

  /** Get the title character counter text (e.g., "9/170"). */
  async getTitleCounterText(): Promise<string> {
    await this.waitForVisible(this.titleCounter, TIMEOUTS.SHORT);
    return (await this.titleCounter.innerText()).trim();
  }

  /**
   * Select a tag by its display name.
   * @param tagName - Tag label (e.g., 'News', 'Events', 'Education')
   */
  async selectTag(tagName: string | RegExp): Promise<void> {
    await this.step(`Select tag: "${tagName}"`, async () => {
      const tag = this.getTagButton(tagName);
      await tag.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await tag.click();
    });
  }

  /**
   * Deselect a previously selected tag.
   */
  async deselectTag(tagName: string | RegExp): Promise<void> {
    await this.step(`Deselect tag: "${tagName}"`, async () => {
      const tag = this.getTagButton(tagName);
      await tag.click();
    });
  }

  /** Get the count of currently selected (active) tags. */
  async getSelectedTagsCount(): Promise<number> {
    const selected = this.tagButtons.locator('.selected, [class*="active"], [class*="selected"]');
    return selected.count();
  }

  /** Check if a specific tag button is currently selected. */
  async isTagSelected(tagName: string | RegExp): Promise<boolean> {
    const tag = this.getTagButton(tagName);
    const classes = await tag.getAttribute('class') ?? '';
    return classes.includes('selected') || classes.includes('active');
  }

  /**
   * Upload an image file via the file input.
   * @param filePath - Absolute path to the image file.
   */
  async uploadImage(filePath: string): Promise<void> {
    await this.step(`Upload image: ${filePath.split(/[/\\]/).pop()}`, async () => {
      await this.fileInput.setInputFiles(filePath);
    });
  }

  /**
   * Fill the Main Text (content) editor.
   * The editor is a Quill rich-text editor (div.ql-editor).
   */
  async fillContent(text: string): Promise<void> {
    await this.step(`Fill content (${text.length} chars)`, async () => {
      await this.contentEditor.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await this.contentEditor.click();
      await this.contentEditor.fill(text);
      await this.contentEditor.dispatchEvent('input');
    });
  }

  /** Get the current text content of the rich-text editor. */
  async getContentText(): Promise<string> {
    return (await this.contentEditor.innerText()).trim();
  }

  /**
   * Fill the Source field.
   * @param url - The source URL to enter.
   */
  async fillSource(url: string): Promise<void> {
    await this.step(`Fill source: "${url}"`, async () => {
      await this.sourceInput.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await this.sourceInput.fill(url);
      await this.sourceInput.dispatchEvent('input');
    });
  }

  // ── Button Actions ─────────────────────────────────────────────────────

  /** Click the Publish button and wait for the loading spinner to finish. */
  async clickPublish(): Promise<void> {
    await this.step('Click Publish', async () => {
      await this.publishButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await this.publishButton.click();
      // Wait for the loading overlay to appear then disappear
      await this.loadingMessage.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM }).catch(() => {});
      await this.loadingMessage.waitFor({ state: 'hidden', timeout: TIMEOUTS.LONG }).catch(() => {});
    });
  }

  /** Click the Preview button. */
  async clickPreview(): Promise<void> {
    await this.step('Click Preview', async () => {
      await this.previewButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await this.previewButton.click();
    });
  }

  /** Click the Cancel button (opens confirmation modal). */
  async clickCancel(): Promise<void> {
    await this.step('Click Cancel', async () => {
      await this.cancelButton.waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
      await this.cancelButton.click();
    });
  }

  // ── Cancel Modal Actions ───────────────────────────────────────────────

  /** Confirm cancellation by clicking "Yes, cancel" in the modal. */
  async confirmCancel(): Promise<void> {
    await this.step('Confirm cancel (Yes, cancel)', async () => {
      await this.waitForVisible(this.cancelModalYesButton, TIMEOUTS.MEDIUM);
      await this.cancelModalYesButton.click();
    });
  }

  /** Dismiss the cancel modal by clicking "Continue editing". */
  async continueEditing(): Promise<void> {
    await this.step('Continue editing', async () => {
      await this.waitForVisible(this.cancelModalContinueButton, TIMEOUTS.MEDIUM);
      await this.cancelModalContinueButton.click();
    });
  }

  // ── Validation State Checks ────────────────────────────────────────────

  /** Check if the Publish button is currently disabled. */
  async isPublishDisabled(): Promise<boolean> {
    return this.publishButton.isDisabled();
  }

  /** Check if the Publish button is currently enabled. */
  async isPublishEnabled(): Promise<boolean> {
    return this.publishButton.isEnabled();
  }

  /** Check if the title input has a validation error (red border). */
  async hasTitleError(): Promise<boolean> {
    const classes = await this.titleInput.getAttribute('class') ?? '';
    return classes.includes('ng-invalid') || classes.includes('error');
  }

  /** Get visible validation error messages. */
  async getValidationErrors(): Promise<string[]> {
    const errors = this.validationErrors;
    const count = await errors.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await errors.nth(i).innerText()).trim();
      if (text) messages.push(text);
    }
    return messages;
  }

  /** Get the author name displayed in the Author/Date section. */
  async getAuthorName(): Promise<string> {
    const sectionText = await this.authorDateSection.innerText();
    const authorMatch = sectionText.match(/Author:?\s*(.+)/i);
    return authorMatch ? authorMatch[1].trim() : sectionText.trim();
  }

  /** Get the date displayed in the Author/Date section. */
  async getDisplayDate(): Promise<string> {
    const sectionText = await this.authorDateSection.innerText();
    return sectionText.trim();
  }

  // ── Helpers ────────────────────────────────────────────────────────────

  /** Get tag button locator by its text name. */
  getTagButton(name: string | RegExp): Locator {
    const pattern = name instanceof RegExp ? name : new RegExp(`^${name}$`);
    return this.tagButtons.filter({ hasText: pattern });
  }

  /**
   * Fill all required form fields and select a tag.
   * Convenience method for tests that need a valid form before asserting.
   */
  async fillRequiredFields(title: string, content: string, tagName: string | RegExp = NEWS_TAGS.NEWS): Promise<void> {
    await this.step('Fill all required fields', async () => {
      await this.fillTitle(title);
      await this.selectTag(tagName);
      await this.fillContent(content);
    });
  }
}
