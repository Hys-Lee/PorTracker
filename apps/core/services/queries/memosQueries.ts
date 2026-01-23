import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../shemaParser';
import { unifiedFetcher } from '@core/libs/api/unified-fetcher';

export interface MemoQueryService {
  getMemoRecents: (
    ...params: any
  ) => Promise<//   Response<z.infer<typeof transactionTypesListSchema>>
  any>;
}

const memoServices: MemoQueryService = {
  getMemoRecents: async (targetId?: string) => {
    const res = await schemaParser(unifiedFetcher(''), {} as z.Schema);
    return res;
  },
};

export const { getMemoRecents } = memoServices;
