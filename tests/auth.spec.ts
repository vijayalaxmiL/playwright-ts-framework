import { test, expect } from '@playwright/test';
import { APIClient } from '../src/utils/apiClient';
import { AuthAPI } from '../src/api/authApi';

test('Positive Auth Test', async () => {

  const requestContext = await APIClient.createContext();

  const authApi = new AuthAPI();

  const response = await authApi.createToken(requestContext);

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.token).toBeTruthy();

});

test('Negative Auth Test', async () => {

  const requestContext = await APIClient.createContext();

  const response = await requestContext.post('/auth', {

    data: {
      username: 'invalid',
      password: 'wrong'
    }

  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toContain('Bad credentials');

});