/**
 * MSW Repository Mock에서 사용하는 Mock 데이터
 * 모든 데이터는 be-api-schema의 Response 타입을 기반으로 정의됩니다.
 */
import { faker } from '@faker-js/faker';
import type {
  MemoResponse,
  ActualPortfolioResponse,
  TargetPortfolioResponse,
  AssetResponse,
  AssetTypeResponse,
  CurrencyTypeResponse,
  TagResponse,
  ProfileResponse,
  GroupStatisticResponse,
} from './types';

faker.seed(Array.from('repository-mock').map((c) => c.charCodeAt(0)));

// ─── Currency ──────────────────────────────────────────────
const currencyData: CurrencyTypeResponse[] = [
  { id: faker.string.uuid(), code: 'KRW' },
  { id: faker.string.uuid(), code: 'USD' },
  { id: faker.string.uuid(), code: 'JPY' },
];

// ─── AssetType ─────────────────────────────────────────────
const assetTypeData: AssetTypeResponse[] = [
  {
    id: faker.string.uuid(),
    name: '주식',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: faker.string.uuid(),
    name: '채권',
    createdAt: new Date('2026-01-02').toISOString(),
  },
  {
    id: faker.string.uuid(),
    name: 'ETF',
    createdAt: new Date('2026-01-03').toISOString(),
  },
];

// ─── Asset ─────────────────────────────────────────────────
const assetData: AssetResponse[] = [
  {
    id: faker.string.uuid(),
    name: '삼성전자',
    description: '국내 대표 반도체 기업',
    createdAt: new Date('2026-01-10').toISOString(),
    currencyId: currencyData[0].id,
    typeId: assetTypeData[0].id,
  },
  {
    id: faker.string.uuid(),
    name: 'AAPL',
    description: 'Apple Inc.',
    createdAt: new Date('2026-01-11').toISOString(),
    currencyId: currencyData[1].id,
    typeId: assetTypeData[0].id,
  },
  {
    id: faker.string.uuid(),
    name: 'SPY',
    description: 'S&P 500 ETF',
    createdAt: new Date('2026-01-12').toISOString(),
    currencyId: currencyData[1].id,
    typeId: assetTypeData[2].id,
  },
];

// ─── Tag ───────────────────────────────────────────────────
const tagData: TagResponse[] = [
  { id: faker.string.uuid(), content: '중요' },
  { id: faker.string.uuid(), content: '리밸런싱' },
  { id: faker.string.uuid(), content: '매수' },
  { id: faker.string.uuid(), content: '매도' },
];

// ─── ActualPortfolio ───────────────────────────────────────
const actualPortfolioData: ActualPortfolioResponse[] = [
  {
    id: faker.string.uuid(),
    assetId: assetData[0].id,
    date: new Date('2026-02-01').toISOString(),
    createdAt: new Date('2026-02-01T10:00:00').toISOString(),
    transactionType: 'allocation',
    currencyId: currencyData[0].id,
    priceBp: 7200000,
    amountBp: 100000,
    exchangeRateBp: 10000,
  },
  {
    id: faker.string.uuid(),
    assetId: assetData[1].id,
    date: new Date('2026-02-05').toISOString(),
    createdAt: new Date('2026-02-05T14:30:00').toISOString(),
    transactionType: 'allocation',
    currencyId: currencyData[1].id,
    priceBp: 1890000,
    amountBp: 50000,
    exchangeRateBp: 13500000,
  },
  {
    id: faker.string.uuid(),
    assetId: assetData[0].id,
    date: new Date('2026-02-10').toISOString(),
    createdAt: new Date('2026-02-10T09:00:00').toISOString(),
    transactionType: 'withdrawal',
    currencyId: currencyData[0].id,
    priceBp: 7500000,
    amountBp: 30000,
    exchangeRateBp: 10000,
  },
];

