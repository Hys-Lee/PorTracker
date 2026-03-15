/**
 * Currency Repository MSW Handler
 * currencyRepo.ts의 메서드들이 호출하는 /api/v1/currencies/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import type {
  CurrencyTypeRequest,
  CurrencyTypeResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  getCurrencies,
  addCurrency,
  updateCurrency,
  deleteCurrency,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const currencyRepoHandlers = [
  /** GET /api/v1/currencies - getCurrencies */
  http.get(`${API_BASE}/api/v1/currencies`, async () => {
    const currencies = await getCurrencies();
    return HttpResponse.json(currencies as CurrencyTypeResponse[]);
  }),

  /** POST /api/v1/currencies - addCurrency */
  http.post(`${API_BASE}/api/v1/currencies`, async ({ request }) => {
    const body = (await request.json()) as CurrencyTypeRequest;
    const res = await addCurrency(body);
    const { id: newId } = res || {};

    return HttpResponse.json({ id: newId } satisfies IdResponse);
  }),

  /** PUT /api/v1/currencies/:publicId - updateCurrency */
  http.put(
    `${API_BASE}/api/v1/currencies/:publicId`,
    async ({ params, request }) => {
      const { publicId } = params as { publicId: string };
      const body = (await request.json()) as CurrencyTypeRequest;

      try {
        await updateCurrency(publicId, body);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '통화를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),

  /** DELETE /api/v1/currencies/:publicId - deleteCurrency */
  http.delete(
    `${API_BASE}/api/v1/currencies/:publicId`,
    async ({ params }) => {
      const { publicId } = params as { publicId: string };

      try {
        await deleteCurrency(publicId);
        return HttpResponse.json({ id: publicId } satisfies IdResponse);
      } catch (e) {
        return HttpResponse.json(
          {
            status: 404,
            code: 'NOT_FOUND',
            message: '통화를 찾을 수 없습니다.',
          } satisfies ErrorResponse,
          { status: 404 }
        );
      }
    }
  ),
];
