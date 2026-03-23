# SauceDemo Project

A test automation framework built with Playwright for testing the Sauce Labs demo application.

## Overview

This project is a Playwright-based testing suite designed to automate tests for the Sauce Demo web application. It includes page object models for better test organization and maintainability.

## Project Structure

```
SauceDemoProject/
├── package.json              # Project dependencies and metadata
├── playwright.config.js      # Playwright configuration
├── pages/
│   └── LoginPage.js         # Page object model for the login page
└── tests/
    └── example.spec.js      # Example test specifications
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or navigate to the project directory:
```bash
cd SauceDemoProject
```

2. Install dependencies:
```bash
npm install
```

This will install Playwright and its dependencies as specified in `package.json`.

## Configuration

The project uses `playwright.config.js` for test configuration, which includes:

- **Test Directory**: `./tests` - where all test files are located
- **Parallel Execution**: Tests run in parallel by default
- **Browser Support**: Configured for Chromium, Firefox, and WebKit
- **Reporter**: HTML reporting for test results
- **Tracing**: Trace collection on first retry for debugging

### Browser Testing

Tests are configured to run on multiple browsers:
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in a specific file
```bash
npx playwright test tests/example.spec.js
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Page Objects

### LoginPage

Located in `pages/LoginPage.js`, this page object provides:

- `username` - Username input field locator
- `password` - Password input field locator
- `loginButton` - Login button locator

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
