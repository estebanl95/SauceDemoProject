// // @ts-check
// /**
//  * Inventory Test Suite
//  * Tests product inventory functionality
//  * Uses authenticatedPage fixture to skip login for better performance
//  */
// import { test, expect } from '../fixtures/test-base.js';

// /**
//  * Test Suite: Inventory Page
//  * All tests in this suite start with an authenticated session
//  */
// test.describe('Inventory Page', () => {
  
//   /**
//    * beforeEach - Runs before each test
//    * The authenticatedPage fixture already logs in, so we just verify the state
//    */
//   test.beforeEach(async ({ authenticatedPage, inventoryPage }) => {
//     // Verify we're on the inventory page
//     await expect(authenticatedPage).toHaveURL(/.*inventory.html/);
//     console.log('Authenticated session ready - Inventory page loaded');
//   });

//   test('should display inventory page with products', async ({ inventoryPage }) => {
//     // Assert
//     await expect(inventoryPage.pageTitle).toHaveText('Products');
//     const itemCount = await inventoryPage.getInventoryItemCount();
//     expect(itemCount).toBeGreaterThan(0);
//   });

//   test('should display exactly 6 products', async ({ inventoryPage }) => {
//     // Assert
//     const itemCount = await inventoryPage.getInventoryItemCount();
//     expect(itemCount).toBe(6);
//   });

//   test('should add product to cart successfully', async ({ inventoryPage }) => {
//     // Act
//     await inventoryPage.addProductToCart('sauce-labs-backpack');
    
//     // Assert
//     const cartCount = await inventoryPage.getCartBadgeCount();
//     expect(cartCount).toBe('1');
//   });

//   test('should add multiple products to cart', async ({ inventoryPage }) => {
//     // Act
//     await inventoryPage.addProductToCart('sauce-labs-backpack');
//     await inventoryPage.addProductToCart('sauce-labs-bike-light');
//     await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');
    
//     // Assert
//     const cartCount = await inventoryPage.getCartBadgeCount();
//     expect(cartCount).toBe('3');
//   });

//   test('should remove product from cart', async ({ inventoryPage }) => {
//     // Arrange
//     await inventoryPage.addProductToCart('sauce-labs-backpack');
//     await inventoryPage.addProductToCart('sauce-labs-bike-light');
    
//     // Act
//     await inventoryPage.removeProductFromCart('sauce-labs-backpack');
    
//     // Assert
//     const cartCount = await inventoryPage.getCartBadgeCount();
//     expect(cartCount).toBe('1');
//   });

//   test('should logout successfully', async ({ inventoryPage, page }) => {
//     // Act
//     await inventoryPage.logout();
    
//     // Assert
//     await expect(page).toHaveURL(/.*\/$|.*index.html/);
//     await expect(page.locator('#login-button')).toBeVisible();
//   });
// });

// /**
//  * Test Suite: Inventory Page - Alternative approach using test.describe.serial
//  * Tests run in order and share state (use carefully!)
//  */
// test.describe.serial('Cart Workflow - Sequential Tests', () => {
  
//   test.beforeEach(async ({ authenticatedPage }) => {
//     await expect(authenticatedPage).toHaveURL(/.*inventory.html/);
//   });

//   test('step 1: should start with empty cart', async ({ inventoryPage }) => {
//     // Cart badge should not be visible when empty
//     const badge = inventoryPage.page.locator('.shopping_cart_badge');
//     await expect(badge).not.toBeVisible();
//   });

//   test('step 2: should navigate to cart page', async ({ inventoryPage }) => {
//     await inventoryPage.goToCart();
//     await expect(inventoryPage.page).toHaveURL(/.*cart.html/);
//   });
// });