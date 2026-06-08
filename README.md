# 🚀 SauceDemo Test Automation Framework

A professional Playwright test automation framework implementing best practices with fixtures, Page Object Model, and comprehensive hooks.

## ✨ Features

- ✅ **Custom Fixtures** - Reusable test setup with automatic initialization
- ✅ **Page Object Model** - Clean, maintainable page abstractions
- ✅ **Environment Configuration** - Secure credential management with .env
- ✅ **Professional Hooks** - beforeEach/afterEach/beforeAll/afterAll patterns
- ✅ **Authenticated Sessions** - Skip login with pre-authenticated fixtures
- ✅ **Multiple Browsers** - Chrome, Firefox, Safari support
- ✅ **Rich Reporting** - HTML reports with screenshots and videos

## 📁 Project Structure

```
SauceDemo/
├── fixtures/
│   └── test-base.js                 # Custom fixtures (loginPage, authenticatedPage, etc.)
├── pages/
│   ├── LoginPage.js                 # Login page object with actions
│   └── InventoryPage.js             # Inventory page object with actions
├── tests/
│   ├── login.spec.js                # Login test scenarios
│   ├── inventory.spec.js            # Inventory test scenarios
│   └── hooks-examples.spec.js       # Hook patterns & examples
├── config/
│   └── testConfig.js                # Environment configuration loader
├── .env                             # Environment variables (git-ignored)
├── .env.example                     # Template for team setup
├── playwright.config.js             # Playwright configuration
├── TEST_GUIDE.md                    # Comprehensive guide & best practices
└── package.json                     # Dependencies & scripts
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your credentials (already pre-configured for SauceDemo):

```env
BASE_URL=https://www.saucedemo.com
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run specific test file
npm run test:login

# Run in headed mode (see browser)
npm run test:headed

# Run in UI mode (interactive debugging)
npm run test:ui

# Run in debug mode
npm run test:debug
```

## 📝 Writing Tests

### Using Fixtures

Fixtures automatically handle setup and teardown:

```javascript
import { test, expect } from '../fixtures/test-base.js';

test('my test', async ({ loginPage, appPage }) => {
  // loginPage is already initialized
  // appPage has already navigated to the base URL
  await loginPage.login('username', 'password');
});
```

### Available Fixtures

- **`loginPage`** - LoginPage instance
- **`inventoryPage`** - InventoryPage instance
- **`appPage`** - Page navigated to base URL
- **`authenticatedPage`** - Page with user logged in (skip login!)

### Using Hooks

```javascript
test.describe('My Test Suite', () => {
  // Runs once before all tests
  test.beforeAll(async () => {
    console.log('Suite starting');
  });

  // Runs before each test
  test.beforeEach(async ({ appPage }) => {
    // Setup for each test
  });

  // Runs after each test
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: 'failure.png' });
    }
  });

  // Runs once after all tests
  test.afterAll(async () => {
    console.log('Suite completed');
  });

  test('example test', async ({ loginPage }) => {
    // Your test here
  });
});
```

## 🎯 Key Concepts

### 1. Fixtures Avoid Repetition

**❌ Without Fixtures (Repetitive):**
```javascript
test('test 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://...');
  // test code
});

test('test 2', async ({ page }) => {
  const loginPage = new LoginPage(page);  // Repeated!
  await page.goto('https://...');          // Repeated!
  // test code
});
```

**✅ With Fixtures (Clean):**
```javascript
test('test 1', async ({ loginPage, appPage }) => {
  // Everything ready!
});

test('test 2', async ({ loginPage, appPage }) => {
  // Everything ready!
});
```

### 2. Skip Login for Speed

Tests that don't need to test login should use `authenticatedPage`:

```javascript
test('inventory test', async ({ authenticatedPage, inventoryPage }) => {
  // Already logged in! Start testing immediately.
  await inventoryPage.addProductToCart('sauce-labs-backpack');
});
```

### 3. Page Object Model

Keep tests clean by using page objects:

```javascript
// ✅ Clean and readable
await loginPage.login(username, password);

