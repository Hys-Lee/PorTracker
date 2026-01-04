import { http, HttpResponse } from 'msw';
import { z } from 'zod';
import { mockDB } from './db';
import {
  assetInfoSchema,
  actualPortfolioSchema,
  AssetInfo,
  ActualPortfolio,
  ActualForm,
  RelatedMemo,
  getActualPorfolioParamsSchema,
  getRelatedMemoParamsSchema,
  actualFormSchema,
  relatedMemoSchema,
  assetInfoListSchema,
  actualPortfolioListSchema,
  actualRecentListSchema,
} from '../../../schemas/portfolios.schema';

const API_BASE = process.env.INTERNAL_API_URL;

export const viewHandlers = [
  http.get(`${API_BASE}/api/transaction-types`, () => {
    const transactionTypes = Array.from(mockDB.transactionTypes.values());
    // 체크는 귀찮으니까 패스
    return HttpResponse.json(transactionTypes);
  }),
  http.get(`${API_BASE}/api/assets`, () => {
    // 핸들러들 내용
    // 목 db사용하고
    try {
      const assets = Array.from(mockDB.assets.values()).map((data) => ({
        ...data,
        // createdAt: new Date(data.createdAt),
      }));
      // const validated = assets.map((data) => assetInfoSchema.safeParse(data));
      const validated = assetInfoListSchema.safeParse(assets);

      if (!validated.success)
        return new HttpResponse('server invalid with db', { status: 500 });
      return HttpResponse.json(validated.data);
      //
      // zod사용한 validation 체크는 fetcher에 심어두기
    } catch (e) {
      console.error('Mock Data Validation Failed for GET /api/assets', e);
      return new HttpResponse('Mock Data is invalid', { status: 500 });
    }
  }),
  http.get(`${API_BASE}/api/portfolios/actuals`, () => {
    try {
      const actuals = Array.from(mockDB.actuals.values()).map((data) => ({
        accumulatedRatio: data.accumulatedRatio,
        assetName: data.assetName,
        assetType: data.assetType,
        changesRatio: data.changesRatio,
        createdAt: data.createdAt,
        currency: data.currency,
        date: data.date,
        id: data.id,
        transactionType: data.transactionType,
        value: data.amount * data.price * data.exchangeRate,
        assetDescription: data.assetDescription || undefined, // null -> undefined 변환.(bff역할이긴 함)
      }));
      // const validated: ActualPortfolio[] = actuals.map((data) =>
      //   actualPortfolioSchema.parse(data)
      // );
      const validated = actualPortfolioListSchema.safeParse(actuals);
      if (!validated.success)
        return new HttpResponse('server invalid with db', { status: 500 });
      return HttpResponse.json(validated.data);
    } catch (e) {
      console.error(
        'Mock Data Validation Failed for GET /api/portfolios/actuals',
        e
      );
      return new HttpResponse('Mock Data is invalid', { status: 500 });
    }
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
      //test
      console.log('actualId, keys', actualId, [...mockDB.actuals.keys()]);
      const found = mockDB.actuals.get(actualId);
      if (!found) {
        return HttpResponse.json(
          { message: 'Actual Not Found' },
          { status: 404 }
        );
      }

      const recents = Array.from(mockDB.actuals.values()).filter(
        (data) =>
          data.assetId === found?.assetId &&
          new Date(data.date).getTime() < new Date(found.date).getTime()
      );

      const validated = actualFormSchema.safeParse({
        amount: found.amount,
        assetInfo: {
          createdAt: found.createdAt,
          id: found.assetId,
          name: found.assetName,
          type: found.assetType,
          description: found.assetDescription || undefined,
        },
        currency: found.currency,
        date: found.date,
        exchangeRate: found.exchangeRate,
        id: found.id,
        price: found.price,
        transactionType: found.transactionType,
        relatedActuals: [],
        relatedMemoId: found.linkedMemo || undefined,
        recents: recents,
      });
      if (!validated.success)
        return new HttpResponse('server invalid with db', { status: 500 });
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

      const found = mockDB.memos.get(memoId);
      if (!found) {
        return HttpResponse.json(
          { message: 'Memo Not Found' },
          { status: 404 }
        );
      }
      const validated = relatedMemoSchema.safeParse({
        content: found.content,
        evaluation: found.evaluation,
        id: found.id,
        importance: found.importance,
        tags: found.tags,
        title: found.title,
      });
      if (!validated.success)
        return new HttpResponse('server invalid with db', { status: 500 });
      return HttpResponse.json(validated.data);
    }
  ), // actual과 target둘다에 가능
];
