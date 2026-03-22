import * as Sentry from '@sentry/nextjs';

export async function register() {
  // MSW
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.API_MOCKING !== 'false'
    ) {
      // 동적으로 server.ts를 import 합니다.
      const { enableMocking } = await import('./mocks');
      enableMocking();
      console.log('[MSW] Server-side mocking enabled.');
    }
  }

  // Sentry
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
}

// Sentry
export const onRequestError = Sentry.captureRequestError;
