import InputArea from './InputArea';

export default {
  component: InputArea,
  title: 'Shared/ATOMS/InputArea',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => <InputArea />;
export const Default = Template.bind({});
