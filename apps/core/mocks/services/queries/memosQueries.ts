import { mockDB } from '@core/mocks/db/memoDB';
import { mockDB as portfoliosDB } from '@core/mocks/db/portfoliosDB';
import { MemoQueryService } from '@core/services';
import { makeSafeMockReturn } from '../utils';
import z, { ZodError } from 'zod';
import {
  allPortfolioDetailedListSchema,
  allPortfolioDetailedSchema,
  memoFormListSchema,
} from '@core/schemas/features/memos/memos.schema';
import { PortfolioTypeValue } from '@core/types';

const memoServiceMock: MemoQueryService = {
  getMemoRecents: async (
    targetId?: string,
    portfolioType?: PortfolioTypeValue
  ) => {
    // test
    console.log('getMemoRecents in Mock Service');
    // if (!targetId || !portfolioType)
    //   return { data: [], success: true, error: null };
    const found = Array.from(mockDB.memo.values())
      .filter((memo) => {
        return (
          memo.type === (portfolioType || 'event') &&
          memo.linkedPortfolio === targetId
        );
      })
      .slice(0, 5);

    if (found.length <= 0) {
      return { data: [], error: null, success: true };
    }
    //test
    console.log('recent found in mockservice', found);
    const validated = memoFormListSchema.safeParse(
      found.map((data) => ({
        id: data.id,
        importance: data.importance,
        date: data.date,
        title: data.title,
        content: data.content,
        tags: data.tags,
        evaluation: data.evaluation,
        memoType: data.type,
      }))
    );

    return makeSafeMockReturn(validated);
  },
  getAllPortfolios: async () => {
    // test
    console.log('getAllPortfolios in Mock Service');
    const actuals = Array.from(portfoliosDB.actuals.values()).map((data) => ({
      ...data,
      portfolioType: 'actual' as PortfolioTypeValue,
    }));
    const targets: any[] = [];
    const alls: typeof actuals = [...actuals, ...targets].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const getAccumulatedValue = (value: number, changeRatioBps: number) => {
      const changeRatio = changeRatioBps / 100;
      return (value / changeRatio) * (1 + changeRatio);
    };

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
            accumulatedValue: getAccumulatedValue(
              data.price * data.exchangeRate * data.amount,
              data.changesRatio
            ),
          };
        return data;
      })
    );
    console.log('all portoflios in mock service', alls, validated);

    return makeSafeMockReturn(validated);
  },
};

export const { getAllPortfolios, getMemoRecents } = memoServiceMock;
