import { MEMO_TYPE_VALUES } from '@core/constants';

export const memoKeys = {
  recents: (id?: string) => [
    'memos',
    'recents',
    id ??
      MEMO_TYPE_VALUES.find((type) => type !== 'actual' && type !== 'target'),
  ],
};
