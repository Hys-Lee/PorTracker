import { type Meta, type StoryObj } from '@storybook/nextjs-vite';
import Separator from './Separator';

const meta = {
  component: Separator,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Separator',
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof Separator>;

export const Primary = {
  args: { color: 'normal' },
  argTypes: {
    color: {
      description: '색상 변경',
      control: {
        type: 'select',
        options: ['week', 'normal', 'strong'],
      },
    },
  },
} satisfies Story;
