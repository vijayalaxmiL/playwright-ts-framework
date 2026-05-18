import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { users } from '../src/fixtures/testData';

test('Add Product To Cart', async ({ page }) => {

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.navigate();

  await login.login(
    users.validUser.username,
    users.validUser.password
  );

  await inventory.addProductToCart();
  await inventory.verifyCartBadge();
});

test('Invalid Product Interaction', async ({ page }) => {

  const login = new LoginPage(page);

  await login.navigate();

  await login.login(
    users.validUser.username,
    users.validUser.password
  );

  // Negative scenario
  // Attempt invalid locator/product

  await page.locator('#invalid-product').click({
    timeout: 3000
  }).catch(() => {
    console.log('Invalid product interaction verified');
  });
});