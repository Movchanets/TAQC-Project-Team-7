import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ROUTES } from '../utils/constants';

/**
 * HomePage
 *
 * Page Object for the GreenCity main landing page.
 */
export class HomePage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  get url(): string {
    return ROUTES.HOME;
  }

  /** Wait for the home page to be fully loaded. */
  async waitForPageReady(): Promise<void> {
    await this.header.waitForReady();
    await this.page.waitForLoadState('load');
  }
}
