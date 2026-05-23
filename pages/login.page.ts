import { Page, expect, test } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private get emailInput() { return this.page.locator('input[type="email"]'); }
  private get passwordInput() { return this.page.locator('input[type="password"]'); }
  private get submitButton() { return this.page.locator('button[type="submit"]'); }
  
  
  private get errorMessage() { 
    return this.page.locator('mat-error, div, span, p, app-error-display')
      .filter({ hasText: /Bad password|Wrong password|Невірний пароль/i })
      .first();
  }

  async login(email: string, password: string): Promise<void> {
    await test.step(`Login with email: ${email}`, async () => {
     
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    });
  }

  async verifyErrorMessageVisible(): Promise<void> {
    await test.step('Verify that login error message is displayed', async () => {
   
      await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    });
  }
}