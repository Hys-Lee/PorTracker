import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SegmentControl from './SegmentControl';

const meta: Meta<typeof SegmentControl> = {
  component: SegmentControl,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/SegmentControl',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SegmentControl>;

export const Primary: Story = {
  args: {
    items: [
      { value: '1', text: <div>'첫번째'</div> },
      { value: '2', text: <div>'두번째'</div> },
      { value: '3', text: <div>'세번째'</div> },
    ],
  },
};
