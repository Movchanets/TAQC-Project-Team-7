import { Page, Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

/**
 * BasePage
 *
 * Abstract foundation for all Page Object classes.
 * Provides shared utilities: navigation, readiness checks, Allure step logging.
 * All concrete page objects must extend this class.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the page's primary URL.
   * Must be overridden by each concrete page class.
   */
  abstract navigate(): Promise<void>;

  /**
   * Wait for the page to be fully ready (network idle + SPA hydration).
   * Override in subclasses to add page-specific readiness checks.
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500); // SPA hydration buffer
  }

  /**
   * Wait for a specific locator to be visible with a configurable timeout.
   */
  protected async waitForVisible(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Execute a step with Allure logging.
   * Wraps allure.step() for consistent reporting across all page objects.
   */
  protected async step<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return allure.step(name, fn);
  }
}
