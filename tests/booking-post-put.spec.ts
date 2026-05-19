import { test, expect } from '@playwright/test';
import { APIClient } from '../src/utils/apiClient';
import { AuthAPI } from '../src/api/authApi';
import { BookingAPI } from '../src/api/bookingApi';

test('Create Booking', async () => {

  const requestContext = await APIClient.createContext();

  const bookingApi = new BookingAPI();

  const response = await bookingApi.createBooking(requestContext);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.booking.firstname).toBe('John');

});

test('Update Booking', async () => {

  const requestContext = await APIClient.createContext();

  const authApi = new AuthAPI(); 
  const bookingApi = new BookingAPI();

  const authResponse = await authApi.createToken(requestContext);

  const tokenBody = await authResponse.json();

  const token = tokenBody.token;

  const createResponse =
    await bookingApi.createBooking(requestContext);

  const createBody = await createResponse.json();

  const bookingId = createBody.bookingid;

  const updateResponse =
    await bookingApi.updateBooking(
      requestContext,
      bookingId,
      token
    );

  expect(updateResponse.status()).toBe(200);

});