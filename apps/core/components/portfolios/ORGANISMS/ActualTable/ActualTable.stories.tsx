import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActualTable from './ActualTable';

const meta: Meta<typeof ActualTable> = {
  component: ActualTable,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/ActualTable',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ActualTable>;

export const Primary: Story = {
  args: {
    actualData: [
      {
        assetInfo: { name: '자산1', description: '이런 자산입니다' },
        categoryInfo: { name: '카1', color: 1 },
        changeInfo: { changes: -11, acc: 33 },
        currency: 'krw',
        date: new Date(),
        id: '45132984651984561',
        transactionType: 'allocation',
        value: 98465132,
      },
      {
        assetInfo: { name: '자산1', description: '이런 자산입니다' },
        categoryInfo: { name: '카1', color: 3 },
        changeInfo: { changes: -11, acc: 33 },
        currency: 'krw',
        date: new Date(),
        id: '45132984651984561',
        transactionType: 'withdrawal',
        value: 98465132,
      },
    ],
  },
};
