/**
 * ActualPortfolio Repository MSW Handler
 * actualPortfolioRepo.ts의 메서드들이 호출하는 /api/v1/actual-portfolios/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import type {
  ActualPortfolioCreateRequest,
  ActualPortfolioResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  addActualPortfolio,
  deleteActualPortfolio,
  getActualPortfolio,
  getActualPortfolios,
  getActualPortfoliosBulk,
  searchActualPortfolio,
  updateActualPortfolio,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const actualPortfolioRepoHandlers = [
  /** GET /api/v1/actual-portfolios - getActualPortfolios */
  http.get(`${API_BASE}/api/v1/actual-portfolios`, async () => {
    const portfolios = await getActualPortfolios();
    return HttpResponse.json(portfolios as ActualPortfolioResponse[]);
  }),

  /** GET /api/v1/actual-portfolios/search - searchActualPortfolio */
  http.get(
    `${API_BASE}/api/v1/actual-portfolios/search`,
    async ({ request }) => {
      const url = new URL(request.url);

      const assetId = url.searchParams.get('assetId') || undefined;
      const currencyId = url.searchParams.get('currencyId') || undefined;
      const transactionType =
        url.searchParams.get('transactionType') || undefined;
      const startDate = url.searchParams.get('startDate') || undefined;
      const endDate = url.searchParams.get('endDate') || undefined;
      const limit = url.searchParams.get('limit') || undefined;
      const offset = url.searchParams.get('offset') || undefined;

      const portfolios = await searchActualPortfolio({
        assetId,
        currencyId,
        endDate,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
        startDate,
        transactionType: transactionType as NonNullable<
          Parameters<typeof searchActualPortfolio>['0']
        >['transactionType'],
      });

      return HttpResponse.json(portfolios as ActualPortfolioResponse[]);
    }
  ),

  /** GET /api/v1/actual-portfolios/bulk - getActualPortfoliosBulk */
  http.get(`${API_BASE}/api/v1/actual-portfolios/bulk`, async ({ request }) => {
    const url = new URL(request.url);
    const publicIds = url.searchParams.getAll('publicIds');

    const portfolios = await getActualPortfoliosBulk(publicIds);

    return HttpResponse.json(portfolios as ActualPortfolioResponse[]);
  }),

  /** GET /api/v1/actual-portfolios/:publicId - getActualPortfolio */
  http.get(
    `${API_BASE}/api/v1/actual-portfolios/:publicId`,
    async ({ params }) => {
      const { publicId } = params as { publicId: string };
      const portfolio = await getActualPortfolio(publicId);
      if (!portfolio) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '실제 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }

      return HttpResponse.json(portfolio);
    }
  ),

  /** POST /api/v1/actual-portfolios - addActualPortfolio */
  http.post(`${API_BASE}/api/v1/actual-portfolios`, async ({ request }) => {
    const body = (await request.json()) as ActualPortfolioCreateRequest;
    const res = await addActualPortfolio(body);
    const { id: newId } = res || {};

    return HttpResponse.json({ id: newId } satisfies IdResponse);
  }),

  /** PUT /api/v1/actual-portfolios/:publicId - updateActualPortfolio */
  http.put(
    `${API_BASE}/api/v1/actual-portfolios/:publicId`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body = (await request.json()) as ActualPortfolioCreateRequest;

      try {
        await updateActualPortfolio(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '실제 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** DELETE /api/v1/actual-portfolios/:publicId - deleteActualPortfolio */
  http.delete(
    `${API_BASE}/api/v1/actual-portfolios/:publicId`,
    async ({ params }) => {
      const { publicId } = params as { publicId: string };

      try {
        await deleteActualPortfolio(publicId);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '실제 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),
];
