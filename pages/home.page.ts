import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component'; // Перевір цей шлях!

export class HomePage extends BasePage {
  // Цей рядок обов'язковий, щоб тест бачив слово "header"!
  readonly header: HeaderComponent; 

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  async navigate() {
    await this.page.goto('#/greenCity');
  }
}