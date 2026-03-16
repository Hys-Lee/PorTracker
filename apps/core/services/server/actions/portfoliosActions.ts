'use server';

import { serverFetch } from '@core/libs/api/server-fetcher';
import {
  actualCreateResponseSchema,
  actualDeleteResponseSchema,
  ActualFormCreateRequest,
  ActualFormDeleteRequest,
  ActualFormUpdateRequest,
  actualUpdateResponseSchema,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { Response } from '@core/types/api';
import z from 'zod';
import { schemaParser } from '../../shemaParser';
import { actualPortfolioAggregates } from '@core/server/aggregates/portfolios/actualPortfolioAggr';

export interface ActualPortfolioActionService {
  createActualForm: (
    // dataForAdd: z.infer<typeof actualFormRequestSchema['']>
    validatedData: ActualFormCreateRequest
    // ...params: any
  ) => Promise<Response<z.infer<typeof actualCreateResponseSchema>>>;
  updateActualForm: (
    // dataForModify: z.infer<typeof actualUpdateResponseSchema>
    // ...params: any
    validatedData: ActualFormUpdateRequest
  ) => Promise<Response<z.infer<typeof actualUpdateResponseSchema>>>;
  deleteActualForm: (
    // id: string
    // ...params: any
    validatedData: ActualFormDeleteRequest
  ) => Promise<Response<z.infer<typeof actualDeleteResponseSchema>>>;
}

const actualPortfolioActions: ActualPortfolioActionService = {
  createActualForm: async (dataForAdd) => {
    const res = await schemaParser(
      // serverFetch(`/api/portfolios/actuals`, {
      //   method: 'POST',
      //   body: JSON.stringify(dataForAdd),
      // }),
      actualPortfolioAggregates.addActualPortfolioForm(dataForAdd),
      actualCreateResponseSchema
    );
    return res;
  },

  updateActualForm: async (dataForModify) => {
    const res = await schemaParser(
      // serverFetch(`/api/portfolios/actuals/${dataForModify.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(dataForModify),
      // }),
      actualPortfolioAggregates.updateActualPortfolioForm(
        dataForModify.id,
        dataForModify
      ),
      actualUpdateResponseSchema
    );
    return res;
  },

  deleteActualForm: async (dataForDelete) => {
    const res = await schemaParser(
      // serverFetch(`/api/portfolios/actuals/${dataForDelete.id}`, {
      //   method: 'DELETE',
      // }),
      actualPortfolioAggregates.deleteActualPortfolioForm(dataForDelete.id),
      actualDeleteResponseSchema
    );
    return res;
  },
};

export const { createActualForm, deleteActualForm, updateActualForm } =
  actualPortfolioActions;
