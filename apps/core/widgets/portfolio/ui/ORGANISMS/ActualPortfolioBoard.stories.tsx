import ActualPortfolioBoard from './ActualPortfolioBoard';

export default {
  component: ActualPortfolioBoard,
  title: 'Widgets/Portfolios/ORGANSIMS/ActualPortfolioBoard',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  return <ActualPortfolioBoard {...args} />;
};
export const Default = Template.bind({});
