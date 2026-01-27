import { mockDB as portfoliosDB } from '@core/mocks/db/portfoliosDB';
import { mockDB } from '@core/mocks/db/memoDB';
import { ActualFormDeleteResponse } from '@core/schemas/features/portfolios/portfolios.schema';
import type { MemoActionService } from '@core/services/actions/memosActions';
import { v4 as uuidV4 } from 'uuid';
import { Response } from '@core/types/api';
import {
  MemoFormCreateResponse,
  MemoFormUpdateResponse,
} from '@core/schemas/features/memos/memos.schema';

const memoActionsMock: MemoActionService = {
  createMemoForm: async (validatedData) => {
    /** Server Action 단에서 Validation 체크 됨. */
    // const validated = actualFormRequestSchema.safeParse(dataForAdd);
    const newId = uuidV4();
    const linkedPortfolio =
      validatedData.memoType === 'actual'
        ? portfoliosDB.actuals.get(validatedData.linkedPortfolioId)
        : {};

    if (!linkedPortfolio) {
      // 원래는 생성하고 unkown이나 temp같은 임시 타입으로 설정시켜줘야 하는데, 일단 우선 에러 내자.
      return {
        data: null,
        error: {
          type: 'HTTP_ERROR',
          message: 'Mock Function Error',
          details: '해당되는 Asset이 존재하지 않습니다!',
        },
        success: false,
      };
    }

    const newData: Parameters<typeof mockDB.memo.set>[1] = {
      content: validatedData.content,
      createdAt: new Date().toISOString(),
      date: validatedData.date.toISOString(),
      evaluation: validatedData.evaluation,
      id: newId,
      importance: validatedData.importance,
      tags: validatedData.tags,
      title: validatedData.title,
      type: validatedData.memoType,
      linkedPortfolio: validatedData.linkedPortfolioId,
    };

    mockDB.memo.set(newId, newData);
    const safeReturn = {
      data: {
        content: newData.content,
        date: new Date(newData.date),
        evaluation: newData.evaluation,
        importance: newData.importance,
        memoType: newData.type,
        tags: newData.tags,
        title: newData.title,
        linkedPortfolioInfo: newData.linkedPortfolio,
      },
      error: null,
      success: true,
    } as Response<MemoFormCreateResponse>;
    return safeReturn;
  },
  updateMemoForm: async (validatedData) => {
    const linkedPortfolio =
      validatedData.memoType === 'actual'
        ? portfoliosDB.actuals.get(validatedData.linkedPortfolioId)
        : {};

    if (!linkedPortfolio) {
      // 원래는 생성하고 unkown이나 temp같은 임시 타입으로 설정시켜줘야 하는데, 일단 우선 에러 내자.
      return {
        data: null,
        error: {
          type: 'HTTP_ERROR',
          message: 'Mock Function Error',
          details: '해당되는 Asset이 존재하지 않습니다!',
        },
        success: false,
      };
    }
    const newData: Parameters<typeof mockDB.memo.set>[1] = {
      content: validatedData.content,
      createdAt: new Date().toISOString(),
      date: validatedData.date.toISOString(),
      evaluation: validatedData.evaluation,
      id: validatedData.id,
      importance: validatedData.importance,
      tags: validatedData.tags,
      title: validatedData.title,
      type: validatedData.memoType,
      linkedPortfolio: validatedData.linkedPortfolioId,
    };
    mockDB.memo.set(validatedData.id, newData);

    const safeRes = {
      data: {
        ...newData,
        date: new Date(newData.date),
        memoType: newData.type,
      },
      error: null,
      success: true,
    } as Response<MemoFormUpdateResponse>;
    return safeRes;
  },
  deleteMemoForm: async (validatedData) => {
    const targetId = validatedData.id;

    mockDB.memo.delete(targetId);
    const safeRes = {
      data: {
        id: targetId,
      },
      error: null,
      success: true,
    } as Response<ActualFormDeleteResponse>;
    return safeRes;
  },
};

export const { createMemoForm, deleteMemoForm, updateMemoForm } =
  memoActionsMock;
