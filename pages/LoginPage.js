export class LoginPage {
    /** @type {import('@playwright/test').Page} */
    page;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Locators
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator("h3[data-test='error']");
    }

    async goto() {
        await this.page.goto('/');
    }

    /**
     * Perform login with provided credentials
     * @param {string} username - The username to login with
     * @param {string} password - The password to login with
     */
    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    /**
     * Get the error message text if present
     * @returns {Promise<string>} The error message text
     */
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    /**
     * Check if error message is visible
     * @returns {Promise<boolean>} True if error message is visible
     */
    async isErrorDisplayed() {
        return await this.errorMessage.isVisible();
    }

    /** Clear login form fields */
    async clearForm() {
        await this.username.clear();
        await this.password.clear();
    }
}
