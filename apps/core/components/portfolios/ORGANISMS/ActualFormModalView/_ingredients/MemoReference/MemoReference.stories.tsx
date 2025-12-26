import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoReference from './MemoReference';

const meta: Meta<typeof MemoReference> = {
  component: MemoReference,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/MemoReference',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MemoReference>;

export const Primary: Story = {
  args: {
    content: '야호 야야호',
    evaluation: 'good',
    importance: 'normal',
    tags: ['태그1'],
    title: '타이틀',
  },
};
