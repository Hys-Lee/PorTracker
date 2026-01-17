import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoPill from './MemoPill';
import { colors } from '@core/tokens/colors.stylex';

const meta: Meta<typeof MemoPill> = {
  component: MemoPill,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/MemoPill',
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: colors.bgNormal,
        }}
      >
        <MemoPill {...args} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof MemoPill>;

export const Primary: Story = {
  args: {},
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['critical', 'useful', 'normal'],
    },
  },
};
