import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoFormArea from './MemoFormArea';

const meta: Meta<typeof MemoFormArea> = {
  component: MemoFormArea,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/MemoFormArea',
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

type Story = StoryObj<typeof MemoFormArea>;

export const Primary: Story = {
  args: {
    tagInfo: ['111'],
    // importanceInfo: ['critical', 'normal', 'useful'],
    tmpPortfoliosInfo: [
      {
        accumulatedRatio: 123,
        assetName: '자산',
        assetType: '자산타입',
        changesRatio: 456,
        createdAt: new Date('2026-01-24'),
        currency: 'usd',
        date: new Date('2026-01-24'),
        id: '1',
        portfolioType: 'actual',
        transactionType: 'fee',
        value: 456789,
        assetDescription: '설명',
        amount: 12,
        exchangeRate: 456,
        price: 456789 / 456 / 12,
        accumulatedValue: 99999999999,
      },
    ],
  },
};
