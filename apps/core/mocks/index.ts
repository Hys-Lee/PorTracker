let startPromise: Promise<void> | null = null;

export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (startPromise) return startPromise;

  startPromise = (async () => {
    // 서버환경
    if (typeof window === 'undefined') {
      const { server } = await import('./server');
      server.listen();
    } else {
      const { worker } = await import('./browser');
      worker.start();
    }
  })();
  return startPromise;
}
