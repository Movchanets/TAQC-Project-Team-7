import { Page, Locator } from '@playwright/test';

/**
 * BaseComponent
 *
 * Abstract foundation for all reusable UI Component classes.
 * Components represent repeated UI elements (header, footer, modals, cards)
 * that appear across multiple pages.
 *
 * All concrete component objects must extend this class.
 */
export abstract class BaseComponent {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
  }

  /**
   * Check if the component is currently visible on the page.
   */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  /**
   * Wait for the component's root element to be visible.
   */
  async waitForReady(timeout = 5000): Promise<void> {
    await this.root.waitFor({ state: 'visible', timeout });
  }
}
