import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  checkoutBtn = '#checkout';

  async clickCheckout() {
    await this.page.click(this.checkoutBtn);
  }
}