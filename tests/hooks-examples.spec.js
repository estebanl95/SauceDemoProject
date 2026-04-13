// // @ts-check
// /**
//  * Advanced Hooks Examples
//  * This file demonstrates various hook patterns and best practices
//  * Use this as a reference for implementing hooks in your test suites
//  */
// import { test, expect } from '../fixtures/test-base.js';
// import config from '../config/testConfig.js';

// /**
//  * Example 1: Suite-level hooks (beforeAll/afterAll)
//  * These run once for the entire describe block
//  */
// test.describe('Suite-level Hooks Example', () => {
//   // This runs ONCE before all tests in this suite
//   test.beforeAll(async () => {
//     console.log('🚀 Test suite started');
//     console.log(`Running tests against: ${config.baseUrl}`);
//     // Use for: Database setup, API connections, heavy initialization
//   });

//   // This runs ONCE after all tests in this suite
//   test.afterAll(async () => {
//     console.log('✅ Test suite completed');
//     // Use for: Cleanup shared resources, close connections, generate reports
//   });

//   // This runs BEFORE EACH test
//   test.beforeEach(async ({ appPage }) => {
//     console.log('  ▶️  Starting individual test');
//   });

//   // This runs AFTER EACH test
//   test.afterEach(async ({ page }, testInfo) => {
//     console.log(`  ✓  Test "${testInfo.title}" finished: ${testInfo.status}`);
//   });

//   test('first test in suite', async ({ appPage, loginPage }) => {
//     await expect(loginPage.username).toBeVisible();
//   });

//   test('second test in suite', async ({ appPage, loginPage }) => {
//     await expect(loginPage.password).toBeVisible();
//   });
// });

// /**
//  * Example 2: Test-specific data setup
//  * Using beforeEach to prepare test data
//  */
// test.describe('Data Preparation with Hooks', () => {
//   let testData;

//   test.beforeEach(async () => {
//     // Prepare fresh test data for each test
//     testData = {
//       validUser: config.credentials.username,
//       validPassword: config.credentials.password,
//       invalidUser: 'invalid_user',
//       invalidPassword: 'wrong_password'
//     };
//     console.log('Test data prepared:', testData.validUser);
//   });

//   test('should use test data from beforeEach', async ({ appPage, loginPage }) => {
//     await loginPage.login(testData.validUser, testData.validPassword);
//     await expect(loginPage.page).toHaveURL(/.*inventory.html/);
//   });
// });

// /**
//  * Example 3: Conditional cleanup based on test result
//  * Take screenshot only on failure, log all results
//  */
// test.describe('Smart Cleanup Examples', () => {
//   test.afterEach(async ({ page }, testInfo) => {
//     // Capture screenshot on failure
//     if (testInfo.status === 'failed') {
//       const timestamp = Date.now();
//       const screenshotPath = `test-results/screenshots/${testInfo.title.replace(/\s+/g, '-')}-${timestamp}.png`;
//       await page.screenshot({ path: screenshotPath, fullPage: true });
//       console.log(`📸 Screenshot saved: ${screenshotPath}`);
//     }

//     // Log execution time
//     const duration = testInfo.duration;
//     console.log(`⏱️  Test duration: ${duration}ms`);

//     // Collect errors
//     if (testInfo.error) {
//       console.log('❌ Error details:', testInfo.error.message);
//     }
//   });

//   test('passing test - no screenshot', async ({ appPage, loginPage }) => {
//     await expect(loginPage.loginButton).toBeVisible();
//   });

//   // Uncomment to see failure handling
//   // test.skip('failing test - will capture screenshot', async ({ page }) => {
//   //   await expect(page.locator('#non-existent')).toBeVisible();
//   // });
// });

// /**
//  * Example 4: Storage state management
//  * Clear cookies/storage between tests
//  */
// test.describe('Storage Management', () => {
//   test.beforeEach(async ({ page }) => {
//     // Clear all storage before each test
//     await page.context().clearCookies();
//     console.log('🧹 Cookies cleared');
//   });

