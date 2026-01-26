import { v4 as uuidv4 } from 'uuid';
import {
  CurrencyValue,
  MemoEvaluationValue,
  MemoImportanceValue,
  TransactionValue,
} from '../../types';
import { TRANSACTION_MAP } from '@core/constants';
import { mockDB as SharedDB } from './sharedDB';

// type AssetInfo = z.infer<typeof assetInfoSchema>;
// type Portfolio = z.infer<typeof actualPortfolioSchema>;

const initialAssets = [
  {
    id: uuidv4(),
    createdAt: new Date('2025-12-26').toISOString(),
    name: '자산1',
    type: '자산타입1',
  },
  {
    id: uuidv4(),
    createdAt: new Date('2025-12-27').toISOString(),
    name: '자산2',
    type: '자산타입2',
    description: '부가설명',
  },
];

const assetsTable = new Map(initialAssets.map((data) => [data.id, data]));

const initialCurrency = [{ id: uuidv4(), value: 'usd' as CurrencyValue }];

const currencyTable = new Map(initialCurrency.map((data) => [data.id, data]));

// const linkedId = {
//   memo: uuidv4(),
//   portfolio: uuidv4(),
// };
const linkedId = SharedDB.linkList[0];

const initialActualPortfolioInfo = [
  {
    id: linkedId.portfolio,
    accumulatedRatio: 37,
    changesRatio: 4,
    assetId: initialAssets[0].id,
    assetName: initialAssets[0].name,
    assetType: initialAssets[0].type,
    createdAt: new Date('2025-12-27 10:00:00').toISOString(),
    currency: initialCurrency[0].value,
    date: new Date('2025-12-27').toISOString(),
    transactionType: 'allocation' as TransactionValue,
    // value: 1_234_567,
    price: 12345678910,
    amount: 10,
    exchangeRate: 1,
    assetDescription: null,
    linkedMemo: linkedId.memo,
  },
  {
    id: uuidv4(),
    accumulatedRatio: 37,
    changesRatio: 4,
    assetId: initialAssets[0].id,
    assetName: initialAssets[0].name,
    assetType: initialAssets[0].type,
    createdAt: new Date('2025-12-27 11:00:00').toISOString(),
    currency: initialCurrency[0].value,
    date: new Date('2025-12-27').toISOString(),
    transactionType: 'withdrawal' as TransactionValue,
    // value: 1_234_567,
    price: 123,
    amount: 1,
    exchangeRate: 1,
    assetDescription: null,
    linkedMemo: null,
  },
  {
    id: uuidv4(),
    accumulatedRatio: 12,
    changesRatio: 40,
    assetId: initialAssets[1].id,
    assetName: initialAssets[1].name,
    assetType: initialAssets[1].type,
    createdAt: new Date('2025-12-27').toISOString(),
    currency: initialCurrency[0].value,
    date: new Date('2025-12-26').toISOString(),
    transactionType: 'withdrawal' as TransactionValue,
    // value: 1_234_567,
    price: 123456,
    amount: 1,
    exchangeRate: 123,
    assetDescription: initialAssets[1].description,
    linkedMemo: null,
  },
];

const actualPortfolioTable = new Map(
  initialActualPortfolioInfo.map((data) => [data.id, data])
);

// const initialMemo = [
//   {
//     id: linkedId.memo,
//     importance: 'useful' as MemoImportanceValue,
//     title: '메모 제목',
//     content:
//       '메모 내용 \n대충 메모 내용\n길어져랑\n길어져랑\n길어져랑\n하나만더',
//     tags: ['#태그1', '태그2', 'tag3', '#Tag4'],
//     evaluation: 'good' as MemoEvaluationValue,
//     type: 'actual',
//     linkedPortfolio: linkedId.portfolio,
//   },
// ];

// const memoTable = new Map(initialMemo.map((data) => [data.id, data]));

const transactionTypes = [
  {
    value: 'allocation' as TransactionValue,
    text: TRANSACTION_MAP['allocation'],
  },
  {
    value: 'withdrawal' as TransactionValue,
    text: TRANSACTION_MAP['withdrawal'],
  },
  {
    value: 'dividend' as TransactionValue,
    text: TRANSACTION_MAP['dividend'],
  },
  {
    value: 'fee' as TransactionValue,
    text: TRANSACTION_MAP['fee'],
  },
];

const transactionTypesTable = new Map(
  transactionTypes.map((data) => [data.value, data])
);

export const mockDB = {
  assets: assetsTable,
  actuals: actualPortfolioTable,
  // memos: memoTable,
  transactionTypes: transactionTypesTable,
};
