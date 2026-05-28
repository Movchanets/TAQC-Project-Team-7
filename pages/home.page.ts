import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ENV } from '../utils/env';
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

  /** Navigate to the home page. */
  async navigate(): Promise<void> {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = url.hash || ROUTES.HOME;
    await this.page.goto(targetRoute);
  }

  /** Wait for the home page to be fully loaded. */
  async waitForPageReady(): Promise<void> {
    await this.header.waitForReady();
    await this.page.waitForLoadState('networkidle');
  }
}
