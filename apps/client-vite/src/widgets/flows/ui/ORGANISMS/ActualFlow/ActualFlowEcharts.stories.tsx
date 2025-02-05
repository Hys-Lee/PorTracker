import RealFlowEcharts from './ActualFlowEcharts';

export default {
  component: RealFlowEcharts,
  title: 'RealFlowEcharts',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

// export const Default = {
//   //   args: {
//   //     elementsInfo: ['a', 'b', 'c'],
//   //   },
// };

const Template = () => <RealFlowEcharts />;
// const Template = () => <Tmp />;
export const Default = Template.bind({});
