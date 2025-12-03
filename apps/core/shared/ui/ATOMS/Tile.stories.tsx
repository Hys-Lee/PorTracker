import Tile from './Tile';

export default {
  component: Tile,
  title: 'Shared/ATOMS/Tile',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => (
  <div style={{ background: '#f6f7f9', height: '800px', padding: '50px' }}>
    <Tile>
      <div style={{ height: '600px' }}>내용</div>
    </Tile>
  </div>
);
export const Default = Template.bind({});
