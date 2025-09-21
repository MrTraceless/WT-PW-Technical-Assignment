import { test, expect } from '../../fixtures/baseFixture.js';

test.describe('User API', { tag: ['@api'] }, () => {
  test('POST /user create user, return user_id and username', async ({ request, mswServer }) => {
    const payload = { username: 'Marina', age: 28, user_type: true };
    const resp = await request.post(`/user`, {
      data: payload,
    });
    expect(resp.status()).toBe(201);

    const json = await resp.json();

    expect(json).toMatchObject({
      user_id: expect.any(String),
      username: payload.username,
    });
  });

  test('POST /user request with age outside the range [1-100], the server should return 400 Bad Request', async ({ request, mswServer }) => {
    const payload = { username: 'Joрт', age: 0, user_type: false };

    const resp = await request.post(`/user`, { data: payload });
    expect(resp.status()).toBe(400);

    const json = await resp.json();

    expect(json.error).toContain('age');
  });

  test('GET /user return username, age, user_id by user_id', async ({ request, mswServer }) => {
    const userId = 'agent-777';
    const resp = await request.get(`/user`, {
      params: { user_id: userId },
    });

    expect(resp.status()).toBe(200);
    const json = await resp.json();

    expect(json).toEqual({
      username: expect.any(String),
      age: expect.any(Number),
      user_id: userId,
    });

    expect(json.age).toBeGreaterThanOrEqual(1);
    expect(json.age).toBeLessThanOrEqual(100);
  });
});
