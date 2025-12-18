import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';

const meta: Meta<typeof Button> = {
  component: Button,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Button',
  tags: ['autodocs'],
  argTypes: {
    buttonStylex: {
      description: 'stylex 넣기',
    },
    variant: {
      description: '배경위주 or 외각선위주',
    },
    rounded: {
      description: '둥글 정도',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const buttonStyles = stylex.create({
  base: {
    backgroundColor: colors.primary,
    boxShadow: {
      default: 'inset 0 0 0 1px rgb(from var(--jade-p) r g b / 1)',
      ':hover': 'inset 0 0 0 1px rgb(from var(--jade-t) r g b / 1)',
    },
    borderRadius: '24px',
    width: '300px',
  },
});

export const Primary: Story = {
  args: { children: <>맘대로 꾸미기</>, buttonStylex: buttonStyles.base },
};
export const Solid: Story = {
  args: { children: <>손익 분석</>, variant: 'solid', rounded: 'normal' },
};
export const Outlined: Story = {
  args: { children: <>손익 분석</>, variant: 'outlined', rounded: 'normal' },
};
export const RoundedNormal: Story = {
  args: { children: <>손익 분석</>, rounded: 'normal' },
};
export const RoundedHuge: Story = {
  args: { children: <>손익 분석</>, rounded: 'huge' },
};
