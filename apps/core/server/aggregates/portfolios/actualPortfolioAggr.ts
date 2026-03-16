import { getUserId } from '@core/libs/api/server-fetcher';
import { ApiError } from '@core/libs/errors/errors';
import {
  ActualForm,
  ActualFormCreateRequest,
  ActualFormCreateResponse,
  ActualFormDeleteResponse,
  ActualFormUpdateRequest,
  ActualFormUpdateResponse,
  ActualPortfolio,
  ActualPortfolioSearchParams,
} from '@core/schemas/features/portfolios/portfolios.schema';
// import { } from '@core/server/repositories/actualPortfolioRepo';
// import { getActualPortfolio } from '@core/server/repositories';
// import { } from '@core/server/repositories/assetRepo';
// import { } from '@core/server/repositories/assetTypeRepo';
// import { } from '@core/server/repositories/currencyRepo';
import { fetchTagKeyFactory } from '@core/server/repositories/utils/fetchTagKeyFactory';
import { Response } from '@core/types/api';
import { aggregateErrorHandler } from '../utils/aggregateErrorHandler';
import { CurrencyValue } from '@core/types';
// import { } from '@core/server/repositories/memoRepo';
import {
  getActualPortfolio,
  getCurrencies,
  getAssets,
  getAssetTypes,
  searchActualPortfolio,
  getUnlinkedActualPortfolios,
  deleteActualPortfolio,
  updateActualPortfolio,
  addActualPortfolio,
  searchMemo,
} from '@core/server/repositories';

