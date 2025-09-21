// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET /user?user_id=111
  http.get('http://localhost/user', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');

    if (!userId) {
      return HttpResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    return HttpResponse.json({
      username: 'john_doe',
      age: 30,
      user_id: userId,
    }, { status: 200 });
  }),

  // POST /user
  http.post('http://localhost/user', async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const { username, age, user_type } = body || {};

    if (typeof username !== 'string' || username.length === 0) {
      return HttpResponse.json({ error: 'username must be non-empty string' }, { status: 400 });
    }
    if (typeof age !== 'number' || age < 1 || age > 100) {
      return HttpResponse.json({ error: 'age must be int in [1,100]' }, { status: 400 });
    }
    if (typeof user_type !== 'boolean') {
      return HttpResponse.json({ error: 'user_type must be boolean' }, { status: 400 });
    }

    return HttpResponse.json({
      user_id: 'user-100500',
      username,
    }, { status: 201 });
  }),
];
