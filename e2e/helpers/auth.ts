import { Page } from '@playwright/test';

/**
 * Mocks the NextAuth session endpoint so the FCFF page does not redirect
 * to "/" for unauthenticated users. Must be called before page.goto().
 */
export async function mockAuth(page: Page) {
  await page.route('/api/auth/session', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { email: 'test@test.com', name: 'Test User' },
        expires: new Date(Date.now() + 86_400_000).toISOString(),
      }),
    })
  );
}
