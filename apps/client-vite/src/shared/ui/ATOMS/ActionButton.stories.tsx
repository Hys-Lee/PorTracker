import ActionButton from './ActionButton';

export default {
  component: ActionButton,
  title: 'Shared/ATOMS/ActionButton',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => <ActionButton>뭔가 해서 저장하기</ActionButton>;
export const Default = Template.bind({});
