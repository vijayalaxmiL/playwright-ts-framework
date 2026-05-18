import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  firstName = '#first-name';
  lastName = '#last-name';
  postalCode = '#postal-code';
  continueBtn = '#continue';
  finishBtn = '#finish';
  successMsg = '.complete-header';
  errorMsg = '[data-test="error"]';

  async enterCheckoutDetails(fn: string, ln: string, zip: string) {
    await this.page.fill(this.firstName, fn);
    await this.page.fill(this.lastName, ln);
    await this.page.fill(this.postalCode, zip);
  }

  async continueCheckout() {
    await this.page.click(this.continueBtn);
  }

  async finishCheckout() {
    await this.page.click(this.finishBtn);
  }

  async verifyOrderSuccess() {
    await expect(this.page.locator(this.successMsg))
      .toHaveText('Thank you for your order!');
  }

  async verifyValidationError() {
    await expect(this.page.locator(this.errorMsg)).toBeVisible();
  }
}