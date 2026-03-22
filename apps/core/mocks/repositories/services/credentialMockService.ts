import { credentialRepository } from '@core/server/repositories/credentialRepo';

export const credentialMockService: {
  [key in keyof typeof credentialRepository]: (typeof credentialRepository)[key];
} = {
  updateToken: async (_body) => {
    // 토큰 업데이트는 mock에서 항상 성공 처리 (void 반환)
    return undefined;
  },
};
