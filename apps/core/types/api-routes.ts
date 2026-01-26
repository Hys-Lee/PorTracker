import {
  ActualForm,
  ActualPortfolio,
  RelatedMemo,
} from '@core/schemas/features/portfolios/portfolios.schema';
import { AssetInfo } from '@core/schemas/domains/asset.schema';

type Dynamic = string;

export interface ApiRoutes {
  '/api/assets:Asset': AssetInfo[];
  '/api/portfolios/actuals': ActualPortfolio[];
  '/api/portfolios/actuals/:actualId': ActualForm;
  '/api/memos/related-memos/:memoId': RelatedMemo;
}
