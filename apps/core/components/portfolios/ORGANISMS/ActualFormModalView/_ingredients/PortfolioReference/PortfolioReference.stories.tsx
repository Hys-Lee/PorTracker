import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PortfolioReference from './PortfolioReference';
import { colors } from '@core/tokens/colors.stylex';
import { Provider } from 'jotai';

const meta: Meta<typeof PortfolioReference> = {
  component: PortfolioReference,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/PortfolioReference',
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.bgNormal,
          padding: '16px',
        }}
      >
        <Provider>
          <PortfolioReference {...args} />
        </Provider>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof PortfolioReference>;

export const Primary: Story = {
  args: {
    recentsInfo: [
      {
        assetId: 'gg',
        recents: [
          {
            amount: 1,
            date: new Date(),
            exchangeRateInfo: { unit: 'KRW/USD', value: 1234 },
            id: 'bnmbnmbnm',
            price: 4567,
            transactionnTypeInfo: { text: 'Allocation', value: 'allocation' },
          },
          {
            amount: 1,
            date: new Date(),
            exchangeRateInfo: { unit: 'KRW/USD', value: 1234 },
            id: 'bnmbnmbnm',
            price: 4567,
            transactionnTypeInfo: { text: 'Allocation', value: 'allocation' },
          },
          {
            amount: 1,
            date: new Date(),
            exchangeRateInfo: { unit: 'KRW/USD', value: 1234 },
            id: 'bnmbnmbnm',
            price: 4567,
            transactionnTypeInfo: { text: 'Allocation', value: 'allocation' },
          },
          {
            amount: 1,
            date: new Date(),
            exchangeRateInfo: { unit: 'KRW/USD', value: 1234 },
            id: 'bnmbnmbnm',
            price: 4567,
            transactionnTypeInfo: { text: 'Allocation', value: 'allocation' },
          },
          {
            amount: 1,
            date: new Date(),
            exchangeRateInfo: { unit: 'KRW/USD', value: 1234 },
            id: 'bnmbnmbnm',
            price: 4567,
            transactionnTypeInfo: { text: 'Allocation', value: 'allocation' },
          },
          {
            amount: 1,
            date: new Date(),
            exchangeRateInfo: { unit: 'KRW/USD', value: 1234 },
            id: 'bnmbnmbnm',
            price: 4567,
            transactionnTypeInfo: { text: 'Allocation', value: 'allocation' },
          },
        ],
      },
    ],
  },
};
