import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async shouldBeVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}