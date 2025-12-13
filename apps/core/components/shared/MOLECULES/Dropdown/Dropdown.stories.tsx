import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Dropdown from './Dropdown';
import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Dropdown',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description:
        '제어방식으로 사용할 때. 빈문자열("")라면 placeholder가 나타남',
    },
    onValueChange: {
      description: '제어방식으로 사용할 때',
    },
    name: {
      control: 'text',
      description: 'form에 사용될 name',
    },
    form: {
      control: 'text',
      description: '연결할 form id값',
    },
    required: {
      control: 'boolean',
      description: 'form에서의 required',
    },
    disabled: {
      control: 'boolean',
      description: 'form에서의 disabled',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const activeStyle = stylex.create({
  active: {
    backgroundColor: {
      default: `rgb(from ${colors.primary} r g b / 0.5)`,
      ':hover': `rgb(from ${colors.primary} r g b / 0.7)`,
    },
  },
});
export const Primary: Story = {
  args: { placeholder: '플레이스홀더' },
  argTypes: {
    disabled: {
      table: {
        disable: true,
      },
    },
    form: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    required: {
      table: {
        disable: true,
      },
    },
  },

  render: (args) => {
    const items = [
      { text: '야호', value: 'yaho' },
      { text: 'dldldldldl', value: 'dldldldldl' },
    ];
    const [idx, setIdx] = useState(-1);
    const finalValue = idx === -1 ? '' : items[idx].value;
    return (
      <Dropdown
        {...args}
        triggerStylex={finalValue !== '' ? activeStyle.active : undefined}
        items={items}
        selectedText={
          idx === -1 ? undefined : (
            <>
              <span>ReactNode</span>
              {'결과: ' + items[idx].text}
            </>
          )
        }
        value={finalValue}
        onValueChange={(newValue) => {
          const idx = items.reduce((acc, cur, idx) => {
            if (cur.value === newValue) return idx;
            else return acc;
          }, -1);
          if (idx != -1) {
            setIdx(idx);
          }
        }}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    ...Primary.args,
    items: [
      { text: '야호', value: 'yaho' },
      { text: 'dldldldldl', value: 'dldldldldl' },
    ],
  },
  argTypes: {
    name: {
      control: 'text',
    },
    form: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    value: {
      table: {
        disable: true,
      },
    },
    onValueChange: {
      table: {
        disable: true,
      },
    },
  },
};
