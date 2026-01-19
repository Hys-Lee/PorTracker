import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FormModalFrame from './FormModalFrame';

const meta: Meta<typeof FormModalFrame> = {
  component: FormModalFrame,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/FormModalFrame',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FormModalFrame>;

export const Primary: Story = {
  args: {
    children: (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        내용
      </div>
    ),
    onClose: () => {
      console.log('onClose클릭');
    },
  },
};
