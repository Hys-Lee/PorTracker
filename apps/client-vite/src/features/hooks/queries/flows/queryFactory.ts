import getCombined from 'src/features/fetching/flows/getCombined';
import getActuals, {
  GetActualsParam,
} from 'src/features/fetching/flows/getActuals';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import addDate from 'src/features/utils/addDate';
import { ActualDataResponse } from 'src/features/fetching/flows/getActuals';

const queryFactory = {
  combinedData: (date: Date, assetId: number, transactionType: string) => ({
    queryKey: [{ type: 'combined', assetId, date, transactionType }] as const,
    queryFn: () => {
      getCombined(date, assetId, transactionType);
    },
  }),
  // combinedByDateAsset처럼 합쳐서 가져오는 경우는 날짜랑 자산만 같은 경우밖에 없을거 같아서 밑에 따로 만듦.
  // 위에는 걍 남겨둠.
  combinedByDateAsset: (date?: Date, assetId?: number) =>
    queryOptions({
      queryKey: [{ type: 'combined', date, assetId }] as const,
      queryFn: async ({ queryKey }) => {
        const { date, assetId } = queryKey[0];
        if (!date || !assetId) return;

        return await getCombined(date, assetId);
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
