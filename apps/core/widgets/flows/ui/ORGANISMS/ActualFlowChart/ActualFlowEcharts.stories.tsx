// import RealFlowEcharts from './ActualFlowEcharts';
import RealFlowEcharts from './ActualFlowEchartsNew';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
export default {
  component: RealFlowEcharts,
  title: 'Widgets/FLows/ORGANISMS/RealFlowEcharts',
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

const Template = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div style={{ height: '500px' }}>
        <RealFlowEcharts />
      </div>
    </QueryClientProvider>
  );
};
// const Template = () => <Tmp />;
export const Default = Template.bind({});
