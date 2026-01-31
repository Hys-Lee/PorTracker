import { mockDB } from '@core/mocks/db/memoDB';
import { mockDB as portfolioDB } from '@core/mocks/db/portfoliosDB';
import { memoRecentListSchema } from '@core/schemas/features/memos/memos.schema';
import { MemoClientQueryService } from '@core/services/client';
import { PortfolioTypeValue } from '@core/types';
import { makeSafeMockReturn } from '../../utils';

const memoServiceMock: MemoClientQueryService = {
  getMemoRecents: async (
    targetId?: string,
    portfolioType?: PortfolioTypeValue
  ) => {
    // if (!targetId || !portfolioType)
    //   return { data: [], success: true, error: null };
    const sameAssetActuals = Array.from(portfolioDB.actuals.values()).filter(
      (data) => data.assetId === targetId
    );

    //tset
    // console.log(
    //   'sameAssetActuals in clinet mock getMemoRecent: ',
    //   sameAssetActuals,
    //   targetId,
    //   Array.from(portfolioDB.actuals.values()),
    //   Array.from(portfolioDB.assets.values()),
    //   Array.from(mockDB.memo.values())
    // );
    const found = Array.from(mockDB.memo.values())
      .filter((memo) => {
        return (
          memo.type === (portfolioType || 'event') &&
          // memo.linkedPortfolio === targetId
          sameAssetActuals.find((data) => memo.linkedPortfolio === data.id)
        );
      })
      .slice(0, 5);

    if (found.length <= 0) {
      return { data: [], error: null, success: true };
    }

    const validated = memoRecentListSchema.safeParse(
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
    ///test
    console.log('validaltdl in moerecents: ', validated);

    return makeSafeMockReturn(validated);
  },
};

export const { getMemoRecents } = memoServiceMock;