// ─── TargetPortfolio ───────────────────────────────────────
const targetPortfolioData: TargetPortfolioResponse[] = [
  {
    id: faker.string.uuid(),
    name: '2026 1분기 목표',
    date: new Date('2026-01-01').toISOString(),
    createdAt: new Date('2026-01-01').toISOString(),
    items: [
      { assetId: assetData[0].id, currentRatioBp: 4000 },
      { assetId: assetData[1].id, currentRatioBp: 3500 },
      { assetId: assetData[2].id, currentRatioBp: 2500 },
    ],
  },
  {
    id: faker.string.uuid(),
    name: '2026 2분기 목표',
    date: new Date('2026-04-01').toISOString(),
    createdAt: new Date('2026-03-01').toISOString(),
    items: [
      { assetId: assetData[0].id, currentRatioBp: 3000 },
      { assetId: assetData[2].id, currentRatioBp: 7000 },
    ],
  },
];

// ─── Memo ──────────────────────────────────────────────────
const memoData: MemoResponse[] = [
  {
    id: faker.string.uuid(),
    createdAt: new Date('2026-02-01').toISOString(),
    importance: 'critical',
    title: '1분기 리밸런싱 메모',
    content: '삼성전자 비중을 줄이고 SPY로 이동할 것',
    evaluation: 'better',
    date: new Date('2026-02-01').toISOString(),
    memoType: 'actual',
    actualId: actualPortfolioData[0].id,
    tags: [tagData[0].id!, tagData[1].id!],
  },
  {
    id: faker.string.uuid(),
    createdAt: new Date('2026-02-05').toISOString(),
    importance: 'useful',
    title: 'AAPL 매수 기록',
    content: '실적 발표 전 매수',
    evaluation: 'good',
    date: new Date('2026-02-05').toISOString(),
    memoType: 'actual',
    actualId: actualPortfolioData[1].id,
    tags: [tagData[2].id!],
  },
  {
    id: faker.string.uuid(),
    createdAt: new Date('2026-02-10').toISOString(),
    importance: 'normal',
    title: '목표 포트폴리오 조정 계획',
    content: '2분기 목표 기준으로 ETF 비중 확대',
    evaluation: 'soso',
    date: new Date('2026-02-10').toISOString(),
    memoType: 'target',
    targetId: targetPortfolioData[0].id,
    tags: [tagData[1].id!],
  },
  {
    id: faker.string.uuid(),
    createdAt: new Date('2026-03-17').toISOString(),
    importance: 'normal',
    title: '이런 일이 있던 날',
    content: '먼가의 이벤트가 터졌어요. 마치 이란-미국 전쟁 마냥',
    // evaluation: 'soso',
    date: new Date('2026-03-10').toISOString(),
    memoType: 'event',
    tags: [tagData[1].id!],
  },
];

// ─── Profile ───────────────────────────────────────────────
const profileData: ProfileResponse = {
  id: faker.string.uuid(),
  email: 'mock@portracker.dev',
  nickname: 'MockUser',
  baseCurrencyId: 1,
  createdAt: new Date('2026-01-01').toISOString(),
  updatedAt: new Date('2026-03-01').toISOString(),
};

// ─── Statistic ─────────────────────────────────────────────
const statisticData: GroupStatisticResponse = {
  id: 1,
  statType: 'MONTHLY_INVESTMENT',
  period: '2026-02',
  sampleCount: 150,
  sumAmountBp: 50000000000,
  lastUpdatedAt: new Date('2026-03-01').toISOString(),
};

// ─── In-memory DB (Map 기반) ────────────────────────────────
export const mockRepositoryDB = {
  memos: new Map<string, MemoResponse>(memoData.map((d) => [d.id!, d])),
  actualPortfolios: new Map<string, ActualPortfolioResponse>(
    actualPortfolioData.map((d) => [d.id!, d])
  ),
  targetPortfolios: new Map<string, TargetPortfolioResponse>(
    targetPortfolioData.map((d) => [d.id!, d])
  ),
  assets: new Map<string, AssetResponse>(assetData.map((d) => [d.id!, d])),
  assetTypes: new Map<string, AssetTypeResponse>(
    assetTypeData.map((d) => [d.id!, d])
  ),
  currencies: new Map<string, CurrencyTypeResponse>(
    currencyData.map((d) => [d.id!, d])
  ),
  tags: new Map<string, TagResponse>(tagData.map((d) => [d.id!, d])),
  profile: profileData,
  statistic: statisticData,
};
