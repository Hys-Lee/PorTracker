/**
 * Credential Repository MSW Handler
 * credentialRepo.ts의 메서드들이 호출하는 /api/v1/credentials/* 엔드포인트를 모킹
 */
import { http, HttpResponse } from 'msw';
import { updateToken } from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const credentialRepoHandlers = [
  /** POST /api/v1/credentials/google - updateToken */
  http.post(`${API_BASE}/api/v1/credentials/google`, async ({ request }) => {
    const body = (await request.json()) as Record<string, string>;
    await updateToken(body);
    return new HttpResponse(null, { status: 200 });
  }),
];
