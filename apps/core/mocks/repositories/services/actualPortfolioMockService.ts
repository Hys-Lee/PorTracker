import { actualPortfolioRepository } from '@core/server/repositories/actualPortfolioRepo';
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import { ActualPortfolioResponse } from '../types';
import { ApiError } from '@core/libs/errors/errors';
export const actualPortfolioMockService: {
  [key in keyof typeof actualPortfolioRepository]: (typeof actualPortfolioRepository)[key];
} = {
  getActualPortfolios: async () => {
    const portfolios = Array.from(mockRepositoryDB.actualPortfolios.values());
    return portfolios;
  },
  addActualPortfolio: async (body) => {
    const newId = faker.string.uuid();
    const newPortfolio: ActualPortfolioResponse = {
      id: newId,
      assetId: body.assetId,
      date: body.date,
      createdAt: new Date().toISOString(),
      transactionType: body.transactionType,
      currencyId: body.currencyId,
      priceBp: body.priceBp,
      amountBp: body.amountBp,
      exchangeRateBp: body.exchangeRateBp,
    };

    mockRepositoryDB.actualPortfolios.set(newId, newPortfolio);

    return { id: newId };
  },
  deleteActualPortfolio: async (portfolioId: string) => {
    if (!mockRepositoryDB.actualPortfolios.has(portfolioId))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.actualPortfolios.delete(portfolioId);
    return { id: portfolioId };
  },
  getActualPortfolio: async (publicId: string) => {
    const portfolio = mockRepositoryDB.actualPortfolios.get(publicId);
    return portfolio;
  },
  getActualPortfoliosBulk: async (publicIds: string[]) => {
    const portfolios = publicIds
      .map((id) => mockRepositoryDB.actualPortfolios.get(id))
      .filter(Boolean);
    return portfolios.map((data) => ({ ...data }));
  },
  searchActualPortfolio: async (params) => {
    const {
      assetIds,
      currencyIds,
      endDate,
      limit,
      offset,
      startDate,
      transactionTypes,
    } = params || {};
    let portfolios = Array.from(mockRepositoryDB.actualPortfolios.values());
    if (assetIds)
      portfolios = portfolios.filter((p) => assetIds.includes(p.assetId || ''));
    if (currencyIds)
      portfolios = portfolios.filter((p) =>
        currencyIds.includes(p.currencyId || '')
      );
    if (transactionTypes)
      portfolios = portfolios.filter((p) =>
        transactionTypes.includes(p.transactionType || 'allocation')
      );
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
    return portfolios.map((d) => ({}));
  },
  updateActualPortfolio: async (portfolioId, body) => {
    const existing = mockRepositoryDB.actualPortfolios.get(portfolioId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: ActualPortfolioResponse = {
      ...existing,
      assetId: body.assetId,
      date: body.date,
      transactionType: body.transactionType,
      currencyId: body.currencyId,
      priceBp: body.priceBp,
      amountBp: body.amountBp,
      exchangeRateBp: body.exchangeRateBp,
    };

    mockRepositoryDB.actualPortfolios.set(portfolioId, updated);

    return { id: portfolioId };
  },
};
