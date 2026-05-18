import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  username = '#user-name';
  password = '#password';
  loginBtn = '#login-button';
  errorMessage = '[data-test="error"]';

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(user: string, pass: string) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginBtn);
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyLoginFailure() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }
}