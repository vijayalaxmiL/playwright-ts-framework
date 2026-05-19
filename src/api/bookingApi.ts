import { APIRequestContext } from '@playwright/test';

export class BookingAPI {

  async getBookings(requestContext: APIRequestContext) {
    return await requestContext.get('/booking');
  }

  async getBookingById(requestContext: APIRequestContext, id: number) {
    return await requestContext.get(`/booking/${id}`);
  }

  async createBooking(request: APIRequestContext) {
    return await request.post('/booking', {
      data: {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-01-05'
        },
        additionalneeds: 'Breakfast'
      }
    });
  }

  async updateBooking(
    request: APIRequestContext,
    bookingId: number,
    token: string
  ) {
    return await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        firstname: 'Updated',
        lastname: 'User',
        totalprice: 1000,
        depositpaid: false,
        bookingdates: {
          checkin: '2025-02-01',
          checkout: '2025-02-10'
        },
        additionalneeds: 'Lunch'
      }
    });
  }

  async deleteBooking(
    request: APIRequestContext,
    bookingId: number,
    token: string
  ) {
    return await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });
  }
}