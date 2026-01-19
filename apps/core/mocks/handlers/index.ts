import { viewHandlers } from './portfolioHandler';
import { http, delay } from 'msw';
const allHandlers = [
  http.all('*', async () => {
    await delay(100);
  }),
  ...viewHandlers,
];

export { allHandlers };
