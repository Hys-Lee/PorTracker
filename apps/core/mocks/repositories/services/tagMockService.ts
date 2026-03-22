/**
 * Tag Mock Service
 * tagRepo가 아직 없으므로, API 스키마 기반으로 직접 구현합니다.
 * tagRepo가 추가되면 타입 선언을 교체하세요:
 *   [key in keyof typeof tagRepository]: (typeof tagRepository)[key]
 */
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import type { TagResponse, IdResponse, TagCreateRequest } from '../types';
import { ApiError } from '@core/libs/errors/errors';

export const tagMockService = {
  getAllTags: async (): Promise<TagResponse[] | undefined> => {
    const tags = Array.from(mockRepositoryDB.tags.values());
    return tags;
  },

  getTag: async (id: string): Promise<TagResponse | undefined> => {
    const tag = mockRepositoryDB.tags.get(id);
    return tag;
  },

  getTagsBulk: async (ids: string[]): Promise<TagResponse[] | undefined> => {
    const tags = ids
      .map((id) => mockRepositoryDB.tags.get(id))
      .filter(Boolean);
    return tags.map((d) => ({ ...d }));
  },

  addTag: async (body: TagCreateRequest): Promise<IdResponse | undefined> => {
    const newId = faker.string.uuid();

    const newTag: TagResponse = {
      id: newId,
      content: body.content,
    };

    mockRepositoryDB.tags.set(newId, newTag);

    return { id: newId };
  },

  updateTag: async (
    id: string,
    body: TagCreateRequest
  ): Promise<IdResponse | undefined> => {
    const existing = mockRepositoryDB.tags.get(id);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: TagResponse = {
      ...existing,
      content: body.content,
    };

    mockRepositoryDB.tags.set(id, updated);

    return { id };
  },

  deleteTag: async (id: string): Promise<IdResponse | undefined> => {
    if (!mockRepositoryDB.tags.has(id))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.tags.delete(id);

    return { id };
  },
};
