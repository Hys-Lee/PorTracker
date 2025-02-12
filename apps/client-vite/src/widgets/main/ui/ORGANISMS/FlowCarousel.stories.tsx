import FlowCarousel from './FlowCarousel';

export default {
  component: FlowCarousel,
  title: 'FlowCarousel',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => <FlowCarousel />;
export const Default = Template.bind({});
