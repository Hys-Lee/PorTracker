import { http, HttpResponse } from 'msw';
import {
  getAllPortfolios,
  getMemoFormById,
  getMemos,
} from '../services/server/queries/memosQueries';
import { getMemoRecents } from '../services/client/queries/memosQueries';
import {
  deleteMemoFormParamsSchema,
  getMemoFormParamsSchema,
  MemoFormCreateRequest,
  MemoFormDeleteRequest,
  MemoFormUpdateRequest,
} from '@core/schemas/features/memos/memos.schema';
import {
  createMemoForm,
  deleteMemoForm,
  updateMemoForm,
} from '../services/server/actions/memosActions';

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
  http.get(`${API_BASE}/api/memos`, async ({ request }) => {
    const url = new URL(request.url);

    const startDate = url.searchParams.get('startDate') || undefined;
    const endDate = url.searchParams.get('endDate') || undefined;
    const memoType = url.searchParams.get('memoType') || undefined;
    const currency = url.searchParams.get('currency') || undefined;

    const validated = await getMemos({
      startDate,
      endDate,
      memoType,
      currency,
    });
    //test
    console.log('validated in mock api', validated);
    if (!validated.success) {
      if (validated.error.status === 404)
        return new HttpResponse(validated.error.details ?? 'Not Found', {
          status: validated.error.status,
        });

      return new HttpResponse('server invalid with db', { status: 500 });
    }
    return HttpResponse.json(validated.data);
  }),

  /** **POST**  */
  http.post(`${API_BASE}/api/memos`, async ({ request }) => {
    const body = await request.json();

    const validated = await createMemoForm(
      body as unknown as MemoFormCreateRequest
    );
    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),

  /** **PUT** */
  http.put(`${API_BASE}/api/memos/:memoId`, async ({ params, request }) => {
    const paramValidation = getMemoFormParamsSchema.safeParse(params);
    if (!paramValidation.success) {
      return new HttpResponse('memoId is invalid', { status: 400 });
    }
    const { memoId } = paramValidation.data;
    // params와 body에서의 것이 맞는지 확인해야하나?
    const body = (await request.json()) as unknown as MemoFormUpdateRequest;

    const validated = await updateMemoForm(body);
    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),
  /** **DELETE** */
  http.delete(`${API_BASE}/api/memos/:memoId`, async ({ params }) => {
    const paramValidation = deleteMemoFormParamsSchema.safeParse(params);
    if (!paramValidation.success) {
      return new HttpResponse('memoId is invalid', { status: 400 });
    }
    const { memoId } = paramValidation.data;

    const validated = await deleteMemoForm({
      id: memoId,
    } as unknown as MemoFormDeleteRequest);
    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),
];
