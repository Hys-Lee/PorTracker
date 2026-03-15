/**
 * TargetPortfolio Repository MSW Handler
 * targetPortfolioRepo.ts의 메서드들이 호출하는 /api/v1/target-portfolios/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import type {
  TargetPortfolioCreateRequest,
  TargetPortfolioSnapshotUpdateRequest,
  TargetPortfolioResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  getTargetPortfolios,
  getTargetPortfolio,
  getTargetPortfoliosBulk,
  searchTargetPortfolio,
  addTargetPortfolio,
  updateTargetPortfolio,
  deleteTargetPortfolio,
  addSnapshot,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const targetPortfolioRepoHandlers = [
  /** GET /api/v1/target-portfolios - getTargetPortfolios */
  http.get(`${API_BASE}/api/v1/target-portfolios`, async () => {
    const portfolios = await getTargetPortfolios();
    return HttpResponse.json(portfolios as TargetPortfolioResponse[]);
  }),

  /** GET /api/v1/target-portfolios/search - searchTargetPortfolio */
  http.get(
    `${API_BASE}/api/v1/target-portfolios/search`,
    async ({ request }) => {
      const url = new URL(request.url);

      const name = url.searchParams.get('name') || undefined;
      const startDate = url.searchParams.get('startDate') || undefined;
      const endDate = url.searchParams.get('endDate') || undefined;
      const limit = url.searchParams.get('limit') || undefined;
      const offset = url.searchParams.get('offset') || undefined;

      const portfolios = await searchTargetPortfolio({
        name,
        startDate,
        endDate,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
      });

      return HttpResponse.json(portfolios as TargetPortfolioResponse[]);
    }
  ),

  /** GET /api/v1/target-portfolios/bulk - getTargetPortfoliosBulk */
  http.get(
    `${API_BASE}/api/v1/target-portfolios/bulk`,
    async ({ request }) => {
      const url = new URL(request.url);
      const publicIds = url.searchParams.getAll('publicIds');

      const portfolios = await getTargetPortfoliosBulk(publicIds);

      return HttpResponse.json(portfolios as TargetPortfolioResponse[]);
    }
  ),

  /** GET /api/v1/target-portfolios/:publicId - getTargetPortfolio */
  http.get(
    `${API_BASE}/api/v1/target-portfolios/:publicId`,
    async ({ params }) => {
      const { publicId } = params as { publicId: string };
      const portfolio = await getTargetPortfolio(publicId);

      if (!portfolio) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '목표 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }

      return HttpResponse.json(portfolio);
    }
  ),

  /** POST /api/v1/target-portfolios - addTargetPortfolio */
  http.post(
    `${API_BASE}/api/v1/target-portfolios`,
    async ({ request }) => {
      const body = (await request.json()) as TargetPortfolioCreateRequest;
      const res = await addTargetPortfolio(body);
      const { id: newId } = res || {};

      return HttpResponse.json({ id: newId } satisfies IdResponse);
    }
  ),

  /** PUT /api/v1/target-portfolios/:publicId - updateTargetPortfolio */
  http.put(
    `${API_BASE}/api/v1/target-portfolios/:publicId`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body = (await request.json()) as TargetPortfolioCreateRequest;

      try {
        await updateTargetPortfolio(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '목표 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** DELETE /api/v1/target-portfolios/:publicId - deleteTargetPortfolio */
  http.delete(
    `${API_BASE}/api/v1/target-portfolios/:publicId`,
    async ({ params }) => {
      const { publicId } = params as { publicId: string };

      try {
        await deleteTargetPortfolio(publicId);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '목표 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** POST /api/v1/target-portfolios/:publicId/snapshots - addSnapshot */
  http.post(
    `${API_BASE}/api/v1/target-portfolios/:publicId/snapshots`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body =
        (await request.json()) as TargetPortfolioSnapshotUpdateRequest;

      try {
        await addSnapshot(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '목표 포트폴리오를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),
];
