import { test, expect } from '@playwright/test';
import { APIClient } from '../src/utils/apiClient';
import { BookingAPI } from '../src/api/bookingApi';

test('Get All Bookings', async () => {

  const requestContext = await APIClient.createContext();

  const bookingApi = new BookingAPI();

  const response = await bookingApi.getBookings(requestContext);

  expect(response.status()).toBe(200);

});

test('Get Invalid Booking', async () => {

  const requestContext = await APIClient.createContext();

  const bookingApi = new BookingAPI();

  const response = await bookingApi.getBookingById(
    requestContext,
    999999
  );

  expect(response.status()).toBe(404);

});