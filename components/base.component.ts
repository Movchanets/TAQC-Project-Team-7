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

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for the component's root element to be visible.
   * Must be overridden by each concrete component class.
   */
  abstract waitForReady(): Promise<void>;

  /**
   * Check if the component is currently visible on the page.
   * Must be overridden by each concrete component class.
   */
  abstract isVisible(): Promise<boolean>;

  /**
   * Wait for a specific locator to be visible with a configurable timeout.
   */
  protected async waitForVisible(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}
