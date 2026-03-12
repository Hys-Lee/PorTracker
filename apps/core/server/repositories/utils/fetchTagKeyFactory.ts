export const fetchTagKeyFactory = {
  currencies: (userId?: string) => [
    ...(userId ? ['user', userId] : []),
    'currencies',
  ],
  assets: (userId?: string) => [...(userId ? ['user', userId] : []), 'assets'],
  assetTypes: (userId?: string) => [
    ...(userId ? ['user', userId] : []),
    'assetTypes',
  ],
};
