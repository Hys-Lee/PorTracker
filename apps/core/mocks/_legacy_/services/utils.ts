import { SafeParseReturnType } from 'zod';
import { Response } from '@core/types/api';

export const makeSafeMockReturn = <T>(
  validated: SafeParseReturnType<any, T>,
  errorDetails?: Pick<NonNullable<Response<T>['error']>, 'details' | 'status'>,
  onSuccess?: (data: T) => void
): Response<T> => {
  if (validated.success) {
    if (onSuccess) onSuccess(validated.data);

    return {
      data: validated.data,
      error: null,
      success: true,
    };
  }
  return {
    data: null,
    error: {
      type: 'HTTP_ERROR',
      message: 'Mock Function Error',

      ...errorDetails,
    },
    success: false,
  };
};

/**  */

export const branchFetchService = <T extends Record<string, any>>(
  mockServices: T,
  realFethcingService: T,
  descriptionTarget?: string
) => {
  //test
  console.log(
    'typeof real: ',
    typeof realFethcingService,
    directServiceController.isDirectService()
  );

  return Object.keys(mockServices).reduce((acc, serviceKey) => {
    const mockService = mockServices[serviceKey];
    const realService = realFethcingService[serviceKey];
    const finalFn = (...params: any) => {
      if (directServiceController.isDirectService()) {
        console.log(
          `[Mock Branch] ${descriptionTarget}에 대해 MockService를 사용합니다`
        );

        if (mockService) return mockService(...params);

        console.error(
          '[Mock Branch] Error: mockService가 배정되지 않았습니다.'
        );
        return;
      } else {
        console.log(
          `[Mock Branch] ${descriptionTarget}에 대해 MSW를 사용합니다`
        );
        if (realService) return realService(...params);

        console.error('[Mock Branch] Error: realService 배정되지 않았습니다.');
        return;
      }
    };
    return {
      ...acc,
      [serviceKey]: finalFn,
    };
  }, {} as T);

  // return new Proxy(mockServices, {
  //   get(target, props) {
  //     if (typeof props === 'string') {
  //       console.log(
  //         `[Mock Proxy] ${descriptionTarget}에 대해 ${
  //           directServiceController.isDirectService() ? 'MockService' : 'MSW'
  //         }를 사용합니다`
  //       );

  //       const finalService = directServiceController.isDirectService()
  //         ? target[props]
  //         : realFethcingService[props];
  //       return finalService;
  //     }
  //     return async () =>
  //       ({
  //         data: null,
  //         success: false,
  //         error: { type: 'APP_ERROR', message: 'Mock Proxy Key Type Error' },
  //       } as Response<null>);
  //   },
  // });
};

let useDirectService = false;

export const directServiceController = {
  setDirectService: (enabled: boolean) => {
    useDirectService = enabled;
  },
  isDirectService: () => {
    return useDirectService;
  },
};
