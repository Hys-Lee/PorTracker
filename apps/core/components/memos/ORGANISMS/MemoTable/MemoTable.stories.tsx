import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoTable from './MemoTable';

const meta: Meta<typeof MemoTable> = {
  component: MemoTable,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Memos/MemoTable',
  parameters: {
    api: {
      // msw vs. Mock Services 직접 사용
      directMock: false,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MemoTable>;

export const Primary: Story = {
  args: {
    memoData: [
      {
        content:
          '대충 콘텐츠라고 함\n야호야호\n만\n약\n에\n엄\n청\n길\n다\n면\n!',
        date: new Date('2026-01-20'),
        importance: 'critical',
        title: '제목제목',
        type: 'target',
        tags: ['태그1', '태그2'],
        memoId: '1',
      },
      {
        content: '대충 콘텐츠라고 함\n야호야호',
        date: new Date('2026-01-20'),
        importance: 'critical',
        title: '제목제목',
        type: 'target',
        tags: ['태그1', '태그2'],
        memoId: '1',
      },
      {
        content: '대충 콘텐츠라고 함\n야호야호',
        date: new Date('2026-01-20'),
        importance: 'critical',
        title: '제목제목',
        type: 'target',
        tags: ['태그1', '태그2'],
        memoId: '2',
      },
      {
        content: '대충 콘텐츠라고 함\n야호야호',
        date: new Date('2026-01-20'),
        importance: 'critical',
        title: '제목제목',
        type: 'target',
        tags: ['태그1', '태그2'],
        memoId: '3',
      },
      {
        content: '대충 콘텐츠라고 함\n야호야호',
        date: new Date('2026-01-20'),
        importance: 'critical',
        title: '제목제목',
        type: 'target',
        tags: ['태그1', '태그2'],
        memoId: '4',
      },
    ],
    modalParam: 'memoId',
  },
};
export const LongTexts: Story = {
  args: {
    memoData: [
      {
        content:
          '대충 콘텐츠라고 함\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호',
        date: new Date('2026-01-20'),
        importance: 'critical',
        title:
          '제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목',
        type: 'actual',
        tags: ['태그1', '태그2', '엄청긴태그3', '태그4', '태그5', '태그6'],
        memoId: '1',
      },
    ],
    modalParam: 'memoId',
  },
};
export const UsefulNonlinked: Story = {
  args: {
    memoData: [
      {
        content:
          '대충 콘텐츠라고 함\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호\n야호야호',
        date: new Date('2026-01-20'),
        importance: 'useful',
        title:
          '제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목',
        type: 'event',
        tags: ['태그1', '태그2', '엄청긴태그3', '태그4', '태그5', '태그6'],
        memoId: '1',
      },
    ],
    modalParam: 'memoId',
  },
};
