import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { users } from '../src/fixtures/testData';

test('Valid Login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.login(
    users.validUser.username,
    users.validUser.password
  );

  await login.verifyLoginSuccess();
});

test('Invalid Login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.navigate();
  await login.login(
    users.invalidUser.username,
    users.invalidUser.password
  );

  await login.verifyLoginFailure();
});