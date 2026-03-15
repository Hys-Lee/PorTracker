import { assetRepository } from '@core/server/repositories/assetRepo';
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import type { AssetResponse } from '../types';
import { ApiError } from '@core/libs/errors/errors';

export const assetMockService: {
  [key in keyof typeof assetRepository]: (typeof assetRepository)[key];
} = {
  getAssets: async () => {
    const assets = Array.from(mockRepositoryDB.assets.values());
    return assets;
  },

  getAssetsBulk: async (publicIds: string[]) => {
    const assets = publicIds
      .map((id) => mockRepositoryDB.assets.get(id))
      .filter(Boolean);
    return assets.map((d) => ({ ...d }));
  },

  addAsset: async (body) => {
    const newId = faker.string.uuid();

    const newAsset: AssetResponse = {
      id: newId,
      name: body.name,
      description: body.description,
      createdAt: new Date().toISOString(),
      currencyId: body.currencyId,
      typeId: body.typeId,
    };

    mockRepositoryDB.assets.set(newId, newAsset);

    return { id: newId };
  },

  updateAsset: async (publicId: string, body) => {
    const existing = mockRepositoryDB.assets.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: AssetResponse = {
      ...existing,
      name: body.name,
      description: body.description,
      currencyId: body.currencyId,
      typeId: body.typeId,
    };

    mockRepositoryDB.assets.set(publicId, updated);

    return { id: publicId };
  },

  deleteAsset: async (publicId: string) => {
    if (!mockRepositoryDB.assets.has(publicId))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.assets.delete(publicId);

    return { id: publicId };
  },
};
