import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormArea from './FormArea';

const meta: Meta<typeof FormArea> = {
  component: FormArea,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/FormArea',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FormArea>;

export const Primary: Story = {
  args: {
    assetsInfo: [],
    currenciesInfo: [
      { value: 'c1', text: <div>c1</div> },
      { value: 'c2', text: <div>c2</div> },
    ],
    localCurrencyValue: 'c1',
    formAction: () => {
      console.log('폼 액션');
    },
  },
};
