# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> User cannot login with invalid credentials
- Location: tests\login.spec.ts:6:5

# Error details

```
TypeError: _home.HomePage is not a constructor
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | import { HomePage } from '../pages/home.page';
  3  | import { HeaderComponent } from '../components/header.component';
  4  | import { LoginPage } from '../pages/login.page';
  5  | 
  6  | test('User cannot login with invalid credentials', async ({ page }) => {
  7  | 
> 8  |   const homePage = new HomePage(page);
     |                    ^ TypeError: _home.HomePage is not a constructor
  9  |   const header = new HeaderComponent(page);
  10 |  const loginModal = new LoginPage(page);
  11 | 
  12 |   await homePage.open(); // 👈 ось тут використовується метод
  13 | 
  14 |   await header.clickSignInButton();
  15 | 
  16 |   await loginModal.login('test@gmail.com', 'wrongpassword');
  17 | 
  18 |   await loginModal.verifyErrorMessageVisible();
  19 | });
```