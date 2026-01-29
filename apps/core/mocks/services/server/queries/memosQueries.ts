import { mockDB } from '@core/mocks/db/memoDB';
import { mockDB as portfoliosDB } from '@core/mocks/db/portfoliosDB';
import { MemoServerQueryService } from '@core/services/server';
import { makeSafeMockReturn } from '../../utils';
import z, { ZodError } from 'zod';
import {
  allPortfolioDetailedListSchema,
  allPortfolioDetailedSchema,
  memoFormListSchema,
  memoFormSchema,
  memoRecentListSchema,
  MemoTile,
  memoTileListSchema,
  memoTileSchema,
} from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';
import { calcAccuValFromChangeInfo } from '@core/utils/helpers/calcAccValFromChangeInfo';
import { getMemoRecents as getMemoRecentsOnClient } from '../../client/queries/memosQueries';

const memoServiceMock: MemoServerQueryService = {
  getAllPortfolios: async () => {
    const actuals = Array.from(portfoliosDB.actuals.values()).map((data) => ({
      ...data,
      portfolioType: 'actual' as PortfolioTypeValue,
    }));
    const targets: any[] = [];
    const alls: typeof actuals = [...actuals, ...targets].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // const getAccumulatedValue = (value: number, changeRatioBps: number) => {
    //   const changeRatio = changeRatioBps / 100;
    //   return (value / changeRatio) * (1 + changeRatio);
    // };

    const validated = allPortfolioDetailedListSchema.safeParse(
      alls.map((data) => {
        if (data.portfolioType === 'actual')
          return {
            amount: data.amount,
            assetName: data.assetName,
            portfolioType: 'actual',
            assetType: data.assetType,
            createdAt: data.createdAt,
            currency: data.currency,
            date: data.date,
            exchangeRate: data.exchangeRate,
            id: data.id,
            price: data.price,
            transactionType: data.transactionType,
            assetDescription: data.assetDescription || '',
            value: data.price * data.exchangeRate * data.amount,
            changesRatio: data.changesRatio,
            accumulatedRatio: data.accumulatedRatio,
            accumulatedValue: calcAccuValFromChangeInfo(
              data.price * data.exchangeRate * data.amount,
              data.changesRatio
            ),
          };
        return data;
      })
    );

    return makeSafeMockReturn(validated);
  },
  getMemoFormById: async (memoId: string) => {
    const found = mockDB.memo.get(memoId);
    if (!found) {
      return makeSafeMockReturn(
        { success: false, error: {} as ZodError<any> },
        { status: 404, details: 'Actual Not Found' }
      );
    }

    const linkedPortfolio:
      | ReturnType<typeof portfoliosDB.actuals.get>
      | undefined =
      found.type === 'actual' && found.linkedPortfolio
        ? portfoliosDB.actuals.get(found.linkedPortfolio)
        : undefined;

    const validated = memoFormSchema.safeParse({
      ...found,
      memoType: found.type,
      linkedPortfolioInfo: linkedPortfolio
        ? {
            ...linkedPortfolio,
            value:
              linkedPortfolio.price *
              linkedPortfolio.amount *
              linkedPortfolio.exchangeRate,
            accumulatedValue: calcAccuValFromChangeInfo(
              linkedPortfolio.price *
                linkedPortfolio.amount *
                linkedPortfolio.exchangeRate,
              linkedPortfolio.accumulatedRatio
            ),
            assetDescription: linkedPortfolio.assetDescription || '',
          }
        : undefined,
    });

    //test
    console.log('found,linked,validated:', found, linkedPortfolio, validated);

    return makeSafeMockReturn(validated);
  },
  getMemos: async ({
    startDate,
    endDate,
    memoType,
    currency,
  }: {
    startDate?: string;
    endDate?: string;
    memoType?: string;
    currency?: string;
  }) => {
    const memos = Array.from(mockDB.memo.values()).filter((data) => {
      if (
        !(
          !startDate ||
          new Date(data.date).getTime() >= new Date(startDate).getTime()
        )
      )
        return false;

      if (
        !(
          !endDate ||
          new Date(data.date).getTime() <= new Date(endDate).getTime()
        )
      )
        return false;

      if (!(!memoType || data.type === memoType)) return false;

      const linkedType = memoType === 'actual' ? 'actuals' : 'actuals'; // 일단 actuals만 임시로.
      if (
        !(
          !currency ||
          (memoType === 'actual' &&
            portfoliosDB?.[linkedType]?.get(data.linkedPortfolio || '')
              ?.currency === currency)
        )
      )
        return false;

      return true;
    });

    //test
    console.log(
      '전부 내놔봐: ',
      Array.from(mockDB.memo.values()),
      Array.from(portfoliosDB.actuals.values()),
      memos
    );

    const validated = memoTileListSchema.safeParse(
      memos.map((data) => ({
        content: data.content,
        date: data.date,
        id: data.id,
        importance: data.importance,
        memoType: data.type,
        tags: data.tags,
        title: data.title,
      }))
    );

    //test
    console.log('mock memo qury: ', validated);

    return makeSafeMockReturn(validated);
  },
  getMemoRecents: getMemoRecentsOnClient,
};

export const { getMemoRecents, getAllPortfolios, getMemoFormById, getMemos } =
  memoServiceMock;
