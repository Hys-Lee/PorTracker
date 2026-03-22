import { actualPortfolioMockService } from './actualPortfolioMockService';
import { memoMockService } from './memoMockService';
import { targetPortfolioMockService } from './targetPortfolioMockService';
import { assetMockService } from './assetMockService';
import { assetTypeMockService } from './assetTypeMockService';
import { currencyMockService } from './currencyMockService';
import { credentialMockService } from './credentialMockService';
import { tagMockService } from './tagMockService';

// ─── ActualPortfolio ───────────────────────────────────────
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
} = actualPortfolioMockService;

// ─── Memo ──────────────────────────────────────────────────
export const {
  getAllMemos,
  getMemo,
  getMemosBulk,
  searchMemo,
  addMemo,
  updateMemo,
  deleteMemo,
  getRecentMemosByAssetId,
  patchMemo,
} = memoMockService;

// ─── TargetPortfolio ───────────────────────────────────────
export const {
  getTargetPortfolios,
  getTargetPortfolio,
  getTargetPortfoliosBulk,
  searchTargetPortfolio,
  addTargetPortfolio,
  updateTargetPortfolio,
  deleteTargetPortfolio,
  addSnapshot,
  addTargetPortfolioWithMemo,
  updateTargetPortfolioWithMemo,
} = targetPortfolioMockService;

// ─── Asset ─────────────────────────────────────────────────
export const { getAssets, getAssetsBulk, addAsset, updateAsset, deleteAsset } =
  assetMockService;

// ─── AssetType ─────────────────────────────────────────────
export const { getAssetTypes, addAssetType, updateAssetType, deleteAssetType } =
  assetTypeMockService;

// ─── Currency ──────────────────────────────────────────────
export const { getCurrencies, addCurrency, updateCurrency, deleteCurrency } =
  currencyMockService;

// ─── Credential ────────────────────────────────────────────
export const { updateToken } = credentialMockService;

// ─── Tag ───────────────────────────────────────────────────
export const { getAllTags, getTag, getTagsBulk, addTag, updateTag, deleteTag } =
  tagMockService;
