/**
 * Asset Repository MSW Handler
 * assetRepo.ts의 메서드들이 호출하는 /api/v1/assets/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import type {
  AssetCreateRequest,
  AssetResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  getAssets,
  getAssetsBulk,
  addAsset,
  updateAsset,
  deleteAsset,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const assetRepoHandlers = [
  /** GET /api/v1/assets - getAssets */
  http.get(`${API_BASE}/api/v1/assets`, async () => {
    const assets = await getAssets();
    return HttpResponse.json(assets as AssetResponse[]);
  }),

  /** GET /api/v1/assets/bulk - getAssetsBulk */
  http.get(`${API_BASE}/api/v1/assets/bulk`, async ({ request }) => {
    const url = new URL(request.url);
    const publicIds = url.searchParams.getAll('publicIds');

    const assets = await getAssetsBulk(publicIds);

    return HttpResponse.json(assets as AssetResponse[]);
  }),

  /** POST /api/v1/assets - addAsset */
  http.post(`${API_BASE}/api/v1/assets`, async ({ request }) => {
    const body = (await request.json()) as AssetCreateRequest;
    const res = await addAsset(body);
    const { id: newId } = res || {};

    return HttpResponse.json({ id: newId } satisfies IdResponse);
  }),

  /** PUT /api/v1/assets/:publicId - updateAsset */
  http.put(
    `${API_BASE}/api/v1/assets/:publicId`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body = (await request.json()) as AssetCreateRequest;

      try {
        await updateAsset(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '자산을 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** DELETE /api/v1/assets/:publicId - deleteAsset */
  http.delete(`${API_BASE}/api/v1/assets/:publicId`, async ({ params }) => {
    const { publicId } = params as { publicId: string };

    try {
      await deleteAsset(publicId);
      return HttpResponse.json({ id: publicId } satisfies IdResponse);
    } catch (e) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '자산을 찾을 수 없습니다.',
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }
  }),
];
