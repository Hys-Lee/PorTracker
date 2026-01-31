import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/TextArea',
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

type Story = StoryObj<typeof TextArea>;

export const Primary: Story = {
  args: {
    // value: '적당히 기본 텍스트들. \n여러 줄을\n입력할 수 있습니다.',
    rows: 6,
  },
  // argTypes: {
  //   value: { control: 'text', options: [''] },
  // },
};