// ❌ Messy implementation details
await page.locator('#user-name').fill(username);
await page.locator('#password').fill(password);
await page.locator('#login-button').click();
```

## 📊 Test Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:debug` | Debug mode with inspector |
| `npm run test:chromium` | Chrome only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | Safari only |
| `npm run test:report` | Open HTML report |
| `npm run test:login` | Run login tests only |
| `npm run test:inventory` | Run inventory tests only |

## 📚 Documentation

- **[TEST_GUIDE.md](TEST_GUIDE.md)** - Comprehensive testing guide with best practices
- **[tests/hooks-examples.spec.js](tests/hooks-examples.spec.js)** - Real hook examples and patterns

## 🧪 Test Results

After running tests, view the detailed HTML report:

```bash
npm run test:report
```

The report includes:
- ✅ Passed/Failed tests
- 📸 Screenshots on failure
- 🎥 Videos of test execution
- 📊 Execution timeline
- 🔍 Detailed traces

## 🔒 Security

- `.env` file is git-ignored (never committed)
- Team members use `.env.example` as template
- Each developer has their own credentials
- No secrets in code or version control

## 🤝 Team Collaboration

**For new team members:**

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Update `.env` with your credentials
5. Run `npm test` to verify setup

## 📖 Learning Path

1. Start with **[TEST_GUIDE.md](TEST_GUIDE.md)** for concepts
2. Study **[tests/login.spec.js](tests/login.spec.js)** for basic patterns
3. Review **[tests/inventory.spec.js](tests/inventory.spec.js)** for authenticated fixtures
4. Explore **[tests/hooks-examples.spec.js](tests/hooks-examples.spec.js)** for advanced hooks
5. Read **[fixtures/test-base.js](fixtures/test-base.js)** to understand custom fixtures

## 🎓 Best Practices Implemented

✅ Separation of concerns (Page Objects)  
✅ DRY principle (Don't Repeat Yourself with fixtures)  
✅ Environment-based configuration  
✅ Comprehensive error handling  
✅ Clear test organization  
✅ Professional naming conventions  
✅ Detailed documentation  
✅ Team-friendly setup  

## 🐛 Debugging

### UI Mode (Recommended)
```bash
npm run test:ui
```
Interactive mode with time travel debugging!

### Debug Mode
```bash
npm run test:debug
```
Step-by-step execution with Playwright Inspector.

### Add Breakpoints in Code
```javascript
test('debug test', async ({ page }) => {
  await page.pause(); // Execution stops here
});
```

## 🚦 CI/CD Ready

The framework automatically adjusts for CI environments:
- Retries failed tests (2x on CI)
- Captures artifacts (screenshots, videos, traces)
- Optimized for parallel execution
- Clear exit codes for build systems

## 📞 Support

For questions or issues:
1. Check [TEST_GUIDE.md](TEST_GUIDE.md) for detailed explanations
2. Review example files in the `tests/` directory
3. Consult [Playwright Documentation](https://playwright.dev/)

---

**Built with ❤️ using Playwright and best practices for professional test automation**

**Usage Example:**
```javascript
import { LoginPage } from '../pages/LoginPage';

test('Login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com');
  await loginPage.username.fill('standard_user');
  await loginPage.password.fill('secret_sauce');
  await loginPage.loginButton.click();
});
```

## Project Dependencies

- **@playwright/test**: ^1.58.2 - Playwright testing framework
- **@types/node**: ^25.2.3 - TypeScript definitions for Node.js

## Contributing

1. Create new test files in the `tests/` directory
2. Create page objects in the `pages/` directory for reusable selectors
3. Follow the existing naming conventions and structure

## License

ISC

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Sauce Labs Demo App](https://www.saucedemo.com/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
