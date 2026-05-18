import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { users } from '../src/fixtures/testData';

test('Successful Checkout', async ({ page }) => {

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
    'John',
    'Doe',
    '600001'
  );

  await checkout.continueCheckout();
  await checkout.finishCheckout();

  await checkout.verifyOrderSuccess();
});

test('Checkout Validation Error', async ({ page }) => {

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

  await checkout.enterCheckoutDetails('', '', '');

  await checkout.continueCheckout();

  await checkout.verifyValidationError();
});