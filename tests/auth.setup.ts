import { test as setup, expect } from '@playwright/test';
import { ENV } from '../utils/env';
import { ROUTES } from '../utils/constants';


const authFile = 'playwright/.auth/user.json';

/**
 * Global Authentication Setup
 *
 * This script runs exactly once before the entire test suite.
 * It performs a real UI login to bypass Angular hydration hurdles,
 * waits for the backend to issue the JWT/Cookies, and saves the browser
 * state to 'playwright/.auth/user.json'.
 *
 * All subsequent tests use this state to start fully authenticated,
 * completely bypassing the login modal and drastically reducing test execution time.
 */

setup('Authenticate', async ({ page }) => {
    const url = new URL(ENV.BASE_URL);
    const targetRoute = url.hash || ROUTES.HOME;

    await page.goto(targetRoute);

    await page.locator('.header_sign-in-link').click();

    const emailInput = page.locator('#email');
    const passwordInput = page.locator('input[id="password"]');
    const submitButton = page.getByRole('button', { name: /sign in|увійти/i }).first();

    await emailInput.waitFor({ state: 'visible', timeout: 15000 });

    await emailInput.clear();
    await emailInput.pressSequentially(ENV.LOGIN_EMAIL, { delay: 50 });
    await emailInput.press('Tab'); 

    await passwordInput.clear();
    await passwordInput.pressSequentially(ENV.LOGIN_PASSWORD, { delay: 50 });
    await passwordInput.press('Tab');

    await expect(submitButton).toBeEnabled({ timeout: 10000 });
    await submitButton.click();

    await page.locator('.cdk-overlay-backdrop').waitFor({ state: 'detached', timeout: 15000 });

    await page.waitForURL(
    (url) => !url.hash.includes('signin') && !url.hash.includes('login'),
    { timeout: 10000 }
    );

    await page.context().storageState({ path: authFile });
});