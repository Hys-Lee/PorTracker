import { memoRepository } from '@core/server/repositories/memoRepo';
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import type { MemoResponse } from '../types';
import { ApiError } from '@core/libs/errors/errors';

export const memoMockService: {
  [key in keyof typeof memoRepository]: (typeof memoRepository)[key];
} = {
  getAllMemos: async () => {
    const memos = Array.from(mockRepositoryDB.memos.values());
    return memos;
  },

  getMemo: async (publicId: string) => {
    const memo = mockRepositoryDB.memos.get(publicId);
    return memo;
  },

  getMemosBulk: async (publicIds: string[]) => {
    const memos = publicIds
      .map((id) => mockRepositoryDB.memos.get(id))
      .filter(Boolean);
    return memos.map((d) => ({ ...d }));
  },

  searchMemo: async (params) => {
    const {
      importance,
      title,
      evaluation,
      memoType,
      actualId,
      targetId,
      startDate,
      endDate,
      limit,
      offset,
    } = params || {};

    let memos = Array.from(mockRepositoryDB.memos.values());

    if (importance) memos = memos.filter((m) => m.importance === importance);
    if (title)
      memos = memos.filter((m) =>
        m.title?.toLowerCase().includes(title.toLowerCase())
      );
    if (evaluation) memos = memos.filter((m) => m.evaluation === evaluation);
    if (memoType) memos = memos.filter((m) => m.memoType === memoType);
    if (actualId) memos = memos.filter((m) => m.actualId === actualId);
    if (targetId) memos = memos.filter((m) => m.targetId === targetId);
    if (startDate)
      memos = memos.filter(
        (m) => m.date && new Date(m.date) >= new Date(startDate)
      );
    if (endDate)
      memos = memos.filter(
        (m) => m.date && new Date(m.date) <= new Date(endDate)
      );

    const offsetNum = offset || 0;
    const limitNum = limit || memos.length;
    memos = memos.slice(offsetNum, offsetNum + limitNum);

    return memos.map((d) => ({ ...d }));
  },

  addMemo: async (body) => {
    const newId = faker.string.uuid();

    const newMemo: MemoResponse = {
      id: newId,
      createdAt: new Date().toISOString(),
      importance: body.importance,
      title: body.title,
      content: body.content,
      evaluation: body.evaluation,
      date: body.date,
      memoType: body.memoType,
      actualId: body.actualId,
      targetId: body.targetId,
      tags: body.tags,
    };

    mockRepositoryDB.memos.set(newId, newMemo);

    return { id: newId };
  },

  updateMemo: async (publicId: string, body) => {
    const existing = mockRepositoryDB.memos.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: MemoResponse = {
      ...existing,
      importance: body.importance,
      title: body.title,
      content: body.content,
      evaluation: body.evaluation,
      date: body.date,
      memoType: body.memoType,
      actualId: body.actualId,
      targetId: body.targetId,
      tags: body.tags,
    };

    mockRepositoryDB.memos.set(publicId, updated);

    return { id: publicId };
  },

  deleteMemo: async (publicId: string) => {
    if (!mockRepositoryDB.memos.has(publicId))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.memos.delete(publicId);

    return { id: publicId };
  },
};
