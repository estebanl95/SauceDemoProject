# Test Automation Best Practices Guide

## 📁 Project Structure

```
SauceDemo/
├── fixtures/
│   └── test-base.js          # Custom reusable fixtures
├── pages/
│   ├── LoginPage.js           # Login page object
│   └── InventoryPage.js       # Inventory page object
├── tests/
│   ├── login.spec.js          # Login test suite
│   └── inventory.spec.js      # Inventory test suite
├── config/
│   └── testConfig.js          # Environment configuration
├── .env                       # Environment variables (git-ignored)
├── .env.example              # Template for team members
└── playwright.config.js       # Playwright configuration
```

## 🎯 Key Concepts Implemented

### 1. Custom Fixtures (fixtures/test-base.js)

Fixtures are Playwright's way of setting up test preconditions and providing reusable objects:

```javascript
import { test, expect } from '../fixtures/test-base';

// Use the fixtures in your tests
test('my test', async ({ loginPage, authenticatedPage }) => {
  // loginPage and authenticatedPage are automatically set up
});
```

**Available Fixtures:**
- `loginPage` - LoginPage instance, automatically initialized
- `inventoryPage` - InventoryPage instance, automatically initialized
- `appPage` - Page already navigated to the base URL
- `authenticatedPage` - Page with user already logged in (saves time!)

### 2. Page Object Model (POM)

Each page has its own class with:
- **Locators**: All element selectors in one place
- **Actions**: Reusable methods for page interactions
- **Getters**: Methods to retrieve page information

**Example:**
```javascript
// Instead of this in every test:
await page.locator('#user-name').fill('username');
await page.locator('#password').fill('password');
await page.locator('#login-button').click();

// Use this:
await loginPage.login('username', 'password');
```

### 3. Hooks: beforeEach, afterEach, beforeAll, afterAll

**Use Cases:**

#### beforeEach
Runs before EACH test in a describe block:
```javascript
test.beforeEach(async ({ appPage }) => {
  // Setup that runs before every single test
  console.log('Starting new test');
});
```

**When to use:**
- Navigate to starting page
- Clear cookies/storage
- Set up test data
- Reset application state

#### afterEach
Runs after EACH test:
```javascript
test.afterEach(async ({ page }, testInfo) => {
  // Cleanup or logging after each test
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `failure-${testInfo.title}.png` });
  }
});
```

**When to use:**
- Take screenshots on failure
- Clean up test data
- Log test results
- Close connections

#### beforeAll
Runs ONCE before all tests in a describe block:
```javascript
test.beforeAll(async () => {
  // Setup that runs once for the entire suite
  console.log('Test suite starting');
  // Example: Database setup, API authentication
});
```

**When to use:**
- Heavy setup operations (database connections, etc.)
- One-time configuration
- Creating shared test data

#### afterAll
Runs ONCE after all tests:
```javascript
test.afterAll(async () => {
  // Cleanup that runs once after all tests
  console.log('Test suite completed');
  // Example: Close database connections, cleanup files
});
```

**When to use:**
- Final cleanup
- Close shared resources
- Generate reports

### 4. Test Organization Patterns

#### Standard Parallel Tests
```javascript
test.describe('Feature Name', () => {
  test('test 1', async () => { /* ... */ });
  test('test 2', async () => { /* ... */ });
  // Both run in parallel, independent of each other
});
```

#### Sequential Tests (use sparingly!)
```javascript
test.describe.serial('Multi-step workflow', () => {
  test('step 1', async () => { /* ... */ });
  test('step 2', async () => { /* ... */ });
  // Tests run in order, one after another
});
```

#### Focused Tests (debugging only!)
```javascript
test.only('this test runs alone', async () => { /* ... */ });
// Only this test will run - remember to remove .only before committing!
```

#### Skip Tests
```javascript
test.skip('not ready yet', async () => { /* ... */ });
// This test will be skipped
```

## 🔧 Environment Configuration

### Using .env file:
```bash
# .env
BASE_URL=https://www.saucedemo.com
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

### Accessing in tests:
```javascript
const config = require('../config/testConfig');

await loginPage.login(
  config.credentials.username,
  config.credentials.password
);
```

## 🚀 Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test tests/login.spec.js

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Generate and open HTML report
npm run test:report
```

## ✅ Best Practices

### 1. **Use Fixtures Instead of Repeated Setup**
❌ Bad:
```javascript
test('test 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://...');
  // ... test code
});

test('test 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://...');
  // ... test code
});
```

✅ Good:
```javascript
test('test 1', async ({ loginPage, appPage }) => {
  // loginPage and navigation already done!
  // ... test code
});

test('test 2', async ({ loginPage, appPage }) => {
  // loginPage and navigation already done!
  // ... test code
});
```

### 2. **Skip Login When Not Needed**
✅ Use `authenticatedPage` fixture for tests that don't need to test login:
```javascript
test('inventory test', async ({ authenticatedPage, inventoryPage }) => {
  // Already logged in, start testing inventory functionality
  await inventoryPage.addProductToCart('sauce-labs-backpack');
});
```

### 3. **Keep Page Objects Focused**
- One page object per page/component
- Methods should represent user actions
- No assertions in page objects (keep them in tests)

### 4. **Use Descriptive Test Names**
```javascript
// ✅ Good
test('should display error message when username is empty', async () => {});

// ❌ Bad
test('test1', async () => {});
```

### 5. **Follow AAA Pattern**
```javascript
test('example', async ({ loginPage }) => {
  // Arrange - Set up test data and preconditions
  const username = 'test_user';
  
  // Act - Perform the action being tested
  await loginPage.login(username, 'password');
  
  // Assert - Verify the results
  await expect(loginPage.page).toHaveURL(/inventory/);
});
```

## 🐛 Debugging Tips

### 1. Use UI Mode
```bash
npm run test:ui
```
Interactive mode with time travel debugging!

### 2. Use Debug Mode
```bash
npm run test:debug
```
Opens Playwright Inspector for step-by-step debugging.

### 3. Add Breakpoints
```javascript
test('debug test', async ({ page }) => {
  await page.pause(); // Pauses execution
  // ... rest of test
});
```

### 4. Console Logging
```javascript
test.beforeEach(async () => {
  console.log('Test starting');
});
```

### 5. Screenshots
Automatically taken on failure (configured in playwright.config.js)

## 📊 Test Reports

After running tests:
```bash
npm run test:report
```

This opens the HTML report showing:
- Test results
- Screenshots
- Videos
- Traces
- Execution time

## 🔄 Continuous Integration

The configuration automatically adjusts for CI:
- Retries: 2 attempts on CI
- Workers: Single worker on CI (parallel locally)
- Screenshots & videos on failure

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Fixtures Guide](https://playwright.dev/docs/test-fixtures)
- [Best Practices](https://playwright.dev/docs/best-practices)
