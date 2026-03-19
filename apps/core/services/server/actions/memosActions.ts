'use server';

// import { serverFetch } from '@core/libs/api/unified-fetcher';

import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../../shemaParser';
import {
  memoCreateResponseSchema,
  memoDeleteResponseSchema,
  MemoFormCreateRequest,
  MemoFormDeleteRequest,
  MemoFormUpdateRequest,
  memoUpdateResponseSchema,
} from '@core/schemas/features/memos/memos.schema';
import { memoAggregates } from '@core/server/aggregates/memos/memoAggr';

export interface MemoActionService {
  createMemoForm: (
    // dataForAdd: z.infer<typeof actualFormRequestSchema['']>
    validatedData: MemoFormCreateRequest
    // ...params: any
  ) => Promise<Response<z.infer<typeof memoCreateResponseSchema>>>;
  updateMemoForm: (
    // dataForModify: z.infer<typeof actualUpdateResponseSchema>
    // ...params: any
    validatedData: MemoFormUpdateRequest
  ) => Promise<Response<z.infer<typeof memoUpdateResponseSchema>>>;
  deleteMemoForm: (
    // id: string
    // ...params: any
    validatedData: MemoFormDeleteRequest
  ) => Promise<Response<z.infer<typeof memoDeleteResponseSchema>>>;
}

const memoActions: MemoActionService = {
  createMemoForm: async (dataForAdd) => {
    const res = await schemaParser(
      // serverFetch(`/api/memos`, {
      //   method: 'POST',
      //   body: JSON.stringify(dataForAdd),
      // }),
      memoAggregates.addMemoForm(dataForAdd),
      memoCreateResponseSchema
    );
    return res;
  },

  updateMemoForm: async (dataForModify) => {
    const res = await schemaParser(
      // serverFetch(`/api/memos/${dataForModify.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(dataForModify),
      // }),
      memoAggregates.updateMemoForm(dataForModify.id, dataForModify),
      memoUpdateResponseSchema
    );
    return res;
  },

  deleteMemoForm: async (dataForDelete) => {
    const res = await schemaParser(
      // serverFetch(`/api/memos/${dataForDelete.id}`, {
      //   method: 'DELETE',
      // }),
      memoAggregates.deleteMemoForm(dataForDelete.id),
      memoDeleteResponseSchema
    );
    return res;
  },
};

export const { createMemoForm, deleteMemoForm, updateMemoForm } = memoActions;
