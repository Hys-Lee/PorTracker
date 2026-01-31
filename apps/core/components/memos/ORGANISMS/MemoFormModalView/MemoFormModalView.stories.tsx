import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoFormModalView from './MemoFormModalView';

const meta: Meta<typeof MemoFormModalView> = {
  component: MemoFormModalView,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Memos/MemoFormModalView',
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

type Story = StoryObj<typeof MemoFormModalView>;

export const Primary: Story = {
  args: {
    formArea: <>폼영역</>,
    memoReference: <>메모영역</>,
    portfolioReference: <>포폴영역</>,
  },
};
