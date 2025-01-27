import Tile from './Tile';

export default {
  component: Tile,
  title: 'Tile',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => <Tile>내용</Tile>;
export const Default = Template.bind({});
