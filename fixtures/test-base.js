import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import config from '../config/testConfig.js';

export const test = base.extend({
  /** Fixture that provides a LoginPage instance and it is automatically initialized for each test */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /** Fixture that navigates to the application before each test. This is required to be used when I want to start at the landing page */
  appPage: async ({ page }, use) => {
    await page.goto(config.baseUrl);
    await use(page);
  },

  /** Fixture that provides an authenticated session. Use this when tests need to skip login and start at inventory */
  authenticatedPage: async ({ page }, use) => {
    await page.goto(config.baseUrl);
    const loginPage = new LoginPage(page);
    await loginPage.login(config.credentials.username, config.credentials.password);
    await page.waitForURL(/.*inventory.html/);
    await use(page);
  },
});

export { expect } from '@playwright/test';
