import { MEMO_TYPE_VALUES } from '@core/constants';
import { PortfolioTypeValue } from '@core/types';

export const memoKeys = {
  recents: (id?: string, portfolioType?: PortfolioTypeValue) => [
    'memos',
    'recents',
    portfolioType ?? 'none',
    id,
    //??      MEMO_TYPE_VALUES.find((type) => type !== 'actual' && type !== 'target'),
  ],
};
