import { APIRequestContext } from '@playwright/test';

export class AuthAPI {

  async createToken(requestContext: APIRequestContext) {
    return await requestContext.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });
  }
}