import ReactECharts, {
  EChartsInstance,
  EChartsOption,
} from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState, memo, Ref, RefAttributes } from 'react';
import { css } from '@styled-system/css';

/////    Any 타입 다 찾으셈..

interface ReusableEchartProps {
  cachedGetInstance: (ref: EChartsInstance) => void;
  defaultOption: EChartsOption;
}

const ReusableEchart = memo(
  ({ cachedGetInstance, defaultOption }: ReusableEchartProps) => {
    const chartRef = useRef(null);

    useEffect(() => {
      let chartInstance = null;

      if (chartRef.current !== null) {
        // chartInstance = (
        //   chartRef.current as EChartsInstance
        // ).getEchartsInstance();

        chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(defaultOption);
        cachedGetInstance(chartInstance);
        // chartInstance.resize();
      }
      return () => {
        if (chartInstance) {
          chartInstance.dispose();
        }
      };
    }, [cachedGetInstance, chartRef]);

    return (
      //   <ReactECharts
      //     ref={chartRef}
      //     style={{ width: '100%', height: '100%' }}
      //     option={defaultOption}
      //   />
      <div
        className={EchartDefaultStyle}
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
);
export default ReusableEchart;

const EchartDefaultStyle = css({
  '& > div': { height: '100% !important' },
});
