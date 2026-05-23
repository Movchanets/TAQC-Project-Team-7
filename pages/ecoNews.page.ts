import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class EcoNewsPage extends BasePage {

  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('h1');
  }

}