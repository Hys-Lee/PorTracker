import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PortfolioReference from './PortfolioReference';

const meta: Meta<typeof PortfolioReference> = {
  component: PortfolioReference,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/PortfolioReference',
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

type Story = StoryObj<typeof PortfolioReference>;

export const Primary: Story = {
  args: {
    init: { portfolioType: 'none' },
  },
};

export const ActualReference: Story = {
  args: {
    init: {
      amount: 1,
      assetName: '자산1',
      assetType: '타입1',
      currency: 'usd',
      date: new Date('2026-01-23'),
      exchangeRate: 123,
      price: 456,
      transactionType: 'allocation',
      portfolioType: 'actual',
      accumulatedRatio: 5678,
      accumulatedValue: 567567,
      changesRatio: 1234,
      value: 123123,
      createdAt: new Date('2026-01-24'),
      id: 'actual',
      assetDescription: '설명설명',
    },
  },
  // argTypes: {
  //   type: {
  //     control: 'radio',
  //     options: ['actual', 'target'],
  //   },
  //   amount: 1,
  //   assetName: '자산1',
  //   assetType: '타입1',
  //   currency: 'usd',
  //   date: new Date('2026-01-23'),
  //   exchangeRate: 123,
  //   price: 456,
  //   transactionType: 'allocation',
  //   type: 'actual',
  //   assetChangeInfo: { ratioBfs: 1234, value: 123123 },
  //   portfolioWeightInfo: { ratioBfs: 5678, value: 567567 },
  // },
};

export const TargetReference: Story = {
  args: {
    init: {
      portfolioType: 'target',
      id: 'target',
      name: '포폴 이름',
      assetsList: [
        {
          assetName: '추가자산',
          assetType: '타입1',
          currentRatioBps: 1400,
          ratioDeltaBps: 1400,
        },
        {
          assetName: '제거자산',
          assetType: '타입2',
          currentRatioBps: 0,
          ratioDeltaBps: -2400,
        },
        {
          assetName: '변동자산',
          assetType: '타입3',
          currentRatioBps: 6000,
          ratioDeltaBps: 2400,
        },
        {
          assetName: '부동자산',
          assetType: '타입4',
          currentRatioBps: 1600,
          ratioDeltaBps: 0,
        },
      ],
    },
  },
};
