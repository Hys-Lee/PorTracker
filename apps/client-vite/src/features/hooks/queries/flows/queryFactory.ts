import getCombined from 'src/features/fetching/flows/getCombined';
import getActuals, {
  GetActualsParam,
} from 'src/features/fetching/flows/getActuals';
import { infiniteQueryOptions } from '@tanstack/react-query';
import addDate from 'src/features/utils/addDate';
import { ActualDataResponse } from 'src/features/fetching/flows/getActuals';

const queryFactory = {
  combinedOne: (date: Date, asset: string, transactionType: string) => ({
    queryKey: [{ type: 'combined', asset, date, transactionType }] as const,
    queryFn: () => {
      getCombined(date, asset, transactionType);
    },
  }),

  actualInfinite: (
    endDate: Date,
    size: number,
    assetIds?: number[],
    transactionType?: string
  ) => {
    // const startDate = addDate(endDate, 'day', -dayInterval);

    return infiniteQueryOptions({
      queryKey: [{ type: 'actual' }] as const,
      queryFn: async ({ pageParam }) => {
        return await getActuals(pageParam as GetActualsParam);
      },
      initialPageParam: {
        // startDate,
        endDate,
        assetIds,
        transactionType,
        size,
        page: 1,
      },
      getNextPageParam: (
        lastPage: ActualDataResponse,
        _allPage: unknown,
        lastPageParam: GetActualsParam
      ) => {
        const nextParam = lastPage.meta.nextCursor // 정확하겐 null인지 체크
          ? {
              ...lastPage.meta.nextCursor,
              endDate: new Date(lastPage.meta.nextCursor.endDate),
              page: undefined,
            }
          : undefined;
        return nextParam;
      },
    });
  },
};

export default queryFactory;
