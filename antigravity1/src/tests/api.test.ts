import request from 'supertest';
import { app } from '../index';

describe('API integration', () => {
  it('returns 200 on health check', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('calculates emissions with valid payload', async () => {
    const payload = {
      transportation: { carDistanceKmPerWeek: 50, fuelType: 'petrol', publicTransportKmPerWeek: 10, flightsPerYear: 0 },
      energy: { electricityKWhPerMonth: 200, renewablePercentage: 20 },
      lifestyle: { dietType: 'omnivore', shoppingSpendMonthly: 100, wasteKgPerWeek: 2 }
    };

    const res = await request(app).post('/api/calculate').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('details');
  });

  it('returns 400 for invalid payload', async () => {
    const res = await request(app).post('/api/calculate').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});
