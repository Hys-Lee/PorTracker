const defaultActualData = {
  asset: '선택자산없음',
  date: new Date('2025-02-01'),
  transactionType: 'allocation' as 'allocation' | 'withdrawal',
  price: 1000,
  currency: 'won' as 'won' | 'dollar',
  exchangeRate: 1400,
  shares: 2,
  profitType: 'average' as 'fifo' | 'average',
};
const anotherActual = {
  asset: '선택자산없음',
  date: new Date('2025-02-05'),
  transactionType: 'withdrawal' as 'allocation' | 'withdrawal',
  price: 123456,
  currency: 'dollar' as 'won' | 'dollar',
  exchangeRate: 1400,
  shares: 2,
  profitType: 'average' as 'fifo' | 'average',
};

const getActual = (id?: number) => {
  return defaultActualData;
};
export default getActual;

export const getAnotherActual = () => {
  return anotherActual;
};
