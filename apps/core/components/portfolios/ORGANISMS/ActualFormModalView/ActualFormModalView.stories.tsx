import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActualFormModalView from './ActualFormModalView';

const meta: Meta<typeof ActualFormModalView> = {
  component: ActualFormModalView,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/ActualFormModalView',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ActualFormModalView>;

export const Primary: Story = {
  args: {},
};
