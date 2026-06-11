import request from 'supertest';
import { app } from '../index';

describe('Goals API', () => {
  it('creates and lists goals', async () => {
    const payload = { userId: 'user-1', title: 'Reduce 10%', targetPercentReduction: 10 };
    const res = await request(app).post('/api/goals').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');

    const list = await request(app).get(`/api/goals/${payload.userId}`);
    expect(list.status).toBe(200);
    expect(list.body.goals).toBeInstanceOf(Array);
    expect(list.body.goals.length).toBeGreaterThanOrEqual(1);
  });
});
