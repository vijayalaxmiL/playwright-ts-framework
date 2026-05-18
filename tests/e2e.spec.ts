import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { users } from '../src/fixtures/testData';

test('Complete E2E Flow', async ({ page }) => {

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.navigate();

  await login.login(
    users.validUser.username,
    users.validUser.password
  );

  await inventory.addProductToCart();
  await inventory.openCart();

  await cart.clickCheckout();

  await checkout.enterCheckoutDetails(
    'Automation',
    'Tester',
    '600001'
  );

  await checkout.continueCheckout();
  await checkout.finishCheckout();

  await checkout.verifyOrderSuccess();
});