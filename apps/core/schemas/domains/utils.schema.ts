import z from 'zod';

export const datetimeRequestSchema = z
  .union([z.date(), z.string()])
  .transform((data) => {
    const date = new Date(data);
    return date.toISOString();
  });

// export const datetimeResponseSchema = z.coerce.date();
export const datetimeResponseSchema = z.preprocess((data) => {
  if (typeof data === 'string') return new Date(data);
  return data;
}, z.date());
