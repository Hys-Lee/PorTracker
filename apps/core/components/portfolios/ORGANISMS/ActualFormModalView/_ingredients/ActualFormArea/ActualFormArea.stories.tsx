import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActualFormArea from './ActualFormArea';

const meta: Meta<typeof ActualFormArea> = {
  component: ActualFormArea,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/ActualFormArea',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ActualFormArea>;

export const Primary: Story = {
  args: {
    assetsInfo: [],
    currenciesInfo: [
      { value: 'c1', text: <div>c1</div> },
      { value: 'c2', text: <div>c2</div> },
    ],
    transactionTypeInfo: [],
    localCurrencyValue: 'c1',
    formAction: async () => {
      console.log('폼 액션');
    },
  },
};
