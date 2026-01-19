import {
  ActualForm,
  ActualPortfolio,
  AssetInfo,
  RelatedMemo,
} from '@core/schemas/portfolios.schema';

type Dynamic = string;

export interface ApiRoutes {
  '/api/assets:Asset': AssetInfo[];
  '/api/portfolios/actuals': ActualPortfolio[];
  '/api/portfolios/actuals/:actualId': ActualForm;
  '/api/memos/related-memos/:memoId': RelatedMemo;
}
