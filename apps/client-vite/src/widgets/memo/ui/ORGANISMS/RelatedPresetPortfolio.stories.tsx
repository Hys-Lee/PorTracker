import RelatedPresetPortfolio from './RelatedPresetPortfolio';

export default {
  component: RelatedPresetPortfolio,
  title: 'MemoPage/RelatedPresetPortfolio',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  return <RelatedPresetPortfolio {...args} />;
};
export const Default = Template.bind({});
