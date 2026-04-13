/**
 * InventoryPage - Page Object Model for SauceDemo inventory page
 * Contains all locators and actions related to product inventory
 */
export class InventoryPage {
    /** @type {import('@playwright/test').Page} */
    page;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Locators
        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    /**
     * Get the page title text
     * @returns {Promise<string>} The page title text
     */
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    /**
     * Get the count of inventory items
     * @returns {Promise<number>} Number of items in inventory
     */
    async getInventoryItemCount() {
        return await this.inventoryItems.count();
    }

    /**
     * Add a product to cart by name
     * @param {string} productName - Name of the product to add
     */
    async addProductToCart(productName) {
        const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s/g, '-')}"]`);
        await addButton.click();
    }

    /**
     * Remove a product from cart by name
     * @param {string} productName - Name of the product to remove
     */
    async removeProductFromCart(productName) {
        const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s/g, '-')}"]`);
        await removeButton.click();
    }

    /**
     * Get the shopping cart badge count
     * @returns {Promise<string>} The cart badge number
     */
    async getCartBadgeCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        return await badge.textContent();
    }

    /**
     * Click on the shopping cart
     */
    async goToCart() {
        await this.shoppingCart.click();
    }

    /**
     * Perform logout
     */
    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    /**
     * Check if user is on inventory page
     * @returns {Promise<boolean>} True if on inventory page
     */
    async isInventoryPageDisplayed() {
        return await this.pageTitle.isVisible();
    }
}