import {
  MemoForm,
  MemoFormCreateRequest,
  MemoFormCreateResponse,
  MemoFormDeleteResponse,
  MemoFormPatchLinksRequest,
  MemoFormUpdateRequest,
  MemoFormUpdateResponse,
  MemoRecent,
  MemoSearchParams,
  MemoTile,
} from '@core/schemas/features/memos/memos.schema';
// import { } from '@core/server/repositories/actualPortfolioRepo';
// import { } from '@core/server/repositories/assetRepo';
// import { } from '@core/server/repositories/assetTypeRepo';
// import { } from '@core/server/repositories/currencyRepo';
// import { } from '@core/server/repositories/memoRepo';
import {
  getMemo,
  getCurrencies,
  getAssets,
  getAssetTypes,
  getActualPortfolio,
  addMemo,
  updateMemo,
  deleteMemo,
  searchMemo,
  getRecentMemosByAssetId,
  patchMemo,
} from '@core/server/repositories';
import { Response } from '@core/types/api';
import { aggregateErrorHandler } from '../utils/aggregateErrorHandler';
import { CurrencyValue, MemoTypeValue } from '@core/types';
import { UnknownError } from '@core/libs/errors/errors';

export const memoAggregates = {
  getMemoFormById: async (memoId: string): Promise<Response<MemoForm>> => {
    try {
      const memo = await getMemo(memoId);

      let linkedPortfolioInfo = undefined;

      if (memo?.actualId) {
        const [currencies, assets, assetTypes, actual] = await Promise.all([
          getCurrencies(),
          getAssets(),
          getAssetTypes(),
          getActualPortfolio(memo.actualId),
        ]);

        const targetAsset = actual
          ? assets?.find((asset) => asset.id === actual.assetId)
          : undefined;
        const targetAssetType = actual
          ? assetTypes?.find(
              (assetType) => assetType.id === targetAsset?.typeId
            )
          : undefined;
        const targetCurrencies = actual
          ? currencies?.find((currency) => currency.id === actual.currencyId)
          : undefined;

        linkedPortfolioInfo = actual
          ? {
              accumulatedRatio: 0, // 임시
              accumulatedValue: 0, // 임시
              amount: (actual.amountBp || 0) / 10000,
              assetDescription: targetAsset?.description,
              assetId: targetAsset?.id || '',
              assetName: targetAsset?.name || '',
              assetType: targetAssetType?.name || '',
              changesRatio: 0, // 임시
              createdAt: new Date(actual.createdAt || ''),
              currency: (targetCurrencies?.code as CurrencyValue) || 'USD',
              date: new Date(actual.date || ''),
              exchangeRate: (actual.exchangeRateBp || 1) / 10000,
              id: actual.id || '',
              price: (actual.priceBp || 0) / 10000,
              transactionType: actual.transactionType || 'allocation',
              value:
                ((actual.amountBp || 0) *
                  (actual.exchangeRateBp || 1) *
                  (actual.priceBp || 0)) /
                10000 /
                10000 /
                10000,
            }
          : undefined;
      }

      return {
        data: {
          content: memo?.content || '',
          date: new Date(memo?.date || ''),
          evaluation: memo?.evaluation || 'soso',
          id: memo?.id || '',
          importance: memo?.importance || 'normal',
          memoType: memo?.memoType || 'actual',
          tags: memo?.tags || [],
          title: memo?.title || '',
          linkedPortfolioInfo,
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  addMemoForm: async (
    body: MemoFormCreateRequest
  ): Promise<Response<MemoFormCreateResponse>> => {
    try {
      const res = await addMemo({
        content: body.content,
        // date: body.date.toISOString(),
        date: body.date,
        evaluation: body.evaluation,
        importance: body.importance,
        memoType: body.linkedPortfolioType || 'event',
        title: body.title,
        actualId:
          body.linkedPortfolioType === 'actual'
            ? body.linkedPortfolioId
            : undefined,
        targetId:
          body.linkedPortfolioType === 'target'
            ? body.linkedPortfolioId
            : undefined,
        tags: body.tags,
      });
      return {
        data: {
          ...body,
          memoType: body.linkedPortfolioType || 'event',
          date: new Date(body.date),
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  updateMemoForm: async (
    id: string,
    body: MemoFormUpdateRequest
  ): Promise<Response<MemoFormUpdateResponse>> => {
    try {
      const res = await updateMemo(id, {
        content: body.content,
        // date: body.date.toISOString(),
        date: body.date,
        evaluation: body.evaluation,
        importance: body.importance,
        memoType: body.linkedPortfolioType || 'event',
        title: body.title,
        actualId:
          body.linkedPortfolioType === 'actual'
            ? body.linkedPortfolioId
            : undefined,
        targetId:
          body.linkedPortfolioType === 'target'
            ? body.linkedPortfolioId
            : undefined,
        tags: body.tags,
      });
      return {
        data: {
          ...body,
          memoType: body.linkedPortfolioType || 'event',
          date: new Date(body.date),
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  deleteMemoForm: async (
    id: string
  ): Promise<Response<MemoFormDeleteResponse>> => {
    try {
      const res = await deleteMemo(id);
      return {
        data: {
          id: res?.id || '',
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  getMemos: async (params: MemoSearchParams): Promise<Response<MemoTile[]>> => {
    try {
      // const memos = await getAllMemos();
      const memos = await searchMemo({ ...params });
      return {
        data:
          memos?.map((memo) => ({
            content: memo.content || '',
            date: new Date(memo.date || ''),
            id: memo.id || '',
            importance: memo.importance || 'normal',
            memoType: memo.memoType || 'event',
            title: memo.title || '',
            tags: memo.tags || [],
          })) || [],
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },
  getRecentMemosByParams: async (params: {
    memoType: MemoTypeValue;
    assetId?: string;
    targetPortfolioId?: string;
  }): Promise<Response<MemoRecent[]>> => {
    try {
      switch (params.memoType) {
        case 'actual':
          const recentActualMemos = await getRecentMemosByAssetId(
            params.assetId || '',
            {
              limit: 5,
            }
          );
          return {
            data:
              recentActualMemos?.map((data) => ({
                content: data.content || '',
                date: new Date(data.date || ''),
                evaluation: data.evaluation || 'soso',
                id: data.id || '',
                importance: data.importance || 'normal',
                memoType: data.memoType || 'event',
                tags: data.tags || [],
                title: data.title || '',
              })) || [],
            error: null,
            success: true,
          };
        case 'target': {
          const recentTargetMemos = await searchMemo({
            targetIds: [params.targetPortfolioId || ''],
            memoTypes: ['target'],
          });

          return {
            data:
              recentTargetMemos?.map((data) => ({
                content: data.content || '',
                date: new Date(data.date || ''),
                evaluation: data.evaluation || 'soso',
                id: data.id || '',
                importance: data.importance || 'normal',
                memoType: data.memoType || 'event',
                tags: data.tags || [],
                title: data.title || '',
              })) || [],
            error: null,
            success: true,
          };
        }
        case 'event': {
          const recentEventMemos = await searchMemo({
            memoTypes: ['event'],
            limit: 5,
          });
          return {
            data:
              recentEventMemos?.map((data) => ({
                content: data.content || '',
                date: new Date(data.date || ''),
                evaluation: data.evaluation || 'soso',
                id: data.id || '',
                importance: data.importance || 'normal',
                memoType: data.memoType || 'event',
                tags: data.tags || [],
                title: data.title || '',
              })) || [],
            error: null,
            success: true,
          };
        }
        default: {
          throw new UnknownError('unknown memoType in aggr');
        }
      }
      // await getRecentMemosByAssetId(params.assetId, { limit: 5 });
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },
};
