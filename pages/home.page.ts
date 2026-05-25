import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ENV } from '../utils/env';

export class HomePage extends BasePage {
  readonly header: HeaderComponent; 

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  async navigate() {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = url.hash || '#/greenCity';
    await this.page.goto(targetRoute);
  }
}