import RelatedConfigPortfolio from './RelatedConfigPortfolio';

export default {
  component: RelatedConfigPortfolio,
  title: 'MemoPage/RelatedConfigPortfolio',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  return <RelatedConfigPortfolio {...args} />;
};
export const Default = Template.bind({});
