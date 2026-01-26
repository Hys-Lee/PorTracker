import { viewHandlers } from './portfolioHandler';
import { memoHandlers } from './memoHandler';
import { http, delay } from 'msw';
const allHandlers = [
  http.all('*', async () => {
    await delay(100);
  }),
  ...viewHandlers,
  ...memoHandlers,
];

export { allHandlers };
