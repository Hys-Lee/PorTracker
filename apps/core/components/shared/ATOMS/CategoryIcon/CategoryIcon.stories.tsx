import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CategoryIcon from './CategoryIcon';
import * as stylex from '@stylexjs/stylex';

const meta: Meta<typeof CategoryIcon> = {
  component: CategoryIcon,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/CategoryIcon',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CategoryIcon>;

export const Primary: Story = {
  args: { text: 'Property' },
};

const iconStyles = stylex.create({
  base: {
    color: 'black',
    backgroundColor: 'gray',
  },
});

export const StyleInjection: Story = {
  args: { text: 'Property', iconStylex: iconStyles.base },
};
