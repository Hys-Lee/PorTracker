import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StoryTemplate from './StoryTemplate';

const meta: Meta<typeof StoryTemplate> = {
  component: StoryTemplate,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'Tmp/StoryTemplate',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof StoryTemplate>;

export const Primary: Story = {
  args: {},
};
