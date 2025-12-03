const defaultMemos = [
  {
    id: 0,
    date: new Date('2025-02-01'),
    transactionType: 'allocation',
    title: '메모 제목1',
    asset: '선택자산없음',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 1,
    date: new Date('2025-02-02'),
    transactionType: 'allocation',
    title: '메모 제2',
    asset: '선택자산없음',
    content: `얘는 본문이 다르지`,
  },
  {
    id: 2,
    date: new Date('2025-02-03'),
    transactionType: 'allocation',
    title: '메모 제3목',
    asset: '선택자산없음',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 3,
    date: new Date('2025-02-04'),
    transactionType: 'allocation',
    title: '메모 제목4',
    asset: '선택자산없음',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 4,
    date: new Date('2025-02-05'),
    transactionType: 'allocation',
    title: '메모 제목5',
    asset: '선택자산없음',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 5,
    date: new Date('2025-02-06'),
    transactionType: 'allocation',
    title: '메모 제목6',
    asset: '선택자산없음',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 6,
    date: new Date('2025-02-01'),
    transactionType: 'allocation',
    title: '메모 제목7',
    asset: '선택자산없음',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 7,
    date: new Date('2025-02-01'),
    transactionType: 'allocation',
    title: '메모 제목8',
    asset: '뭔가 선택자산',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 8,
    date: new Date('2025-02-01'),
    transactionType: 'allocation',
    title: '메모 제목9',
    asset: '뭔가 선택자산',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 9,
    date: new Date('2025-02-01'),
    transactionType: 'allocation',
    title: '메모 제목10',
    asset: 'ㅁㄴㅇㄻㄻ',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
  {
    id: 10,
    date: new Date('2025-02-01'),
    transactionType: 'allocation',
    title: '메모 제목11',
    asset: '나도이제모르겠다',
    content: `본문입니다.
  줄바꿈도 되는지는 모르겠네요
  하핳`,
  },
];

const getMemos = () => {
  return defaultMemos;
};
export default getMemos;
