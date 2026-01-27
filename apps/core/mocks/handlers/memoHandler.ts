import { http, HttpResponse } from 'msw';
import { getMemoRecents, getAllPortfolios, getMemoFormById } from '../services';
import { getMemoFormParamsSchema } from '@core/schemas/features/memos/memos.schema';

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
  http.get(`${API_BASE}/api/memos/:memoId`, async ({ params }) => {
    const paramValidation = getMemoFormParamsSchema.safeParse(params);
    if (!paramValidation.success) {
      return new HttpResponse('actualId is invalid', { status: 400 });
    }
    const { memoId } = paramValidation.data;

    const validated = await getMemoFormById(memoId);

    if (!validated.success) {
      if (validated.error.status === 404)
        return new HttpResponse(validated.error.details ?? 'Not Found', {
          status: validated.error.status,
        });

      return new HttpResponse('server invalid with db', { status: 500 });
    }
    return HttpResponse.json(validated.data);
  }),
];
