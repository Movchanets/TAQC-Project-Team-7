import { Page, type Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

/**
 * BasePage
 *
 * Abstract foundation for all Page Object classes.
 * Provides shared utilities: navigation, readiness checks, Allure step logging.
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
   * Wait for the page to be fully ready.
   * Uses 'load' instead of 'networkidle' — GreenCity has persistent
   * WebSocket (STOMP) connections that prevent networkidle from resolving.
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  /**
   * Wait for a specific locator to be visible with a configurable timeout.
   */
  protected async waitForVisible(locator: Locator, timeout?: number ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Execute a step with Allure logging.
   */
  protected async step<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return allure.step(name, fn);
  }
}
