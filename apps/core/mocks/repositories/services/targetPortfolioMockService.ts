import { targetPortfolioRepository } from '@core/server/repositories/targetPortfolioRepo';
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import type { TargetPortfolioResponse } from '../types';
import { ApiError } from '@core/libs/errors/errors';

export const targetPortfolioMockService: {
  [key in keyof typeof targetPortfolioRepository]: (typeof targetPortfolioRepository)[key];
} = {
  getTargetPortfolios: async () => {
    const portfolios = Array.from(mockRepositoryDB.targetPortfolios.values());
    return portfolios;
  },

  getTargetPortfolio: async (publicId: string) => {
    const portfolio = mockRepositoryDB.targetPortfolios.get(publicId);
    return portfolio;
  },

  getTargetPortfoliosBulk: async (publicIds: string[]) => {
    const portfolios = publicIds
      .map((id) => mockRepositoryDB.targetPortfolios.get(id))
      .filter(Boolean);
    return portfolios.map((d) => ({ ...d }));
  },

  searchTargetPortfolio: async (params) => {
    const { names, startDate, endDate, limit, offset } = params || {};

    let portfolios = Array.from(mockRepositoryDB.targetPortfolios.values());

    if (names)
      portfolios = portfolios.filter((p) => names.includes(p.name || ''));
    if (startDate)
      portfolios = portfolios.filter(
        (p) => p.date && new Date(p.date) >= new Date(startDate)
      );
    if (endDate)
      portfolios = portfolios.filter(
        (p) => p.date && new Date(p.date) <= new Date(endDate)
      );

    const offsetNum = offset || 0;
    const limitNum = limit || portfolios.length;
    portfolios = portfolios.slice(offsetNum, offsetNum + limitNum);

    return portfolios.map((d) => ({ ...d }));
  },

  addTargetPortfolio: async (body) => {
    const newId = faker.string.uuid();

    const newPortfolio: TargetPortfolioResponse = {
      id: newId,
      name: body.name,
      date: body.date,
      createdAt: new Date().toISOString(),
      items: body.items.map((item) => ({
        assetId: item.assetId,
        currentRatioBp: item.currentRatioBp,
      })),
    };

    mockRepositoryDB.targetPortfolios.set(newId, newPortfolio);

    return { id: newId };
  },

  updateTargetPortfolio: async (publicId: string, body) => {
    const existing = mockRepositoryDB.targetPortfolios.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: TargetPortfolioResponse = {
      ...existing,
      name: body.name,
      date: body.date,
      items: body.items.map((item) => ({
        assetId: item.assetId,
        currentRatioBp: item.currentRatioBp,
      })),
    };

    mockRepositoryDB.targetPortfolios.set(publicId, updated);

    return { id: publicId };
  },

  deleteTargetPortfolio: async (publicId: string) => {
    if (!mockRepositoryDB.targetPortfolios.has(publicId))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.targetPortfolios.delete(publicId);

    return { id: publicId };
  },

  addSnapshot: async (publicId: string, body) => {
    const existing = mockRepositoryDB.targetPortfolios.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    if (body.items) {
      const updated: TargetPortfolioResponse = {
        ...existing,
        items: body.items.map((item) => ({
          assetId: item.assetId,
          currentRatioBp: item.currentRatioBp,
        })),
      };
      mockRepositoryDB.targetPortfolios.set(publicId, updated);
    }

    return { id: publicId };
  },
  addTargetPortfolioWithMemo: async (body) => {
    const newId = faker.string.uuid();

    const newPortfolio: TargetPortfolioResponse = {
      id: newId,
      name: body.name,
      date: body.date,
      createdAt: new Date().toISOString(),
      items: body.items.map((item) => ({
        assetId: item.assetId,
        currentRatioBp: item.currentRatioBp,
      })),
    };

    const memo = mockRepositoryDB.memos.get(body.memoId || '');
    mockRepositoryDB.memos.set(memo?.id || '', { ...memo, targetId: newId });

    mockRepositoryDB.targetPortfolios.set(newId, newPortfolio);

    return { id: newId };
  },
  updateTargetPortfolioWithMemo: async (publicId, body) => {
    const existing = mockRepositoryDB.targetPortfolios.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: TargetPortfolioResponse = {
      ...existing,
      name: body.name,
      date: body.date,
      items: body.items.map((item) => ({
        assetId: item.assetId,
        currentRatioBp: item.currentRatioBp,
      })),
    };
    const memo = mockRepositoryDB.memos.get(body.memoId || '');
    mockRepositoryDB.memos.set(memo?.id || '', { ...memo, targetId: publicId });

    mockRepositoryDB.targetPortfolios.set(publicId, updated);

    return { id: publicId };
  },
};
