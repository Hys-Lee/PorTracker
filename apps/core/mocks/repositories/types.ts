/**
 * MSW Repository Mock에서 사용하는 타입 유틸리티
 * server/types/generated/be-api-schema의 components['schemas']에서 추출
 */
import type { components } from '@core/server/types/generated/be-api-schema';

// Response Types
export type MemoResponse = components['schemas']['MemoResponse'];
export type ActualPortfolioResponse =
  components['schemas']['ActualPortfolioResponse'];
export type TargetPortfolioResponse =
  components['schemas']['TargetPortfolioResponse'];
export type TargetPortfolioItemResponse =
  components['schemas']['TargetPortfolioItemResponse'];
export type AssetResponse = components['schemas']['AssetResponse'];
export type AssetTypeResponse = components['schemas']['AssetTypeResponse'];
export type CurrencyTypeResponse =
  components['schemas']['CurrencyTypeResponse'];
export type TagResponse = components['schemas']['TagResponse'];
export type IdResponse = components['schemas']['IdResponse'];
export type ErrorResponse = components['schemas']['ErrorResponse'];
export type ProfileResponse = components['schemas']['ProfileResponse'];
export type GroupStatisticResponse =
  components['schemas']['GroupStatisticResponse'];

// Request Types
export type MemoCreateRequest = components['schemas']['MemoCreateRequest'];
export type ActualPortfolioCreateRequest =
  components['schemas']['ActualPortfolioCreateRequest'];
export type TargetPortfolioCreateRequest =
  components['schemas']['TargetPortfolioCreateRequest'];
export type TargetPortfolioItemRequest =
  components['schemas']['TargetPortfolioItemRequest'];
export type TargetPortfolioSnapshotUpdateRequest =
  components['schemas']['TargetPortfolioSnapshotUpdateRequest'];
export type AssetCreateRequest = components['schemas']['AssetCreateRequest'];
export type AssetTypeRequest = components['schemas']['AssetTypeRequest'];
export type CurrencyTypeRequest = components['schemas']['CurrencyTypeRequest'];
export type TagCreateRequest = components['schemas']['TagCreateRequest'];
export type ProfileUpdateRequest =
  components['schemas']['ProfileUpdateRequest'];

// Enum Types
export type Importance = components['schemas']['Importance'];
export type Evaluation = components['schemas']['Evaluation'];
export type MemoType = components['schemas']['MemoType'];
export type TransactionType = components['schemas']['TransactionType'];
