import { Meta, StoryObj } from '@storybook/react/*';

import ActionButton from './ActionButton';

const meta = {
  title: 'Shared/ATOMS/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  args: {
    // 기본값
    children: '액션 버튼',
  },
  argTypes: {
    children: {
      description:
        '버튼 내부에 리액트 노드를 넣습니다. 텍스트 변경 가능합니다.',

      table: {
        category: 'ActionButton',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `### 마크다운 지원 디스크립션?`,
        story: '스토리 설명',
      },
    },
  },
  // decorators:[],

  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,

  // args: {  },
} satisfies Meta<typeof ActionButton>;

type Story = StoryObj<typeof meta>;
const createStory = <Tprops,>(args: Tprops, otherOptions?: Meta) => ({
  args,
  argTypes: {
    children: {
      control: false,
      table: {
        disable: false,
      },
    },
  },
  ...otherOptions,
});

// const Template = () => <ActionButton>뭔가 해서 저장하기</ActionButton>;
// export const Default = Template.bind({});
// export const Default: Story = {};
export const Primary: Story = {
  tags: ['!autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
};
export const Example1: Story = {
  args: {
    // children: '기본값',
    children: '기본 값입니당',
  },
  // argTypes: {
  //   children: {
  //     // control: { disable: true }, // Controls 패널에 읽기 전용으로 노출
  //     // table: {
  //     //   // defaultValue: { summary: '기본 값입니당' },
  //     //   // disable: false, // Props 테이블에도 계속 노출
  //     // },
  //   },
  // },
  // argTypes: {
  //   children: {
  //     control: false,
  //   },
  // },
  // argTypes: undefined,
};
//createStory({ children: '액션 버튼 기본값' });

export default meta;
