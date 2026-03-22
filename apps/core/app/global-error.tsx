'use client';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
export default function GlobalError({
  error,
  unstable_reset,
}: {
  error: Error & { digest?: string };
  unstable_reset: () => void;
}) {
  useEffect(() => {
    console.error('ERRROR in global-error: ', error);
    Sentry.captureException(error);
  }, [error]);
  return (
    <html>
      <body>
        <h1>예상치 못한 에러가 발생했습니다.</h1>
        <button onClick={() => unstable_reset()}>다시 시도</button>
      </body>
    </html>
  );
}
