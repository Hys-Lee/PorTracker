import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://0a252ff1e4e8c23bf83d2577a0ef0e8a@o4510917531140096.ingest.us.sentry.io/4511081723723776', // 센트리 대시보드 프로젝트 설정에서 확인 가능
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.5,
  sendDefaultPii: true,
  enableLogs: true,
});
