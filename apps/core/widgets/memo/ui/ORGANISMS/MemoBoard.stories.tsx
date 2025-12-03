import ReactModal from 'react-modal';
import MemoBoard from './MemoBoard';

export default {
  component: MemoBoard,
  title: 'Widgets/Memos/ORGANSIMS/MemoBoard',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};
const Template = (args) => {
  return (
    <div id="root">
      <MemoBoard {...args} />
    </div>
  );
};
export const Default = Template.bind({});
