/** MSW MOCKING */

const mswMocking = async () => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_API_MOCKING !== 'false'
  ) {
    // 동적으로 server.ts를 import 합니다.
    const { enableMocking } = await import('@core/mocks');
    enableMocking();
    console.log('[MSW] Client-side mocking enabled.');
  }
};

mswMocking();
