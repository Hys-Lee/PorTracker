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
    multi: { control: 'boolean', description: 'Multi-Selection 여부' },
    items: { description: '드랍다운 아이템 정보' },
    triggerStylex: { description: '외부에서 트리거 스타일 주입 가능' },
    selectedText: {
      description: '외부에서 트리거에 표시될 ReactNode 주입 가능',
    },
    placeholder: { description: '플레이스홀더' },

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
    value: {
      // control: 'text',
      control: {
        type: 'object',
      },
      description:
        '제어방식으로 사용할 때. 빈문자열("")라면 placeholder가 나타남',
    },
    onValueChange: {
      description: '제어방식으로 사용할 때',
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
    const [selected, setSelected] = useState<typeof items | undefined>(
      undefined
    );
    return (
      <Dropdown
        {...args}
        triggerStylex={selected ? activeStyle.active : undefined}
        items={items}
        selectedText={
          selected?.length && selected.length > 0 ? (
            <>
              <span>ReactNode</span>
              {'결과: ' + selected.map(({ text }) => text)}
            </>
          ) : undefined
        }
        // value={selected?.[0]?.value}
        value={selected}
        onValueChange={(newValue) => {
          setSelected(newValue);
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

export const MultiSelection: Story = {
  args: {},
  render: (args) => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({ text: `${i}`, value: `${i}` });
    }
    return <Dropdown multi={true} items={items} />;
  },
};
export const Scroll: Story = {
  args: {},
  render: (args) => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({ text: `${i}`, value: `${i}` });
    }
    return <Dropdown multi={false} items={items} />;
  },
};
/**  */

const items: { text: string; value: string }[] = [];
for (let i = 0; i < 1_000; i++) {
  items.push({ text: `${i}`, value: `${i}` });
}
export const TooMany: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '가상화를 통한 최적화 필요... Radix의 DropdownMenu기반이라..',
      },
    },
  },
  render: (args) => {
    return <Dropdown multi={true} items={items} />;
  },
};
