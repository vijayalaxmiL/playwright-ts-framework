import { test, expect } from '@playwright/test';
import { APIClient } from '../src/utils/apiClient';
import { AuthAPI } from '../src/api/authApi';
import { BookingAPI } from '../src/api/bookingApi';

test('Complete API E2E Flow', async () => {

  const requestContext = await APIClient.createContext();

  const authApi = new AuthAPI();
  const bookingApi = new BookingAPI();

  // CREATE TOKEN
  const authResponse =
    await authApi.createToken(requestContext);

  const tokenBody = await authResponse.json();

  const token = tokenBody.token;

  // CREATE BOOKING
  const createResponse =
    await bookingApi.createBooking(requestContext);

  const createBody = await createResponse.json();

  const bookingId = createBody.bookingid;

  expect(createResponse.status()).toBe(200);

  // UPDATE BOOKING
  const updateResponse =
    await bookingApi.updateBooking(
      requestContext,
      bookingId,
      token
    );

  expect(updateResponse.status()).toBe(200);

  // VERIFY BOOKING
  const verifyResponse =
    await bookingApi.getBookingById(
      requestContext,
      bookingId
    );

  expect(verifyResponse.status()).toBe(200);

  // DELETE BOOKING
  const deleteResponse =
    await bookingApi.deleteBooking(
      requestContext,
      bookingId,
      token
    );

  expect(deleteResponse.status()).toBe(201);

});