export const actualPortfolioAggregates = {
  getActualPortfolioFormById: async (
    portfolioId: string
  ): Promise<Response<ActualForm>> => {
    try {
      // const actual = await ;
      const [currencies, assets, assetTypes, actual] = await Promise.all([
        getCurrencies(),
        getAssets(),
        getAssetTypes(),
        getActualPortfolio(portfolioId),
      ]);

      const targetAsset = assets?.find((asset) => asset.id === actual?.assetId);
      const targetAssetType = assetTypes?.find(
        (assetType) => assetType.id === targetAsset?.typeId
      );
      const targetCurrencies = currencies?.find(
        (currency) => currency.id === actual?.currencyId
      );

      // recents 찾기 + 연결된 메모 찾기 => 워터폴
      const [recents, relatedMemo] = await Promise.all([
        searchActualPortfolio({
          assetIds: targetAsset?.id ? [targetAsset?.id] : undefined,
          endDate: actual?.date,
          limit: 5,
        }),
        searchMemo({
          actualIds: actual?.id ? [actual.id] : undefined,
          limit: 1,
        }),
      ]);

      return {
        data: {
          amount: (actual?.amountBp || 0) / 10000,
          assetInfo: {
            createdAt: new Date(targetAsset?.createdAt || ''),
            id: targetAsset?.id || '',
            name: targetAsset?.name || '',
            type: targetAssetType?.name || '',
            description: targetAsset?.description,
          },
          currency: (targetCurrencies?.code as CurrencyValue) || 'usd',
          date: new Date(actual?.date || ''),
          exchangeRate: (actual?.exchangeRateBp || 1) / 10000,
          id: actual?.id || '',
          price: (actual?.priceBp || 0) / 10000,
          relatedActuals:
            recents?.map((actual) => ({
              amount: (actual.amountBp || 0) / 10000,
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
            })) || [],
          transactionType: actual?.transactionType || 'allocation',
          relatedMemoId: relatedMemo?.[0].id || '',
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  addActualPortfolioForm: async (
    body: ActualFormCreateRequest
  ): Promise<Response<ActualFormCreateResponse>> => {
    try {
      // 임시. be에서 currency id내려주고, fe에서도 이를 사용하도록(기존 enum 뜯어내고) 해야 함.
      const currencies = await getCurrencies();
      const currencyId =
        currencies?.find((data) => data.code === body.currency)?.id || '';

      const res = await addActualPortfolio({
        amountBp: body.amount * 10000,
        assetId: body.assetId,
        currencyId: currencyId,
        date: body.date.toISOString(),
        exchangeRateBp: body.exchangeRate * 10000,
        priceBp: body.price * 10000,
        transactionType: body.transactionType,
      });
      return {
        data: {
          ...body,
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  updateActualPortfolioForm: async (
    id: string,
    body: ActualFormUpdateRequest
  ): Promise<Response<ActualFormUpdateResponse>> => {
    try {
      // 임시. be에서 currency id내려주고, fe에서도 이를 사용하도록(기존 enum 뜯어내고) 해야 함.
      const currencies = await getCurrencies();
      const currencyId =
        currencies?.find((data) => data.code === body.currency)?.id || '';

      const res = await updateActualPortfolio(id, {
        amountBp: body.amount * 10000,
        assetId: body.assetId,
        currencyId: currencyId,
        date: body.date.toISOString(),
        exchangeRateBp: body.exchangeRate * 10000,
        priceBp: body.price * 10000,
        transactionType: body.transactionType,
      });
      return {
        data: {
          ...body,
        },
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },
  deleteActualPortfolioForm: async (
    id: string
  ): Promise<Response<ActualFormDeleteResponse>> => {
    try {
      const res = await deleteActualPortfolio(id);
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
  getActualPortfolios: async (
    params: ActualPortfolioSearchParams
  ): Promise<Response<ActualPortfolio[]>> => {
    try {
      const [currencies, assets, assetTypes, actuals] = await Promise.all([
        getCurrencies(),
        getAssets(),
        getAssetTypes(),
        // getActualPortfolios(),
        searchActualPortfolio(params),
      ]);

      return {
        data:
          actuals?.map((actual) => {
            const targetAsset = assets?.find(
              (asset) => asset.id === actual?.assetId
            );
            const targetAssetType = assetTypes?.find(
              (assetType) => assetType.id === targetAsset?.typeId
            );
            const targetCurrencies = currencies?.find(
              (currency) => currency.id === actual?.currencyId
            );
            return {
              assetName: targetAsset?.name || '',
              accumulatedRatio: 0, // 임시
              assetType: targetAssetType?.name || '',
              changesRatio: 0, // 임시,
              createdAt: new Date(actual?.createdAt || ''),
              currency: (targetCurrencies?.code as 'usd' | 'krw') || 'usd', // 이 부분 고민좀 해야겠네.
              date: new Date(actual?.date || ''),
              id: actual?.id || '',
              transactionType: actual?.transactionType || 'allocation',
              value:
                ((actual?.priceBp || 0) *
                  (actual?.amountBp || 0) *
                  (actual?.exchangeRateBp || 1)) /
                10000 /
                10000 /
                10000,
              assetDescription: targetAsset?.description,
            };
          }) || [],

        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },
  getAllRecentActualPortfolios: async (
    params?: Omit<NonNullable<ActualPortfolioSearchParams>, 'assetIds'>
  ): Promise<Response<ActualPortfolio[]>> => {
    try {
      const [currencies, assets, assetTypes] = await Promise.all([
        getCurrencies(),
        getAssets(),
        getAssetTypes(),
      ]);

      const recetns = await searchActualPortfolio({
        ...params,
        assetIds: assets ? assets.map((asset) => asset.id || '') : undefined,
      });

      return {
        data:
          recetns?.map((actual) => {
            const targetAsset = assets?.find(
              (asset) => asset.id === actual?.assetId
            );
            const targetAssetType = assetTypes?.find(
              (assetType) => assetType.id === targetAsset?.typeId
            );
            const targetCurrencies = currencies?.find(
              (currency) => currency.id === actual?.currencyId
            );
            return {
              assetName: targetAsset?.name || '',
              accumulatedRatio: 0, // 임시
              assetType: targetAssetType?.name || '',
              changesRatio: 0, // 임시,
              createdAt: new Date(actual?.createdAt || ''),
              currency: (targetCurrencies?.code as 'usd' | 'krw') || 'usd', // 이 부분 고민좀 해야겠네.
              date: new Date(actual?.date || ''),
              id: actual?.id || '',
              transactionType: actual?.transactionType || 'allocation',
              value:
                ((actual?.priceBp || 0) *
                  (actual?.amountBp || 0) *
                  (actual?.exchangeRateBp || 1)) /
                10000 /
                10000 /
                10000,
              assetDescription: targetAsset?.description,
            };
          }) || [],
        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },

  getUnlinkedActualPortfolios: async (): Promise<
    Response<ActualPortfolio[]>
  > => {
    try {
      const [currencies, assets, assetTypes, unlinkedActuals] =
        await Promise.all([
          getCurrencies(),
          getAssets(),
          getAssetTypes(),
          getUnlinkedActualPortfolios(),
        ]);
      return {
        data:
          unlinkedActuals?.map((actual) => {
            const targetAsset = assets?.find(
              (asset) => asset.id === actual?.assetId
            );
            const targetAssetType = assetTypes?.find(
              (assetType) => assetType.id === targetAsset?.typeId
            );
            const targetCurrencies = currencies?.find(
              (currency) => currency.id === actual?.currencyId
            );
            return {
              assetName: targetAsset?.name || '',
              accumulatedRatio: 0, // 임시
              assetType: targetAssetType?.name || '',
              changesRatio: 0, // 임시,
              createdAt: new Date(actual?.createdAt || ''),
              currency: (targetCurrencies?.code as 'usd' | 'krw') || 'usd', // 이 부분 고민좀 해야겠네.
              date: new Date(actual?.date || ''),
              id: actual?.id || '',
              transactionType: actual?.transactionType || 'allocation',
              value:
                ((actual?.priceBp || 0) *
                  (actual?.amountBp || 0) *
                  (actual?.exchangeRateBp || 1)) /
                10000 /
                10000 /
                10000,
              assetDescription: targetAsset?.description,
            };
          }) || [],

        error: null,
        success: true,
      };
    } catch (e) {
      return aggregateErrorHandler(e);
    }
  },
};
