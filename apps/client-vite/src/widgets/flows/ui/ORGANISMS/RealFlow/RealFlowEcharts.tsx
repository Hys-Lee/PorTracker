import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import ChartAnnotation from '../ChartAnnotation';

/////    Any 타입 다 찾으셈..

let base = +new Date(2019, 1, 1);
const oneDay = 24 * 3600 * 1000;
const defaultDate: string[] = [];
const maxDataKind = 10;
const defaultDatum: Array<number[]> = [];
for (let i = 0; i < maxDataKind; i++) {
  defaultDatum.push([300 + Math.random() * 300]);
}
for (let i = 1; i < 200; i++) {
  const now = new Date((base += oneDay));
  defaultDate.push(
    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
  );
  for (let j = 0; j < maxDataKind; j++) {
    defaultDatum[j].push(
      Math.round((Math.random() - 0.5) * 20 + defaultDatum[j][i - 1])
    );
  }
}
interface MarkDataContent {
  type: 'normal' | 'trade-only' | 'memo-only' | 'all';
  asset: string;
  date: string; // x
  value: number; // y
  // chartPos: [string, number];
  viewPos: [number, number];
  seriesIndex: number;
  dataIndex: number;
  accumulatedValue: number;
}
interface MarkData {
  [id: string]: MarkDataContent;
  tmp: MarkDataContent;
}
// interface TmpMarkData {
//   asset: string;
//   date: string;
//   viewPos: [string, number];
// }

const defaultOption = {
  animation: false,
  // animationDurationUpdate: 10,
  tooltip: {
    trigger: 'axis',
    position: function (pt: number[]) {
      return [pt[0] + 10, '10%'];
    },
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  grid: {
    bottom: 30,
    top: 30,
    right: 10,
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: defaultDate,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
  },
  dataZoom: [
    {
      id: 'inside-x',
      type: 'inside',
      xAxisIndex: 0,
      // filterMode: 'none', //-> x는 date값이고 string이라 filter가 안먹히거덩.
      // 마우스 휠로 x축 확대/축소
      zoomOnMouseWheel: true,
      // 마우스 드래그 및 휠로 이동
      moveOnMouseMove: true,
      // smooth: true,
    },
    {
      id: 'inside-y',
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'none',
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
    },
    {
      /// 날짜 특정하는 경우가 있으니 slider는 살려둘까?
      id: 'slider-x',
      type: 'slider',
      // 마우스 드래그로 이동
      // xAxisIndex: 0,
      brushSelect: false, // 범위 드래그로 재설정 비활성화
    },
    // {
    //   id: 'slider-y',
    //   type: 'slider',
    //   // 마우스 드래그로 이동
    //   yAxisIndex: 0,
    //   brushSelect: false, // 범위 드래그로 재설정 비활성화
    //   // start: zoomInfo.y.start,
    //   // end: zoomInfo.y.end,
    // },
  ],
  series: defaultDatum.map((data: number[], idx: number) => ({
    progressive: 1000,
    large: true,
    name: `Fake Data ${idx}`,
    stack: 'Total',
    type: 'line',
    //   symbol: 'none',
    symbolSize: 10,
    showSymbol: false,

    sampling: 'lttb',
    itemStyle: {
      color: `rgb(255, ${70 + idx * 10}, 131)`,
    },
    data: data,
    select: {
      disabled: false,
      itemStyle: {
        color: 'blue',
        borderColor: 'black',
        borderWidth: 2,
        radius: 6,
      },
    },
    selectedMode: 'multiple',

    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: `rgb(255, 158, ${68 + idx * 10})`,
        },
        {
          offset: 1,
          color: `rgb(255, 70, ${131 + idx * 10})`,
        },
      ]),
    },
    emphasis: {
      focus: 'none',
      showSymbol: true,
      showAllSymbol: false,
    },
  })),
};

