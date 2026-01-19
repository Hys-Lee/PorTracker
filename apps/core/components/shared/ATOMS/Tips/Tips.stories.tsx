import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tips from './Tips';

const meta: Meta<typeof Tips> = {
  component: Tips,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/Tips',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Tips>;

export const Primary: Story = {
  args: { content: '내용' },
};
export const LargeContent: Story = {
  args: {
    content: (
      <div>
        <h2>도움말</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{`야호야호
 야호야호`}</p>
      </div>
    ),
  },
};
