import type { ActualPortfolioQueryService } from '@core/services/queries/portfoliosQueries';
import { mockDB as portfolioDB } from '../../db/portfoliosDB';
import { HttpResponse } from 'msw';
import { Response } from '@core/types/api';
import {
  actualFormSchema,
  actualPortfolioListSchema,
  actualPortfolioSchema,
  actualRecentListsForAssetsSchema,
  assetInfoListSchema,
  relatedMemoSchema,
  transactionTypesListSchema,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { SafeParseReturnType, ZodError, z } from 'zod';
import { branchFetchService, makeSafeMockReturn } from '../utils';
import { mockDB as memoDB } from '@core/mocks/db/memoDB';

const actualPortfolioServiceMock: ActualPortfolioQueryService = {
  getTransactionTypes: async () => {
    const transactionTypes = Array.from(portfolioDB.transactionTypes.values());

    const validated = transactionTypesListSchema.safeParse(transactionTypes);

    return makeSafeMockReturn(validated);
  },
  getAssets: async () => {
    const assets = Array.from(portfolioDB.assets.values()).map((data) => ({
      ...data,
    }));

    const validated = assetInfoListSchema.safeParse(assets);
    return makeSafeMockReturn(validated);
  },
  getAllActualPortfolios: async ({
    assets,
    startDate,
    endDate,
    transaction,
    currency,
  }: {
    assets?: string;
    startDate?: string;
    endDate?: string;
    transaction?: string;
    currency?: string;
  }) => {
    const assetList = assets ? assets.split(',') : undefined;

    //test
    // console.log(
    //   'assets, startDAte, endDate, transactino, currency',
    //   assets,
    //   startDate,
    //   endDate,
    //   transaction,
    //   currency
    // );
    const actuals = Array.from(portfolioDB.actuals.values())
      .filter((data) => {
        // asset 필터
        if (!(!assetList || assetList?.includes(data.assetId))) return false;

        // startDate 필터
        if (
          !(
            !startDate ||
            new Date(startDate).getTime() <= new Date(data.date).getTime()
          )
        )
          return false;

        // endDate 필터
        if (
          !(
            !endDate ||
            new Date(endDate).getTime() >= new Date(data.date).getTime()
          )
        )
          return false;

        // transaction 타입 필터
        if (!(!transaction || data.transactionType === transaction))
          return false;

        // currency 필터
        if (!(!currency || data.currency === currency)) return false;

        return true;
      })
      .map((data) => ({
        accumulatedRatio: data.accumulatedRatio,
        assetName: data.assetName,
        assetType: data.assetType,
        changesRatio: data.changesRatio,
        createdAt: data.createdAt,
        currency: data.currency,
        date: data.date,
        id: data.id,
        transactionType: data.transactionType,
        value: data.amount * data.price * data.exchangeRate,
        assetDescription: data.assetDescription || undefined, // null -> undefined 변환.(bff역할이긴 함)
      }));

    const validated = actualPortfolioListSchema.safeParse(actuals);
    return makeSafeMockReturn(validated);
  },
  getActualPortfolioById: async (actualId: string) => {
    const found = portfolioDB.actuals.get(actualId);
    if (!found) {
      //   return HttpResponse.json(
      //     { message: 'Actual Not Found' },
      //     { status: 404 }
      //   );
      return makeSafeMockReturn(
        { success: false, error: {} as ZodError<any> },
        { status: 404, details: 'Actual Not Found' }
      );
    }

    // const recents = Array.from(portfolioDB.actuals.values()).filter(
    //   (data) => data.assetId === found?.assetId && true
    //   // new Date(data.date).getTime() < new Date(found.date).getTime()
    // );

    const validated = actualFormSchema.safeParse({
      amount: found.amount,
      assetInfo: {
        createdAt: found.createdAt,
        id: found.assetId,
        name: found.assetName,
        type: found.assetType,
        description: found.assetDescription || undefined,
      },
      currency: found.currency,
      date: found.date,
      exchangeRate: found.exchangeRate,
      id: found.id,
      price: found.price,
      transactionType: found.transactionType,
      relatedActuals: [],
      relatedMemoId: found.linkedMemo || undefined,
      // recents: recents,
    });

    return makeSafeMockReturn(validated);
  },
  getRelatedMemoByMemoId: async (memoId: string) => {
    // const found = portfolioDB.memos.get(memoId);
    const found = memoDB.memo.get(memoId);
    if (!found) {
      //   return HttpResponse.json({ message: 'Memo Not Found' }, { status: 404 });
      return makeSafeMockReturn(
        { success: false, error: {} as ZodError },
        { status: 404, details: 'Memo Not Found' }
      );
    }

    const validated = relatedMemoSchema.safeParse({
      content: found.content,
      evaluation: found.evaluation,
      id: found.id,
      importance: found.importance,
      tags: found.tags,
      title: found.title,
    });

    return makeSafeMockReturn(validated);
  },
  getActualPortfolioRecents: async () => {
    const assetInfos = [...portfolioDB.assets.values()];
    const allActuals = [...portfolioDB.actuals.values()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() // 오름차순?
    );

    const recentsObj = assetInfos.reduce((acc, assetInfo) => {
      return { ...acc, [assetInfo.id]: { assetInfo, recents: [] } };
      // }, {} as Record<string, z.infer<typeof actualRecentListsForAssetsSchema>[number]>);
    }, {} as Record<string, any>);

    allActuals.forEach((data) => {
      recentsObj[data.assetId].recents.push({
        amount: data.amount,
        currency: data.currency,
        date: data.date,
        exchangeRate: data.exchangeRate,
        id: data.id,
        price: data.price,
        transactionType: data.transactionType,
      });
    });

    const recentsArr = Object.values(recentsObj);
    //test
    console.log('recentsArr in mock: ', recentsArr);
    const validated = actualRecentListsForAssetsSchema.safeParse(recentsArr);
    return makeSafeMockReturn(validated);
  },
};

export const {
  getActualPortfolioById,
  getAllActualPortfolios,
  getAssets,
  getRelatedMemoByMemoId,
  getTransactionTypes,
  getActualPortfolioRecents,
} = actualPortfolioServiceMock;
// export const {
//   getActualPortfolioById,
//   getAllActualPortfolios,
//   getAssets,
//   getRelatedMemoByMemoId,
//   getTransactionTypes,
//   getActualPortfolioRecents,
// } = branchFetchService(
//   actualPortfolioServiceMock,
//   real,
//   'ActualPortfolioService'
// );
