'use server';

import {
  MemoFormCreateResponse,
  MemoFormDeleteResponse,
  memoFormRequestSchema,
  MemoFormUpdateResponse,
} from '@core/schemas/features/memos/memos.schema';
import { Response } from '@core/types/api';
import z from 'zod';
import { createMemoForm, deleteMemoForm, updateMemoForm } from '@core/services';

export type PostMemoFormRes = Response<
  MemoFormCreateResponse | MemoFormUpdateResponse | MemoFormDeleteResponse,
  | z.inferFlattenedErrors<typeof memoFormRequestSchema>['fieldErrors']
  | undefined
>;

export const postMemoForm = async (
  formData: FormData
): Promise<PostMemoFormRes> => {
  const formDataObj = Object.fromEntries(formData.entries());

  //test
  console.log('formDataObj: ', formDataObj);

  const validated = memoFormRequestSchema.safeParse(formDataObj);

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
      return createMemoForm(dataForAdd);
    }
    case 'modify': {
      const { submitMode, ...dataForModify } = validated.data;
      return updateMemoForm(dataForModify);
    }
    case 'delete': {
      const { id } = validated.data;
      return deleteMemoForm({ id });
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
