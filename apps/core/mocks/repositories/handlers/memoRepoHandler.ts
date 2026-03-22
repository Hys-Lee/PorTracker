/**
 * Memo Repository MSW Handler
 * memoRepo.ts의 메서드들이 호출하는 /api/v1/memos/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import type {
  ActualPortfolioCreateRequest,
  MemoCreateRequest,
  MemoResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  getAllMemos,
  getMemo,
  getMemosBulk,
  searchMemo,
  addMemo,
  updateMemo,
  deleteMemo,
  getRecentMemosByAssetId,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const memoRepoHandlers = [
  /** GET /api/v1/memos - getAllMemos */
  http.get(`${API_BASE}/api/v1/memos`, async () => {
    const memos = await getAllMemos();
    return HttpResponse.json(memos as MemoResponse[]);
  }),

  /** GET /api/v1/memos/search - searchMemo */
  http.get(`${API_BASE}/api/v1/memos/search`, async ({ request }) => {
    const url = new URL(request.url);

    const importances =
      url.searchParams.get('importance')?.split(',') || undefined;
    const titles = url.searchParams.get('title')?.split(',') || undefined;
    const evaluations =
      url.searchParams.get('evaluation')?.split(',') || undefined;
    const memoTypes = url.searchParams.get('memoType')?.split(',') || undefined;
    const actualIds = url.searchParams.get('actualId')?.split(',') || undefined;
    const targetIds = url.searchParams.get('targetId')?.split(',') || undefined;
    const startDate = url.searchParams.get('startDate') || undefined;
    const endDate = url.searchParams.get('endDate') || undefined;
    const limit = url.searchParams.get('limit') || undefined;
    const offset = url.searchParams.get('offset') || undefined;

    const memos = await searchMemo({
      importances: importances as NonNullable<
        Parameters<typeof searchMemo>['0']
      >['importances'],
      titles,
      evaluations: evaluations as NonNullable<
        Parameters<typeof searchMemo>['0']
      >['evaluations'],
      memoTypes: memoTypes as NonNullable<
        Parameters<typeof searchMemo>['0']
      >['memoTypes'],
      actualIds,
      targetIds,
      startDate,
      endDate,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });

    return HttpResponse.json(memos as MemoResponse[]);
  }),

  /** GET /api/v1/memos/bulk - getMemosBulk */
  http.get(`${API_BASE}/api/v1/memos/bulk`, async ({ request }) => {
    const url = new URL(request.url);
    const publicIds = url.searchParams.getAll('publicIds');

    const memos = await getMemosBulk(publicIds);

    return HttpResponse.json(memos as MemoResponse[]);
  }),

  /** GET /api/v1/memos/:publicId - getMemo */
  http.get(`${API_BASE}/api/v1/memos/:publicId`, async ({ params }) => {
    const { publicId } = params as { publicId: string };
    const memo = await getMemo(publicId);

    if (!memo) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '메모를 찾을 수 없습니다.',
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }

    return HttpResponse.json(memo);
  }),
  http.get(
    `${API_BASE}/api/v1/memos/recent/asset/:assetPublicId`,
    async ({ params }) => {
      const { assetPublicId } = params as { assetPublicId: string };
      const recentMemos = await getRecentMemosByAssetId(assetPublicId, {
        limit: 5,
      });

      if (!recentMemos) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '메모를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }

      return HttpResponse.json(recentMemos);
    }
  ),

  /** POST /api/v1/memos - addMemo */
  http.post(`${API_BASE}/api/v1/memos`, async ({ request }) => {
    const body = (await request.json()) as MemoCreateRequest;
    const res = await addMemo(body);
    const { id: newId } = res || {};

    return HttpResponse.json({ id: newId } satisfies IdResponse);
  }),

  /** PUT /api/v1/memos/:publicId - updateMemo */
  http.put(
    `${API_BASE}/api/v1/memos/:publicId`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body = (await request.json()) as MemoCreateRequest;

      try {
        await updateMemo(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '메모를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** DELETE /api/v1/memos/:publicId - deleteMemo */
  http.delete(`${API_BASE}/api/v1/memos/:publicId`, async ({ params }) => {
    const { publicId } = params as { publicId: string };

    try {
      await deleteMemo(publicId);
      return HttpResponse.json({ id: publicId } satisfies IdResponse);
    } catch (e) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '메모를 찾을 수 없습니다.',
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }
  }),
];
