import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.locator('app-root').isVisible();
  }
}