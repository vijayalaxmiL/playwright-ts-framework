import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  addToCartBtn = '#add-to-cart-sauce-labs-backpack';
  cartIcon = '.shopping_cart_link';

  async addProductToCart() {
    await this.page.click(this.addToCartBtn);
  }

  async openCart() {
    await this.page.click(this.cartIcon);
  }

  async verifyCartBadge() {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText('1');
  }
}