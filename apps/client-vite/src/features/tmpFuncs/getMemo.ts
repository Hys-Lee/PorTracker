const defaultMemoData = {
  title: '메모 제목',
  portfolioType: 'real' as 'real' | 'config',
  //   config: z.string().nonempty().optional(),
  asset: '선택자산없음',
  transactionType: 'allocation' as 'allocation' | 'withdrawal',
  date: new Date('2025-02-01'),
  content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  tags: ['태그 내용1', '태그 내용1'],
  customTemplate: 3, // 별점으로 쳤을 때.
};
const anotherMemo = {
  id: 1,
  date: new Date('2025-02-02'),
  portfolioType: 'config' as 'real' | 'config',
  title: '메모 제2',
  asset: '선택자산없음',
  content: `얘는 본문이 다르지`,

  transactionType: 'allocation' as 'allocation' | 'withdrawal',

  tags: ['태그 내용2', '태그 내용2'],
  customTemplate: 4.5, // 별점으로 쳤을 때.
};

const getMemo = (id?: number) => {
  return defaultMemoData;
};
export default getMemo;

export const getAnotherMemo = () => {
  return anotherMemo;
};
