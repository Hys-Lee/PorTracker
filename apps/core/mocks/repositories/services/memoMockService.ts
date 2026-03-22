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
      importances,
      titles,
      evaluations,
      memoTypes,
      actualIds,
      targetIds,
      startDate,
      endDate,
      limit,
      offset,
    } = params || {};

    let memos = Array.from(mockRepositoryDB.memos.values());

    if (importances)
      memos = memos.filter((m) =>
        importances.includes(m.importance || 'normal')
      );
    if (titles) memos = memos.filter((m) => titles.includes(m.title || ''));
    if (evaluations)
      memos = memos.filter((m) => evaluations.includes(m.evaluation || 'soso'));
    if (memoTypes)
      memos = memos.filter((m) => memoTypes.includes(m.memoType || 'event'));
    if (actualIds)
      memos = memos.filter((m) => actualIds.includes(m.actualId || ''));
    if (targetIds)
      memos = memos.filter((m) => targetIds.includes(m.targetId || ''));
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
  patchMemo: async (publicId: string, body) => {
    const existing = mockRepositoryDB.memos.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );
    const patchingData: {
      actualId: undefined | string;
      targetId: undefined | string;
    } = {
      actualId: undefined,
      targetId: undefined,
    };
    if (body.actualId) {
      patchingData.actualId = body.actualId;
    } else {
      patchingData.targetId = body.targetId;
    }
    const patched: MemoResponse = {
      ...existing,
      ...patchingData,
    };
    return { id: publicId };
  },
  getRecentMemosByAssetId: async (assetId: string) => {
    // actual연결 중 해당 assetId가진 메모 가져오면 되겠군

    const actualIdsWithTargetAssetId = mockRepositoryDB.actualPortfolios
      .values()
      .filter((actual) => actual.assetId === assetId)
      .map((data) => data.id)
      .toArray();
    const memosLinkedActual = mockRepositoryDB.memos
      .values()
      .filter(
        (data) =>
          data.memoType === 'actual' &&
          actualIdsWithTargetAssetId.includes(data.actualId)
      )
      .toArray();

    return memosLinkedActual;
  },
};
