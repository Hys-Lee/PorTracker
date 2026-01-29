import { mockDB } from '@core/mocks/db/memoDB';
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

    return makeSafeMockReturn(validated);
  },
};

export const { getMemoRecents } = memoServiceMock;