//   test('should start with clean storage', async ({ appPage, loginPage }) => {
//     // Verify no stored auth
//     const cookies = await loginPage.page.context().cookies();
//     expect(cookies.length).toBe(0);
//   });
// });

// /**
//  * Example 5: Nested describe blocks with inherited hooks
//  * Hooks cascade down to nested describe blocks
//  */
// test.describe('Parent Suite', () => {
//   test.beforeAll(async () => {
//     console.log('Parent beforeAll - runs once');
//   });

//   test.beforeEach(async () => {
//     console.log('  Parent beforeEach - runs before each test');
//   });

//   test('test in parent', async ({ appPage, loginPage }) => {
//     console.log('    Test in parent');
//     await expect(loginPage.loginButton).toBeVisible();
//   });

//   test.describe('Child Suite', () => {
//     test.beforeEach(async () => {
//       console.log('    Child beforeEach - runs after parent beforeEach');
//     });

//     test('test in child', async ({ appPage, loginPage }) => {
//       console.log('      Test in child');
//       // Both parent and child beforeEach have run
//       await expect(loginPage.loginButton).toBeVisible();
//     });
//   });
// });

// /**
//  * Example 6: Parameterized tests with data preparation
//  * Run same test with different data sets
//  */
// test.describe('Data-Driven Testing', () => {
//   const testUsers = [
//     { username: 'standard_user', shouldSucceed: true },
//     { username: 'locked_out_user', shouldSucceed: false },
//     { username: 'problem_user', shouldSucceed: true },
//   ];

//   for (const userData of testUsers) {
//     test(`should handle login for ${userData.username}`, async ({ appPage, loginPage }) => {
//       await loginPage.login(userData.username, config.credentials.password);
      
//       if (userData.shouldSucceed) {
//         await expect(loginPage.page).toHaveURL(/.*inventory.html/);
//       } else {
//         await expect(loginPage.errorMessage).toBeVisible();
//       }
//     });
//   }
// });

// /**
//  * Example 7: Retry logic for flaky tests
//  * Configure retries at test level
//  */
// test.describe('Flaky Test Management', () => {
//   test('test with custom retry logic', async ({ appPage, loginPage }) => {
//     // This test will retry up to 2 times if it fails
//     test.info().annotations.push({ type: 'issue', description: 'JIRA-123' });
    
//     await loginPage.login(config.credentials.username, config.credentials.password);
//     await expect(loginPage.page).toHaveURL(/.*inventory.html/);
//   });
// });

// /**
//  * Example 8: Test info and annotations
//  * Add metadata to tests
//  */
// test.describe('Test Metadata', () => {
//   test('test with annotations', async ({ appPage, loginPage }, testInfo) => {
//     // Add custom annotations
//     testInfo.annotations.push(
//       { type: 'category', description: 'smoke' },
//       { type: 'jira', description: 'PROJ-123' },
//       { type: 'author', description: 'QA Team' }
//     );

//     // Access test information
//     console.log('Test Title:', testInfo.title);
//     console.log('Test File:', testInfo.file);
//     console.log('Project:', testInfo.project.name);

//     await expect(loginPage.loginButton).toBeVisible();
//   });
// });

// /**
//  * Example 9: Timeout management in hooks
//  * Set custom timeouts for slow operations
//  */
// test.describe('Timeout Management', () => {
//   test.beforeEach(async ({ page }) => {
//     // Set longer timeout for slow beforeEach operations
//     test.setTimeout(60000); // 60 seconds
//     console.log('Performing slow setup...');
//     // Simulate slow operation
//     await page.waitForTimeout(100);
//   });

//   test('test with custom timeout', async ({ appPage, loginPage }) => {
//     await expect(loginPage.loginButton).toBeVisible();
//   });
// });