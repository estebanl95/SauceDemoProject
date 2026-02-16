export class LoginPage {

    /** @type {Page} */
    page;

    /**
     * @param {Page} page
     */

    constructor(page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

}
