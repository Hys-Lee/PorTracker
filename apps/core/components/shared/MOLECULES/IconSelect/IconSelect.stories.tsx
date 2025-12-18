import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import IconSelect from './IconSelect';

const meta: Meta<typeof IconSelect> = {
  component: IconSelect,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Shared/IconSelect',
  tags: ['autodocs'],
  argTypes: {
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

type Story = StoryObj<typeof IconSelect>;

export const Primary: Story = {
  args: {
    items: [
      {
        icon: (
          <div
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'gray',
              borderRadius: '12px',
            }}
          >
            1
          </div>
        ),
        text: '적당히 긴 이름',
        value: '1',
      },
      { icon: <>2</>, text: '2', value: '2' },
      { icon: <>3</>, text: '3', value: '3' },
    ],
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
};
