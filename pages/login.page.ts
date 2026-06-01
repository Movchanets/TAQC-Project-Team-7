import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { TIMEOUTS } from '../utils/constants';

/**
 * LoginPage
 *
 * Page Object for the login modal/form in GreenCity.
 * Note: Login is a modal overlay, not a standalone page.
 * Use the HeaderComponent.clickLogin() to open it, then call login().
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('input[id="password"]');
    this.submitButton = page.getByRole('button', { name: /sign in|увійти/i }).first();
    this.errorMessage = page.getByText(/bad email or password|невірний email або пароль/i);
  }

  /** Navigate — login is a modal, so this waits for the modal to be visible. */
  async navigate(): Promise<void> {
    await this.waitForVisible(this.emailInput, 15000);
  }

  /**
   * Perform login with the given credentials.
   * Assumes the login modal is already open.
   */
  async login(email: string, password: string): Promise<void> {
    await this.step(`Login as ${email}`, async () => {
      await this.waitForVisible(this.emailInput, 15000);
      
      await this.emailInput.clear();
      await this.emailInput.pressSequentially(email, { delay: 50 });
      await this.emailInput.press('Tab'); 
      
      await this.passwordInput.clear();
      await this.passwordInput.pressSequentially(password, { delay: 50 });
      await this.passwordInput.press('Tab');

      await expect(this.submitButton).toBeEnabled({ timeout: 10000 });
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
