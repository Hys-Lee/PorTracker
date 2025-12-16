import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/DatePicker',
  tags: ['autodocs'],
  argTypes: {
    range: {
      description: '범위형 여부 지정',
    },
    name: { description: 'form 에서 사용될 name' },
    form: { description: '연결할 form id' },
    disabled: { description: 'disabled 여부' },
    required: { description: 'required 여부' },
    value: { description: 'range에 따라 타입이 바뀜' },
    defaultValue: { description: 'range에 따라 타입이 바뀜' },
    onChange: { description: 'range에 따라 타입이 바뀜' },
    placeholder: { description: 'range에 따라 타입이 바뀜' },
    format: { description: '기본은 YYYY.MM.DD' },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  args: { suffix: <div>Suffix</div>, prefix: <div>프리픽스</div> },
  argTypes: {
    range: {
      control: 'boolean',
    },
  },
};
