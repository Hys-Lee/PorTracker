import { http, HttpResponse } from 'msw';

import {
  getActualPorfolioParamsSchema,
  getRelatedMemoParamsSchema,
  ActualFormCreateRequest,
  ActualFormUpdateRequest,
  deleteActualPortfolioParamsSchema,
  ActualFormDeleteRequest,
} from '../../schemas/features/portfolios/portfolios.schema';
import {
  getActualPortfolioById,
  getAllActualPortfolios,
  // getAssets,
  getRelatedMemoByMemoId,
  // getTransactionTypes,
  getActualPortfolioRecents,
} from '../services/queries/portfoliosQueries';
import {
  getAssets,
  getTransactionTypes,
} from '../services/queries/commonQueries';
import {
  createActualForm,
  deleteActualForm,
  updateActualForm,
} from '../services/actions/portfoliosActions';

const API_BASE = process.env.INTERNAL_API_URL || '';

export const viewHandlers = [
  /** **GET** */
  http.get(`${API_BASE}/api/transaction-types`, async () => {
    // const transactionTypes = Array.from(mockDB.transactionTypes.values());
    const validated = await getTransactionTypes();
    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),
  http.get(`${API_BASE}/api/assets`, async () => {
    // const assets = Array.from(mockDB.assets.values());
    // const validated = assetInfoListSchema.safeParse(assets);

    const validated = await getAssets();

    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),
  http.get(`${API_BASE}/api/portfolios/actuals`, async ({ request }) => {
    const url = new URL(request.url);

    const assets = url.searchParams.get('assets') || undefined;
    const startDate = url.searchParams.get('startDate') || undefined;
    const endDate = url.searchParams.get('endDate') || undefined;
    const transaction = url.searchParams.get('transaction') || undefined;
    const currency = url.searchParams.get('currency') || undefined;

    //test
    console.log('transaction in msw: ', transaction);

    // const actuals = Array.from(mockDB.actuals.values()).map((data) => ({
    //   accumulatedRatio: data.accumulatedRatio,
    //   assetName: data.assetName,
    //   assetType: data.assetType,
    //   changesRatio: data.changesRatio,
    //   createdAt: data.createdAt,
    //   currency: data.currency,
    //   date: data.date,
    //   id: data.id,
    //   transactionType: data.transactionType,
    //   value: data.amount * data.price * data.exchangeRate,
    //   assetDescription: data.assetDescription || undefined, // null -> undefined 변환.(bff역할이긴 함)
    // }));

    // const validated = actualPortfolioListSchema.safeParse(actuals);

    const validated = await getAllActualPortfolios({
      assets,
      startDate,
      endDate,
      transaction,
      currency,
    });

    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),

  http.get(
    `${API_BASE}/api/portfolios/actuals/:actualId`,
    async ({ params }) => {
      // const { actualId } = params;

      const paramValidation = getActualPorfolioParamsSchema.safeParse(params);
      if (!paramValidation.success) {
        return new HttpResponse('actualId is invalid', { status: 400 });
      }
      const { actualId } = paramValidation.data;
      // //test
      // console.log('actualId, keys', actualId, [...mockDB.actuals.keys()]);
      // const found = mockDB.actuals.get(actualId);
      // if (!found) {
      //   return HttpResponse.json(
      //     { message: 'Actual Not Found' },
      //     { status: 404 }
      //   );
      // }

      // const recents = Array.from(mockDB.actuals.values()).filter(
      //   (data) =>
      //     data.assetId === found?.assetId &&
      //     new Date(data.date).getTime() < new Date(found.date).getTime()
      // );

      // const validated = actualFormSchema.safeParse({
      //   amount: found.amount,
      //   assetInfo: {
      //     createdAt: found.createdAt,
      //     id: found.assetId,
      //     name: found.assetName,
      //     type: found.assetType,
      //     description: found.assetDescription || undefined,
      //   },
      //   currency: found.currency,
      //   date: found.date,
      //   exchangeRate: found.exchangeRate,
      //   id: found.id,
      //   price: found.price,
      //   transactionType: found.transactionType,
      //   relatedActuals: [],
      //   relatedMemoId: found.linkedMemo || undefined,
      //   recents: recents,
      // });

      const validated = await getActualPortfolioById(actualId);

      if (!validated.success) {
        if (validated.error.status === 404)
          return new HttpResponse(validated.error.details ?? 'Not Found', {
            status: 404,
          });

        return new HttpResponse('server invalid with db', { status: 500 });
      }
      return HttpResponse.json(validated.data);
    }
  ),
  http.get(
    `${API_BASE}/api/memos/related-memos/:memoId`,
    async ({ params }) => {
      const paramsValidation = getRelatedMemoParamsSchema.safeParse(params);

      if (!paramsValidation.success) {
        return new HttpResponse('memoId is invalid', { status: 400 });
      }

      const { memoId } = paramsValidation.data;

      const validated = await getRelatedMemoByMemoId(memoId);

      if (!validated.success) {
        if (validated.error.status === 404)
          return new HttpResponse(validated.error.details ?? 'Not Found', {
            status: validated.error.status,
          });

        return new HttpResponse('server invalid with db', { status: 500 });
      }
      return HttpResponse.json(validated.data);
    }
  ), // actual과 target둘다에 가능
  http.get(`${API_BASE}/api/portfolios/recents`, async () => {
    const validated = await getActualPortfolioRecents();
    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),

  /** **POST**  */
  http.post(`${API_BASE}/api/portfolios/actuals`, async ({ request }) => {
    const body = await request.json();

    const validated = await createActualForm(
      body as unknown as ActualFormCreateRequest
    );
    if (!validated.success)
      return new HttpResponse('server invalid with db', { status: 500 });
    return HttpResponse.json(validated.data);
  }),

  /** **PUT** */
  http.put(
    `${API_BASE}/api/portfolios/actuals/:actualId`,
    async ({ params, request }) => {
      const paramValidation = getActualPorfolioParamsSchema.safeParse(params);
      if (!paramValidation.success) {
        return new HttpResponse('actualId is invalid', { status: 400 });
      }
      const { actualId } = paramValidation.data;
      // params와 body에서의 것이 맞는지 확인해야하나?
      const body = (await request.json()) as unknown as ActualFormUpdateRequest;

      const validated = await updateActualForm(body);
      if (!validated.success)
        return new HttpResponse('server invalid with db', { status: 500 });
      return HttpResponse.json(validated.data);
    }
  ),
  /** **DELETE** */
  http.delete(
    `${API_BASE}/api/portfolios/actuals/:portfolioId`,
    async ({ params }) => {
      const paramValidation =
        deleteActualPortfolioParamsSchema.safeParse(params);
      if (!paramValidation.success) {
        return new HttpResponse('portfolioId is invalid', { status: 400 });
      }
      const { portfolioId } = paramValidation.data;

      const validated = await deleteActualForm({
        id: portfolioId,
      } as unknown as ActualFormDeleteRequest);
      if (!validated.success)
        return new HttpResponse('server invalid with db', { status: 500 });
      return HttpResponse.json(validated.data);
    }
  ),
];
