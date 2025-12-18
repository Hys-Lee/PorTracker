import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tab from './Tab';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';

const meta: Meta<typeof Tab> = {
  component: Tab,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/Tab',
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => {
    return (
      <div style={{ height: '500px' }}>
        <Tab {...args} />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Primary: Story = {
  args: {
    tabsInfo: [
      { name: '당시 자산 변동', content: <div>일</div> },
      {
        name: '메모 내용',
        content: (
          <div style={{ background: 'gray', width: '200px', height: '500px' }}>
            이
          </div>
        ),
      },
    ] as const,
    initTab: '당시 자산 변동',
  },
};

const itemStyle = stylex.create({
  inject: {
    fontSize: '30px',
    fontWeight: '900',
  },
});
const contentStyle = stylex.create({
  inject: {
    backgroundColor: colors.secondary,
  },
});

export const ExternalStyleInjection: Story = {
  args: {
    ...Primary.args,
    tabItemStyleX: itemStyle.inject,
    tabContentStyleX: contentStyle.inject,
  },
};
