import { currencyRepository } from '@core/server/repositories/currencyRepo';
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import type { CurrencyTypeResponse } from '../types';
import { ApiError } from '@core/libs/errors/errors';

export const currencyMockService: {
  [key in keyof typeof currencyRepository]: (typeof currencyRepository)[key];
} = {
  getCurrencies: async () => {
    const currencies = Array.from(mockRepositoryDB.currencies.values());
    return currencies;
  },

  addCurrency: async (body) => {
    const newId = faker.string.uuid();

    const newCurrency: CurrencyTypeResponse = {
      id: newId,
      code: body.code,
    };

    mockRepositoryDB.currencies.set(newId, newCurrency);

    return { id: newId };
  },

  updateCurrency: async (publicId: string, body) => {
    const existing = mockRepositoryDB.currencies.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: CurrencyTypeResponse = {
      ...existing,
      code: body.code,
    };

    mockRepositoryDB.currencies.set(publicId, updated);

    return { id: publicId };
  },

  deleteCurrency: async (publicId: string) => {
    if (!mockRepositoryDB.currencies.has(publicId))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.currencies.delete(publicId);

    return { id: publicId };
  },
};
