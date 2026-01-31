import * as reals from '../../../services/client';

import * as mockMemoQueryServices from './queries/memosQueries';

import { branchFetchService } from '../utils';
const mockTotalServices = {
  ...mockMemoQueryServices,
};

const isStorybook = process.env.STORYBOOK;

// const branchedMockServices = branchFetchService(mockTotalServices, reals);

const branchedMockServices = isStorybook
  ? branchFetchService(mockTotalServices, reals)
  : reals;

// reals 중 mockService에 안만든거 사용할 수 있도록 함
export const {
  // memo
  getMemoRecents,
} = { ...reals, ...branchedMockServices };
