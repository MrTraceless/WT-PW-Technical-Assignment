// baseFixture.mjs
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { OpenAccountPage } from '../pages/OpenAccountPage.js';
import { server } from '../mocks/server.js';

export const test = base.extend({
  app: async ({ page }, use) => {
    await use({ login: new LoginPage(page), home: new HomePage(page), openAccount: new OpenAccountPage(page) });
  },
  mswServer: [
    async ({ }, use) => {
      server.listen({ onUnhandledRequest: 'error' });
      try {
        await use(server);
      } finally {
        server.resetHandlers();
        server.close();
      }
    },
    { scope: 'worker' },
  ],
});

export { expect };
