import z from 'zod';

const commonChartDataSchema = z.object({
  asset: z.string().nonempty().max(15),
  transactionType: z.enum(['allocation', 'withdrawal']),
  date: z.date(),
});

export { commonChartDataSchema };
