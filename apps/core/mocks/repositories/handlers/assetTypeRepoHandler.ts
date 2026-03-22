/**
 * AssetType Repository MSW Handler
 * assetTypeRepo.ts의 메서드들이 호출하는 /api/v1/asset-types/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import type {
  AssetTypeRequest,
  AssetTypeResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  getAssetTypes,
  addAssetType,
  updateAssetType,
  deleteAssetType,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const assetTypeRepoHandlers = [
  /** GET /api/v1/asset-types - getAssetTypes */
  http.get(`${API_BASE}/api/v1/asset-types`, async () => {
    const assetTypes = await getAssetTypes();
    return HttpResponse.json(assetTypes as AssetTypeResponse[]);
  }),

  /** POST /api/v1/asset-types - addAssetType */
  http.post(`${API_BASE}/api/v1/asset-types`, async ({ request }) => {
    const body = (await request.json()) as AssetTypeRequest;
    const res = await addAssetType(body);
    const { id: newId } = res || {};

    return HttpResponse.json({ id: newId } satisfies IdResponse);
  }),

  /** PUT /api/v1/asset-types/:publicId - updateAssetType */
  http.put(
    `${API_BASE}/api/v1/asset-types/:publicId`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body = (await request.json()) as AssetTypeRequest;

      try {
        await updateAssetType(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '자산 유형을 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** DELETE /api/v1/asset-types/:publicId - deleteAssetType */
  http.delete(
    `${API_BASE}/api/v1/asset-types/:publicId`,
    async ({ params }) => {
      const { publicId } = params as { publicId: string };

      try {
        await deleteAssetType(publicId);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '자산 유형을 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),
];
