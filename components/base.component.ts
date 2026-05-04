import { Page } from '@playwright/test';

/**
 * BaseComponent
 *
 * Abstract foundation for all reusable UI Component classes.
 * All concrete component objects must extend this class.
 *
 * @stub — No component-specific selectors or actions are implemented here.
 */
export abstract class BaseComponent {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
