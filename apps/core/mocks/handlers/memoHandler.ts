import { http, HttpResponse } from 'msw';
import { getMemoRecents, getAllPortfolios } from '../services';

const API_BASE = process.env.INTERNAL_API_URL || '';

export const memoHandlers = [
  /** **GET** */
  http.get(`${API_BASE}/api/memos/recents`, async ({ request }) => {
    const url = new URL(request.url);

    const targetId = url.searchParams.get('targetId');
    const portfolioType = url.searchParams.get('portfolioType');

    const validated = await getMemoRecents(targetId, portfolioType);

    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),
  http.get(`${API_BASE}/api/portfolios`, async () => {
    const validated = await getAllPortfolios();

    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),
];
