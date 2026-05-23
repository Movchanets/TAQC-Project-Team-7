import { defineConfig } from '@playwright/test';

export default defineConfig({
 testDir: './tests',

  timeout: 30000,

  use: {
    baseURL: 'https://www.greencity.cx.ua/#/greenCity',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  reporter: [
    ['list'],
    ['allure-playwright']
  ]
});