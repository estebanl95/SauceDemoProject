import { test, expect } from '../fixtures/test-base.js';
// import { test, expect } from '../pages/InventoryPage.js'
import config from '../config/testConfig.js';

test.describe('Login tests ', () => {
  
  test.beforeEach(async ({ appPage }) => {
    // Using the appPage fixture automatically navigates to the app
    console.log('Test starting - Application loaded');
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Test "${testInfo.title}" completed with status: ${testInfo.status}`);
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `test-results/failure-${testInfo.title}-${Date.now()}.png` });
    }
  });

  test('functionality of successful login using valid credentials', async ({ loginPage }) => {
    await loginPage.login(config.credentials.username, config.credentials.password);
    await expect(loginPage.page).toHaveURL(/.*inventory.html/);
    await expect(loginPage.page.locator('.title')).toHaveText('Products');
  });

  test('functionality of displaying an error message using invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match any user in this service');
  });

  test('functionality of displaying an error message when username is empty', async ({ loginPage }) => {
    await loginPage.login('', config.credentials.password);
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username is required');
  });

  test('functionality of displaying an error message when password is empty', async ({ loginPage }) => {
    await loginPage.login(config.credentials.username, '');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Password is required');
  });

  test('functionality of clearing form fields successfully', async ({ loginPage }) => {
    await loginPage.login('test_user', 'test_pass');
    await loginPage.clearForm();
    await expect(loginPage.username).toBeEmpty();
    await expect(loginPage.password).toBeEmpty();
  });

  test('functionality of an user who has been locked out of the system', async ({ loginPage }) => {
    await loginPage.login(config.credentials.lockedOutUser, config.credentials.password);
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Sorry, this user has been locked out.');
  });

  test('functionality of logging in with a problem user', async ({ loginPage }) => {
    await loginPage.login(config.credentials.problemUser, config.credentials.password);
    await expect(loginPage.page).toHaveURL(/.*inventory.html/);
    await expect(loginPage.page.locator('.title')).toHaveText('Products');
  });

  test('functionality of logging in with a performance glitch user', async ({ loginPage }) => {
    test.setTimeout(60000); // Este usuario tarda más, le damos 60 segundos
    await loginPage.login(config.credentials.performanceGlitchUser, config.credentials.password);
    await expect(loginPage.page).toHaveURL(/.*inventory.html/, { timeout: 30000 }); // Espera hasta 30s a que cambie la URL
    await expect(loginPage.page.locator('.title')).toHaveText('Products');
  });
  



});
