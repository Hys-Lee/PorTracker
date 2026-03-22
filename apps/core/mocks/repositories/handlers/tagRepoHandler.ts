/**
 * Tag Repository MSW Handler
 * /api/v1/tags/* 엔드포인트를 모킹
 * (tagRepo가 추가되면 그에 맞춰 사용됩니다)
 */
import { http, HttpResponse } from 'msw';
import type {
  TagCreateRequest,
  TagResponse,
  IdResponse,
  ErrorResponse,
} from '../types';
import {
  getAllTags,
  getTag,
  getTagsBulk,
  addTag,
  updateTag,
  deleteTag,
} from '../services';

const API_BASE = process.env.INTERNAL_API_URL || 'http://localhost:4200';

export const tagRepoHandlers = [
  /** GET /api/v1/tags - getAllTags */
  http.get(`${API_BASE}/api/v1/tags`, async () => {
    const tags = await getAllTags();
    return HttpResponse.json(tags as TagResponse[]);
  }),

  /** GET /api/v1/tags/bulk - getTagsBulk */
  http.get(`${API_BASE}/api/v1/tags/bulk`, async ({ request }) => {
    const url = new URL(request.url);
    const ids = url.searchParams.getAll('ids');

    const tags = await getTagsBulk(ids);

    return HttpResponse.json(tags as TagResponse[]);
  }),

  /** GET /api/v1/tags/:id - getTag */
  http.get(`${API_BASE}/api/v1/tags/:id`, async ({ params }) => {
    const { id } = params as { id: string };
    const tag = await getTag(id);

    if (!tag) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '태그를 찾을 수 없습니다.',
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }

    return HttpResponse.json(tag);
  }),

  /** POST /api/v1/tags - addTag */
  http.post(`${API_BASE}/api/v1/tags`, async ({ request }) => {
    const body = (await request.json()) as TagCreateRequest;
    const res = await addTag(body);
    const { id: newId } = res || {};

    return HttpResponse.json({ id: newId } satisfies IdResponse);
  }),

  /** PUT /api/v1/tags/:id - updateTag */
  http.put(`${API_BASE}/api/v1/tags/:id`, async ({ params, request }) => {
    const { id } = params as { id: string };
    const body = (await request.json()) as TagCreateRequest;

    try {
      await updateTag(id, body);
      return HttpResponse.json({ id } satisfies IdResponse);
    } catch (e) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '태그를 찾을 수 없습니다.',
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }
  }),

  /** DELETE /api/v1/tags/:id - deleteTag */
  http.delete(`${API_BASE}/api/v1/tags/:id`, async ({ params }) => {
    const { id } = params as { id: string };

    try {
      await deleteTag(id);
      return HttpResponse.json({ id } satisfies IdResponse);
    } catch (e) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '태그를 찾을 수 없습니다.',
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }
  }),
];
