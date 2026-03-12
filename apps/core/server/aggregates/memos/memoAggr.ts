import {
  MemoForm,
  MemoFormCreateRequest,
  MemoFormCreateResponse,
  MemoFormDeleteResponse,
  MemoFormUpdateRequest,
  MemoFormUpdateResponse,
  MemoTile,
} from '@core/schemas/features/memos/memos.schema';
import { actualPortfolioRepository } from '@core/server/repositories/actualPortfolioRepo';
import { assetRepository } from '@core/server/repositories/assetRepo';
import { assetTypeRepository } from '@core/server/repositories/assetTypeRepo';
import { currencyRepository } from '@core/server/repositories/currencyRepo';
import { memoRepository } from '@core/server/repositories/memoRepo';
import { Response } from '@core/types/api';
import { aggregateErrorHandler } from '../utils/aggregateErrorHandler';

export const MemoAggregates = {
  getMemoFormById: async (memoId: string): Promise<Response<MemoForm>> => {
    try {
      const memo = await memoRepository.getMemo(memoId);

      let linkedPortfolioInfo = undefined;

      if (memo?.actualId) {
        const [currencies, assets, assetTypes, actual] = await Promise.all([
          currencyRepository.getCurrencies(),
          assetRepository.getAssets(),
          assetTypeRepository.getAssetTypes(),
          actualPortfolioRepository.getActualPortfolio(memo.actualId),
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
              currency: (targetCurrencies?.code as 'usd' | 'krw') || 'usd',
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
      const res = await memoRepository.addMemo({
        content: body.content,
        date: body.date.toISOString(),
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
      const res = await memoRepository.updateMemo(id, {
        content: body.content,
        date: body.date.toISOString(),
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
      const res = await memoRepository.deleteMemo(id);
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

  getMemos: async (): Promise<Response<MemoTile[]>> => {
    try {
      const memos = await memoRepository.getAllMemos();

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
};
