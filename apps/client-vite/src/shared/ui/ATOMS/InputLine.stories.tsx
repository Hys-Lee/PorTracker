import InputLine from './InputLine';

export default {
  component: InputLine,
  title: 'Shared/ATOMS/InputLine',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => <InputLine />;
export const Default = Template.bind({});
