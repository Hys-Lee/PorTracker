import MemoModal from './MemoModalContent';

export default {
  component: MemoModal,
  title: 'Widgets/Memos/ORGANSIMS/MemoModal',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  return <MemoModal {...args} />;
};
export const Default = Template.bind({});
