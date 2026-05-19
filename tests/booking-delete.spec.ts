import { test, expect } from '@playwright/test';
import { APIClient } from '../src/utils/apiClient';
import { AuthAPI } from '../src/api/authApi';
import { BookingAPI } from '../src/api/bookingApi';

test('Delete Booking', async () => {

  const requestContext = await APIClient.createContext();

  const authApi = new AuthAPI();
  const bookingApi = new BookingAPI();

  const authResponse =
    await authApi.createToken(requestContext);

  const tokenBody = await authResponse.json();

  const token = tokenBody.token;

  const createResponse =
    await bookingApi.createBooking(requestContext);

  const createBody = await createResponse.json();

  const bookingId = createBody.bookingid;

  const deleteResponse =
    await bookingApi.deleteBooking(
      requestContext,
      bookingId,
      token
    );

  expect(deleteResponse.status()).toBe(201);

});