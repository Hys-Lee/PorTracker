import { mockDB } from '@core/mocks/db/portfoliosDB';
import {
  actualCreateResponseSchema,
  actualDeleteResponseSchema,
  ActualFormCreateResponse,
  ActualFormDeleteResponse,
  actualFormRequestSchema,
  ActualFormUpdateResponse,
  actualUpdateResponseSchema,
} from '@core/schemas/portfolios.schema';
import type { ActualPortfolioActionService } from '@core/services/actions/portfoliosActions';
import { v4 as uuidV4 } from 'uuid';
import { branchFetchService, makeSafeMockReturn } from '../utils';
import { Response } from '@core/types/api';

const actualPortfolioActionsMock: ActualPortfolioActionService = {
  createActualForm: async (validatedData) => {
    /** Server Action 단에서 Validation 체크 됨. */
    // const validated = actualFormRequestSchema.safeParse(dataForAdd);
    const newId = uuidV4();
    const targetAssetInfo = mockDB.assets.get(validatedData.assetId);
    //test
    console.log('요까진 옴', validatedData);
    mockDB.assets.forEach((data) => console.log('asset들: ', data.id));
    if (!targetAssetInfo) {
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

    const newData = {
      accumulatedRatio: 4, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
      amount: validatedData.amount,
      assetDescription: targetAssetInfo.description,
      assetId: targetAssetInfo.id,
      assetName: targetAssetInfo.name,
      assetType: targetAssetInfo.type,
      changesRatio: 1, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
      createdAt: new Date().toISOString(),
      currency: validatedData.currency,
      date: new Date(validatedData.date).toISOString(),
      exchangeRate: validatedData.exchangeRate,
      id: newId,
      linkedMemo: null, // 이것도 폼 UI에 뚫어놔야 함.
      price: validatedData.price,
      transactionType: validatedData.transactionType,
    };

    mockDB.actuals.set(newId, newData);
    const safeReturn = {
      data: {
        amount: newData.amount,
        assetInfo: {
          createdAt: new Date(targetAssetInfo.createdAt),
          id: targetAssetInfo.id,
          name: targetAssetInfo.name,
          description: targetAssetInfo.description,
          type: targetAssetInfo.type,
        },
        currency: newData.currency,
        date: new Date(newData.date),
        exchangeRate: newData.exchangeRate,
        id: newId,
        price: newData.price,
        transactionType: newData.transactionType,
      },
      error: null,
      success: true,
    } as Response<ActualFormCreateResponse>;
    return safeReturn;
    // return makeSafeMockReturn(returnedValidated, undefined, (data) => {
    //   const newId = uuidV4();
    //   mockDB.actuals.set(newId, {
    //     accumulatedRatio: 4, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
    //     amount: data.amount,
    //     assetDescription: data.assetInfo.description,
    //     assetId: data.assetInfo.id,
    //     assetName: data.assetInfo.name,
    //     assetType: data.assetInfo.type,
    //     changesRatio: 1, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
    //     createdAt: new Date().toISOString(),
    //     currency: data.currency,
    //     date: data.date.toISOString(),
    //     exchangeRate: data.exchangeRate,
    //     id: newId,
    //     linkedMemo: null, // 이것도 폼 UI에 뚫어놔야 함.
    //     price: data.price,
    //     transactionType: data.transactionType,
    //   });
    // });
  },
  updateActualForm: async (validatedData) => {
    const targetAssetInfo = mockDB.assets.get(validatedData.assetId);

    if (!targetAssetInfo) {
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
    const newData = {
      accumulatedRatio: 4, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
      amount: validatedData.amount,
      assetDescription: targetAssetInfo.description,
      assetId: targetAssetInfo.id,
      assetName: targetAssetInfo.name,
      assetType: targetAssetInfo.type,
      changesRatio: 1, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
      createdAt: new Date().toISOString(),
      currency: validatedData.currency,
      date: new Date(validatedData.date).toISOString(),
      exchangeRate: validatedData.exchangeRate,
      id: validatedData.id,
      linkedMemo: null, // 이것도 폼 UI에 뚫어놔야 함.
      price: validatedData.price,
      transactionType: validatedData.transactionType,
    };
    mockDB.actuals.set(validatedData.id, newData);

    const safeRes = {
      data: {
        ...newData,
        assetDescription: undefined,
        assetId: undefined,
        assetName: undefined,
        assetType: undefined,
        assetInfo: {
          ...targetAssetInfo,
          createdAt: new Date(targetAssetInfo.createdAt),
        },
        date: new Date(newData.date),
      },
      error: null,
      success: true,
    } as Response<ActualFormUpdateResponse>;
    return safeRes;

    // const validated = actualUpdateResponseSchema.safeParse(dataForModify);
    // return makeSafeMockReturn(validated, undefined, (data) => {
    //   mockDB.actuals.set(data.id, {
    //     accumulatedRatio: 4, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
    //     amount: data.amount,
    //     assetDescription: data.assetInfo.description,
    //     assetId: data.assetInfo.id,
    //     assetName: data.assetInfo.name,
    //     assetType: data.assetInfo.type,
    //     changesRatio: 1, // 슈바 이거 db에서 동일 asset에 대해 계산해야 하는디
    //     createdAt: new Date().toISOString(),
    //     currency: data.currency,
    //     date: data.date.toISOString(),
    //     exchangeRate: data.exchangeRate,
    //     id: data.id,
    //     linkedMemo: null, // 이것도 폼 UI에 뚫어놔야 함.
    //     price: data.price,
    //     transactionType: data.transactionType,
    //   });
    // });
  },
  deleteActualForm: async (validatedData) => {
    const targetActualInfo = mockDB.actuals.get(validatedData.id);

    if (!targetActualInfo) {
      // 원래는 생성하고 unkown이나 temp같은 임시 타입으로 설정시켜줘야 하는데, 일단 우선 에러 내자.
      return {
        data: null,
        error: {
          type: 'HTTP_ERROR',
          message: 'Mock Function Error',
          details: '해당되는 ActualPortfolio가 존재하지 않습니다!',
        },
        success: false,
      };
    }

    const targetId = targetActualInfo.id;

    mockDB.actuals.delete(targetId);
    const safeRes = {
      data: {
        id: targetId,
      },
      error: null,
      success: true,
    } as Response<ActualFormDeleteResponse>;
    return safeRes;
    // const validated = actualDeleteResponseSchema.safeParse(id);
    // return makeSafeMockReturn(validated, undefined, (data) => {
    //   mockDB.actuals.delete(data.id);
    // });
  },
};

export const { createActualForm, deleteActualForm, updateActualForm } =
  actualPortfolioActionsMock;
