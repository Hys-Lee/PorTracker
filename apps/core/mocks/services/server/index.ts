import * as reals from '../../../services/server';

import * as mockPortfolioQueryServices from './queries/portfoliosQueries';
import * as mockMemoQueryServices from './queries/memosQueries';
import * as mockCommonQueryServices from './queries/commonQueries';

import * as mockPortfolioActionServices from './actions/portfoliosActions';
import * as mockMemoActionServices from './actions/memosActions';

import { branchFetchService } from '../utils';
const mockTotalServices = {
  ...mockCommonQueryServices,
  ...mockPortfolioQueryServices,
  ...mockMemoQueryServices,
  ...mockPortfolioActionServices,
  ...mockMemoActionServices,
};

const isStorybook = process.env.STORYBOOK;

// const branchedMockServices = branchFetchService(mockTotalServices, reals);

const branchedMockServices = isStorybook
  ? branchFetchService(mockTotalServices, reals)
  : reals;

// reals 중 mockService에 안만든거 사용할 수 있도록 함
export const {
  getActualPortfolioById,
  getAllActualPortfolios,
  getAssets,
  getRelatedMemoByMemoId,
  getRelatedMemo,
  getTransactionTypes,
  getActualPortfolioRecents,
  createActualForm,
  deleteActualForm,
  updateActualForm,

  // memo
  getAllPortfolios,
  getMemoFormById,
  createMemoForm,
  deleteMemoForm,
  updateMemoForm,
  getMemos,
  getMemoRecents,
} = { ...reals, ...branchedMockServices };
