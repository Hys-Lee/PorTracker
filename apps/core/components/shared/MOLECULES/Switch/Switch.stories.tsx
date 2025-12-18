import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Switch from './Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  component: Switch,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/Switch',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    items: [
      { text: <div>일</div>, value: '1' },
      { text: <div>이</div>, value: '2' },
    ],
  },
};

export const Controlled: Story = {
  args: { ...Primary.args },
  render: (args) => {
    const [selected, setSelected] = useState(args.items[0]);
    return (
      <>
        <Switch
          {...args}
          selected={selected}
          onChange={(data) => {
            setSelected(data);
            console.log(`selected value:  ${data.value}`);
          }}
        />
      </>
    );
  },
};
