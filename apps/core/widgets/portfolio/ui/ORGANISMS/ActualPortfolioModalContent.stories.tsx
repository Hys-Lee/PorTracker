import ActualPortfolioModalContent from './ActualPortfolioModalContent';

export default {
  component: ActualPortfolioModalContent,
  title: 'Widgets/Portfolios/ORGANSIMS/ActualPortfolioModalContent',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = (args) => {
  return <ActualPortfolioModalContent {...args} />;
};
export const Default = Template.bind({});
