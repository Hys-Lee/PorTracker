import * as reals from '../../services';

import * as mockPortfolioQueryServices from './queries/portfoliosQueries';
import * as mockMemoQueryServices from './queries/memosQueries';

import * as mockPortfolioActionServices from './actions/portfoliosActions';
import * as mockMemoActionServices from './actions/memosActions';

import { branchFetchService } from './utils';
const mockTotalServices = {
  ...mockPortfolioQueryServices,
  ...mockMemoQueryServices,
  ...mockPortfolioActionServices,
  ...mockMemoActionServices,
};
const branchedMockServices = branchFetchService(mockTotalServices, reals);

// reals 중 mockService에 안만든거 사용할 수 있도록 함
export const {
  getActualPortfolioById,
  getAllActualPortfolios,
  getAssets,
  getRelatedMemoByMemoId,
  getTransactionTypes,
  getActualPortfolioRecents,
  createActualForm,
  deleteActualForm,
  postActualForm,
  updateActualForm,
  tmpAction,
  // memo
  getAllPortfolios,
  getMemoFormById,
  createMemoForm,
  deleteMemoForm,
  postMemoForm,
  updateMemoForm,

  // keys
  getMemoRecents,
  memoKeys,
} = { ...reals, ...branchedMockServices };
