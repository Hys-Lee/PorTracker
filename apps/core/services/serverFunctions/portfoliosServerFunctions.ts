'use server';

import {
  ActualFormCreateResponse,
  ActualFormDeleteResponse,
  actualFormRequestSchema,
  ActualFormUpdateResponse,
} from '@core/schemas/features/portfolios/portfolios.schema';
import {
  createActualForm,
  deleteActualForm,
  updateActualForm,
} from '@core/services';
import { Response } from '@core/types/api';
import z from 'zod';

export type PostActualFormRes = Response<
  | ActualFormCreateResponse
  | ActualFormUpdateResponse
  | ActualFormDeleteResponse,
  | z.inferFlattenedErrors<typeof actualFormRequestSchema>['fieldErrors']
  | undefined
>;

export const postActualForm = async (
  formData: FormData
): Promise<PostActualFormRes> => {
  const validated = actualFormRequestSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validated.success) {
    return {
      data: null,
      error: {
        type: 'VALIDATION_ERROR',
        message: 'Invalid FormData',
        details: validated.error.flatten().fieldErrors,
      },
      success: false,
    }; //as Response<null, z.inferFlattenedErrors<typeof actualFormRequestSchema>>;
  }

  switch (validated.data.submitMode) {
    case 'add': {
      const { submitMode, ...dataForAdd } = validated.data;
      return createActualForm(dataForAdd);
    }
    case 'modify': {
      const { submitMode, ...dataForModify } = validated.data;
      return updateActualForm(dataForModify);
    }
    case 'delete': {
      const { id } = validated.data;
      return deleteActualForm({ id });
    }

    default:
      return {
        data: null,
        error: {
          type: 'VALIDATION_ERROR',
          message: 'Invalid submitMode Value',
        },
        success: false,
      };
  }
};
