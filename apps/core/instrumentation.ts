export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (process.env.NODE_ENV !== 'production') {
      // 동적으로 server.ts를 import 합니다.
      const { enableMocking } = await import('./mocks');
      enableMocking();
      console.log('[MSW] Server-side mocking enabled.');
    }
  }
}
