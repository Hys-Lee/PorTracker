import { actualPortfolioRepository } from './actualPortfolioRepo';
import { assetRepository } from './assetRepo';
import { assetTypeRepository } from './assetTypeRepo';
import { credentialRepository } from './credentialRepo';
import { currencyRepository } from './currencyRepo';
import { memoRepository } from './memoRepo';
import { targetPortfolioRepository } from './targetPortfolioRepo';

export const {
  addActualPortfolio,
  deleteActualPortfolio,
  getActualPortfolio,
  getActualPortfolios,
  getActualPortfoliosBulk,
  searchActualPortfolio,
  updateActualPortfolio,
  getUnlinkedActualPortfolios,
  addActualPortfolioWithMemo,
  updateActualPortfolioWithMemo,
} = actualPortfolioRepository;

export const { addAsset, deleteAsset, getAssets, getAssetsBulk, updateAsset } =
  assetRepository;
export const { addAssetType, deleteAssetType, getAssetTypes, updateAssetType } =
  assetTypeRepository;
export const { updateToken } = credentialRepository;
export const { addCurrency, deleteCurrency, getCurrencies, updateCurrency } =
  currencyRepository;
export const {
  addMemo,
  deleteMemo,
  getAllMemos,
  getMemo,
  getMemosBulk,
  getRecentMemosByAssetId,
  searchMemo,
  updateMemo,
  patchMemo,
} = memoRepository;
export const {
  addSnapshot,
  addTargetPortfolio,
  deleteTargetPortfolio,
  getTargetPortfolio,
  getTargetPortfolios,
  getTargetPortfoliosBulk,
  searchTargetPortfolio,
  updateTargetPortfolio,
  addTargetPortfolioWithMemo,
  updateTargetPortfolioWithMemo,
} = targetPortfolioRepository;
