interface RealPortfolioOriginal {
  asset_id: number;
  currency: 'dollar' | 'won';
  date: string;
  exchange_rate: number;
  id: number;
  price: number;
  shares: number;
  transaction_type: 'allocation' | 'withdrawal';
  linked_memo_id: number;
}

type RealPortfolioWithAssetInfo = RealPortfolioOriginal & {
  asset: { name: string };
};

export { RealPortfolioOriginal, RealPortfolioWithAssetInfo };
