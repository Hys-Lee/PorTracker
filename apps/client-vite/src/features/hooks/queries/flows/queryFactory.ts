import getCombined from 'src/features/fetching/flows/getCombined';
import getActuals, {
  GetActualsParam,
} from 'src/features/fetching/flows/getActuals';
import { infiniteQueryOptions } from '@tanstack/react-query';
import addDate from 'src/features/utils/addDate';

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
    assets?: string[],
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
        assets,
        transactionType,
        size,
        page: 1,
      },
      getNextPageParam: (
        lastPage: {
          data: unknown[];
          meta: {
            total?: number;
            nextCursor: { endDate: string; id: number; size: number };
          };
        },
        _allPage: unknown,
        lastPageParam: GetActualsParam
      ) => {
        //test
        // console.log('cursor: ', lastPage.meta.nextCursor);
        const nextParam = {
          ...lastPage.meta.nextCursor,
          endDate: new Date(lastPage.meta.nextCursor.endDate),
          page: undefined,
        };
        return nextParam;
      },
    });
  },
};

export default queryFactory;
