import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TagPill from './TagPill';

const meta: Meta<typeof TagPill> = {
  component: TagPill,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/TagPill',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TagPill>;

export const Primary: Story = {
  args: { content: '#대충태그내용' },
};
