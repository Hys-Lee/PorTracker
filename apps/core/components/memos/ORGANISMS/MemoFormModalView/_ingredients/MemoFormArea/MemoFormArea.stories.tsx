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
    importanceInfo: ['critical', 'normal', 'useful'],
  },
};
