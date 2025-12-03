// import RealFlowEcharts from './ActualFlowEcharts';
import ActualFlowChartView from './ActualFlowChartView';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
export default {
  component: ActualFlowChartView,
  title: 'Widgets/FLows/ORGANISMS/ActualFlowChartView',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div style={{ height: '600px' }}>
        <ActualFlowChartView />
      </div>
    </QueryClientProvider>
  );
};
// const Template = () => <Tmp />;
export const Default = Template.bind({});
