import MemoTile from './MemoTile';

export default {
  component: MemoTile,
  title: 'MemoPage/MemoTile',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  return (
    <div id="root">
      <MemoTile
        {...args}
        asset={'애셋'}
        content={'내용'}
        date={'날짜'}
        portfolioType={'타입'}
        title={'제목'}
      />
    </div>
  );
};
export const Default = Template.bind({});
