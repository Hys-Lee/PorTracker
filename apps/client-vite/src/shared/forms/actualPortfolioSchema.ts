import z from 'zod';

// const actualPortfolioFullSchema = z.object({
//   asset: z.string().nonempty(),
//   date: z.date(),
//   transactionType: z.enum(['allocation', 'withdrawal']),
//   price: z.number().positive(),
//   currency: z.enum(['dollar', 'won']),
//   exchangeRate: z.number().default(1),
//   shares: z.number().positive(), // 주식 수량
// });

const actualPortfolioMinSchema = z.object({
  price: z.coerce
    .number({ invalid_type_error: '형식이 다릅니다' })
    .positive({ message: '양수여야 합니다' })
    .lt(1000000000, '수가 너무 큽니다'),
  currency: z.enum(['dollar', 'won']),
  exchangeRate: z.coerce
    .number({ invalid_type_error: '형식이 다릅니다' })
    .positive({ message: '양수여야 합니다' })
    .lt(1000000000, '수가 너무 큽니다')
    .default(1),
  shares: z.coerce
    .number({ invalid_type_error: '형식이 다릅니다' })
    .positive({ message: '양수여야 합니다' })
    .lt(1000000000, '수가 너무 큽니다'), // 주식 수량
});

export {
  //  actualPortfolioFullSchema,
  actualPortfolioMinSchema,
};
