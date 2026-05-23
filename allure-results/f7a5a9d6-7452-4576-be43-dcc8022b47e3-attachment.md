# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> User cannot login with invalid credentials
- Location: tests\login.spec.ts:3:5

# Error details

```
SyntaxError: Unexpected token 'export'
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | 
  3  | test('User cannot login with invalid credentials', async ({ page }) => {
> 4  |   const { HomePage } = await import('../pages/home.page');
     |                        ^ SyntaxError: Unexpected token 'export'
  5  |   const { HeaderComponent } = await import('../components/header.component');
  6  |   const { LoginPage } = await import('../pages/login.page');
  7  | 
  8  |   const homePage = new HomePage(page);
  9  |   const header = new HeaderComponent(page);
  10 |   const loginPage = new LoginPage(page);
  11 | 
  12 |   await homePage.open();
  13 | 
  14 |   await header.clickSignInButton();
  15 | 
  16 |   await loginPage.login('test@gmail.com', 'wrongpassword');
  17 | 
  18 |   await loginPage.verifyErrorMessageVisible();
  19 | });
```