import { assetTypeRepository } from '@core/server/repositories/assetTypeRepo';
import { mockRepositoryDB } from '../mockData';
import { faker } from '@faker-js/faker';
import type { AssetTypeResponse, AssetTypeRequest } from '../types';
import { ApiError } from '@core/libs/errors/errors';

// assetTypeRepo의 addAssetType body 타입이 잘못된 경로('/api/v1/asset-types/{publicId}')를 참조해
// BodyTypeOf가 never를 반환하므로, 해당 메서드만 타입을 명시적으로 선언합니다.
type AssetTypeServiceType = Omit<typeof assetTypeRepository, 'addAssetType'> & {
  addAssetType: (body: AssetTypeRequest) => Promise<{ id?: string } | undefined>;
};

export const assetTypeMockService: AssetTypeServiceType = {
  getAssetTypes: async () => {
    const assetTypes = Array.from(mockRepositoryDB.assetTypes.values());
    return assetTypes;
  },

  addAssetType: async (body: AssetTypeRequest) => {
    const newId = faker.string.uuid();

    const newAssetType: AssetTypeResponse = {
      id: newId,
      name: body.name,
      createdAt: new Date().toISOString(),
    };

    mockRepositoryDB.assetTypes.set(newId, newAssetType);

    return { id: newId };
  },

  updateAssetType: async (publicId: string, body) => {
    const existing = mockRepositoryDB.assetTypes.get(publicId);
    if (!existing)
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    const updated: AssetTypeResponse = {
      ...existing,
      name: body.name,
    };

    mockRepositoryDB.assetTypes.set(publicId, updated);

    return { id: publicId };
  },

  deleteAssetType: async (publicId: string) => {
    if (!mockRepositoryDB.assetTypes.has(publicId))
      throw new ApiError(
        '[모킹 서비스]: 대상 데이터가 존재하지 않습니다',
        'M000',
        404
      );

    mockRepositoryDB.assetTypes.delete(publicId);

    return { id: publicId };
  },
};
