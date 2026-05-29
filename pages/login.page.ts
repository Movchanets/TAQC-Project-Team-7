import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TIMEOUTS } from '../utils/constants';

/**
 * LoginPage
 *
 * Page Object for the login modal/form in GreenCity.
 * Note: Login is a modal overlay, not a standalone page.
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.locator('input[id="password"]');
    this.submitButton = page.locator('.is-filled, button[type="submit"]').getByText('Sign in', { exact: true });
    this.errorMessage = page.getByText(/bad email or password|невірний email або пароль/i);
  }

  /** Navigate — login is a modal, so this waits for the modal to be visible. */
  async navigate(): Promise<void> {
    await this.waitForVisible(this.emailInput, TIMEOUTS.LONG);
  }

  /**
   * Perform login with the given credentials.
   * Uses dispatchEvent to ensure Angular reactive forms detect value changes
   * across all browsers (Firefox/WebKit don't trigger input events on fill()).
   */
  async login(email: string, password: string): Promise<void> {
    await this.step(`Login as ${email}`, async () => {
      await this.waitForVisible(this.emailInput, TIMEOUTS.MEDIUM);
      await this.emailInput.fill(email);
      await this.emailInput.dispatchEvent('input');

      await this.passwordInput.fill(password);
      await this.passwordInput.dispatchEvent('input');

      await this.submitButton.click();
    });
  }

  /** Check if the error message is displayed after a failed login attempt. */
  async hasError(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: TIMEOUTS.SHORT });
      return true;
    } catch {
      return false;
    }
  }
}