const RealFlowEcharts = () => {
  const chartRef = useRef(null);
  const [echartInstance, setEchartInstance] = useState<null | EChartsInstance>(
    null
  );
  // const [markData, setMarkData] = useState<Array<MarkData>>([]);
  const [markData, setMarkData] = useState<MarkData>({ tmp: {} } as MarkData);
  // const [tmpMarkData, setTmpMarkData] = useState<MarkData>({});

  useEffect(() => {
    if (chartRef.current !== null) {
      setEchartInstance(
        (chartRef.current as EChartsInstance).getEchartsInstance()
      );
    }
    return () => {
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!echartInstance) return;

    // const markDataValues = [
    //   // ...nonTmpKeys.map((validKey) => markData[validKey]),
    //   ...Object.values(markData).filter(
    //     (dataObj) => Object.values(dataObj).length > 0
    //   ),
    // ];

    const markDataEntries = Object.entries(markData);
    // [
    //   // ...Object.entries(markData).filter(
    //   //   ([key, value]) => Object.values(value).length > 0
    //   // ),
    // ];

    //test
    // console.log(
    //   'markDataValues: ',
    //   // markDataValues,
    //   markDataEntries
    // );

    const markPointData: {
      name: string;
      xAxis: string;
      yAxis: number;
      itemStyle: object;
      label?: object;
    }[] = markDataEntries
      .filter(([key, data]) => key !== 'tmp')
      .map(([key, data], idx) => {
        // if (key === 'tmp') return {};
        return {
          name: `${data.asset}-${data.date}`,
          xAxis: data.date,
          yAxis: data.accumulatedValue,
          itemStyle: { borderColor: 'black' }, // type에 따라 모양이나 색 처리
          label: {
            // label 속성 추가
            show: true, // 레이블 표시
            formatter: () => `${idx}`, // 값 표시
            color: 'black', // 텍스트 색상
          },
        };
      });
    const isTmpExist = Object.values(markData.tmp).length > 0;
    if (isTmpExist) {
      markPointData.push({
        name: `${markData.tmp.asset}-${markData.tmp.date}`,
        xAxis: markData.tmp.date,
        yAxis: markData.tmp.accumulatedValue,
        itemStyle: { borderColor: 'white' },
      });
    }

    //test
    console.log('마크포인트데이터: ', markPointData);
    echartInstance.setOption({
      series: [
        {
          markPoint: {
            data: markPointData,
            // data: markDataEntries.map(([key, data], idx) => {
            //   if (Object.values(data).length <= 0) return {};
            //   const markPointData = {
            //     name: `${data.asset}-${data.date}-${data.value}`,
            //     xAxis: data.date,
            //     yAxis: data.accumulatedValue,
            //   };
            //   return key === 'tmp'
            //     ? { ...markPointData, itemStyle: { borderColor: 'white' } }
            //     : {
            //         ...markPointData,
            //         itemStyle: { borderColor: 'black' }, // type에 따라 모양이나 색 처리
            //         label: {
            //           // label 속성 추가
            //           show: true, // 레이블 표시
            //           formatter: () => `${idx}`, // 값 표시
            //           color: 'black', // 텍스트 색상
            //         },
            //       };
            // }),
            //////////////////
            // data: markDataValues.map((data, idx) => ({
            //   name: `${data.asset}-${data.date}-${data.value}`,
            //   xAxis: data.date,
            //   yAxis: data.accumulatedValue,
            //   itemStyle: { borderColor: 'black' }, // type에 따라 모양이나 색 처리
            //   label: {
            //     // label 속성 추가
            //     show: true, // 레이블 표시
            //     formatter: () => `${idx}`, // 값 표시
            //     color: 'black', // 텍스트 색상
            //   },
            // })),
          },
        },
      ],
    });
  }, [echartInstance, markData]);
  useEffect(() => {
    if (!echartInstance) return;
    // echartInstance.on('click', 'markPoint', () => {
    //   console.log('아ㅗ우');
    // });
    echartInstance.on('click', 'series', (param: echarts.ECElementEvent) => {
      if (
        param.componentType !== 'markPoint' &&
        param.componentType !== 'series'
      )
        return;
      //test
      console.log('데이터쪽 파람: ', param);
      const accumulatedValue = defaultDatum.reduce(
        (acc, cur: number[], idx: number) => {
          // console.log('ACC, CUR, IDX: ', acc, cur, idx);
          if (idx > (param.seriesIndex as number)) return acc;
          return acc + cur[param.dataIndex as number];
        },
        0
      );

      const markDataTemplate: MarkDataContent = {
        asset: param.seriesName || '이름 없음',
        date: param.name,
        type: 'normal',
        value: Number.isInteger(Number(param.value)) ? Number(param.value) : 0,
        viewPos: [param.event!.offsetX, param.event!.offsetY],
        dataIndex: param.dataIndex || 0,
        seriesIndex: param.seriesIndex as number,
        accumulatedValue,
      };

      if (param.componentType === 'series') {
        setMarkData((prev) => ({
          ...prev,
          // [`${param.seriesName}-${param.name}-${param.value}`]
          tmp: markDataTemplate,
        }));
      } else if (param.componentType === 'markPoint') {
        setMarkData((prev) => {
          // 임시 타입 처리
          const paramData = param.data as {
            yAxis: number;
            xAxis: string;
            name: string;
          };
          if (
            prev?.tmp.accumulatedValue === paramData.yAxis &&
            prev?.tmp.date === paramData.xAxis
          ) {
            //test
            console.log('존재?: ', prev[`${prev.tmp.asset}-${prev.tmp.date}`]);
            return {
              ...prev,
              [`${prev.tmp.asset}-${prev.tmp.date}`]: prev[
                `${prev.tmp.asset}-${prev.tmp.date}`
              ]
                ? prev[`${prev.tmp.asset}-${prev.tmp.date}`]
                : prev.tmp,
              tmp: {} as MarkDataContent,
            };
          } else {
            // 포커스가 아닌 지점 클릭한다면..
            return {
              ...prev,
              tmp: {
                // asset: param.seriesName || '이름 없음',
                asset: paramData.name.split('-')[0],
                date: paramData.xAxis,
                type: 'normal',
                value: 0, // 원본 value는 모르고 acc만 알게 되므로.
                viewPos: [param.event!.offsetX, param.event!.offsetY],
                dataIndex: param.dataIndex || 0,
                seriesIndex: param.seriesIndex as number,
                accumulatedValue: paramData.yAxis,
              }, // on-off기능
            };
          }
        });
      }
    });
    return () => {
      echartInstance.off('click');
    };
  }, [echartInstance, defaultDatum]); // defaultDatum위치 정리한번 해야함.

  const constraintsRef = useRef(null);

  return (
    <div style={{ height: '500px', width: '100%' }} ref={constraintsRef}>
      <ReactECharts
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
        option={defaultOption}
      />
      {Object.entries(markData).map(
        ([key, { asset, date, value, viewPos, type }], idx) =>
          key !== 'tmp' && (
            <ChartAnnotation
              key={`${asset}-${date}-${value}`}
              positionData={{
                constraintsRef,
                y: viewPos[1],
                x: viewPos[0],
              }}
              contentsData={{
                asset,
                date,
                exchageRate: 1, // 추후 수정
                idx,
                type,
                value,
              }}
            />
          )
      )}
    </div>
  );
};
export default RealFlowEcharts;
