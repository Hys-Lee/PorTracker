import {
  MEMO_EVALUATION_VALUES,
  MEMO_IMPORTANCE_VALUES,
  MEMO_TYPE_VALUES,
} from '@core/constants';
import z from 'zod';

export const memoOriginSchema = z.object({
  id: z.string().uuid('유효한 id가 아닙니다'),
  importance: z.enum([...MEMO_IMPORTANCE_VALUES], {
    message: '유효한 중요도를 선택하세요',
  }),
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string(),
  tags: z.preprocess((val) => {
    if (typeof val === 'string') return val.split(',').filter((str) => !!str); // 빈 문자열 지우기
    return val;
  }, z.array(z.string().min(1, '태그 명을 작성하세요'))),
  evaluation: z.enum([...MEMO_EVALUATION_VALUES], {
    message: '유효한 평가를 선택해주세요',
  }),
  date: z
    .string()
    .datetime({ message: '유효한 날짜가 아닙니다' })
    .transform((str) => new Date(str)),
  memoType: z.enum([...MEMO_TYPE_VALUES]),
  // linkedInfo?: DropdownItem<>;
});
