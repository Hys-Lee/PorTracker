import z from 'zod';

// const memoFullSchema = z.object({
//   title: z.string().nonempty(),
//   asset: z.string().nonempty(),
//   transactionType: z.enum(['allocation', 'withdrawal']),
//   date: z.date(),
//   content: z.string(),
//   tags: z.array(z.string()),
//   customTemplate: z.number(), // 커스텀 텤플릿. 레인지가 있으니까 넘버일 듯?ㄴㄴ
// });

const memoMinSchema = z.object({
  title: z.string().max(20).nonempty(),
  content: z.string().max(1000),
  tags: z.array(z.string()).max(15),
  customTemplate: z.number().optional(), // 커스텀 텤플릿. 레인지가 있으니까 넘버일 듯?ㄴㄴ
});

export {
  memoMinSchema,
  // memoFullSchema
};
