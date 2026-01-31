import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Filter from './Filter';

const meta: Meta<typeof Filter> = {
  component: Filter,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Memos/Filter',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Primary: Story = {
  args: {
    currencyInfo: [
      { text: 'USD', value: 'usd' },
      { text: 'KRW', value: 'krw' },
    ],
    memoTypeInfo: [
      { text: 'Target', value: 'target' },
      { text: 'Actual', value: 'actual' },
      { text: 'Event', value: 'event' },
    ],
  },
};

export const WithInit: Story = {
  args: {
    ...Primary.args,
    init: {
      // assets: 'a1,a2',
      startDate: '2023-01-01T00:00:00.000Z',
      endDate: '2023-12-31T00:00:00.000Z',
      memoType: 'actual',
      currency: 'usd',
    },
  },
};
