import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import FlowAnnotation from './FlowAnnotation';
/**
 * options에서 리렌더링 간 유지하고 싶은 조건들은 state로 저장해야 함.
 * useEffect와 useRef를 통해 instance를 가져와서 기존 이벤트 리스너 제거 후 커스텀으로 추가하면 되는 듯.
 * 
 * useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      if (chart) {
        chart.off('dataZoom'); // 기존 이벤트 리스너 제거
        chart.on('dataZoom', (params) => {
          setDataZoom({ start: params.start, end: params.end });
        });
      }
    }
  }, []);
 */

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

interface MarkCoord {
  chartPos: [string, number];
  viewPos: [number, number];
  seriesIndex: number;
  dataIndex: number;
}

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
  const [markCoords, setMarkCoords] = useState<Array<MarkCoord>>([]);
  // const echartInstance = useMemo(
  //   () =>
  //     chartRef.current === null
  //       ? null
  //       : (chartRef.current as EChartsInstance).getEchartsInstance(),
  //   []
  // );

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

    echartInstance.setOption({
      series: [
        {
          markPoint: {
            data: markCoords.map((coordInfo, idx) => ({
              name: `${coordInfo.chartPos}`,
              xAxis: coordInfo.chartPos[0],
              yAxis: coordInfo.chartPos[1],
              itemStyle: { borderColor: 'black' },
              label: {
                // label 속성 추가
                show: true, // 레이블 표시
                formatter: () => `${idx}`, // 값 표시
                color: 'black', // 텍스트 색상
              },
            })),
          },
        },
      ],
    });
  }, [echartInstance, markCoords]);
  useEffect(() => {
    if (!echartInstance) return;
    echartInstance.on('click', (param: echarts.ECElementEvent) => {
      setMarkCoords((prev) => [
        ...prev,
        {
          chartPos: [
            param.name as string,
            defaultDatum.reduce((acc, cur: number[], idx: number) => {
              // console.log('ACC, CUR, IDX: ', acc, cur, idx);
              if (idx > (param.seriesIndex as number)) return acc;
              return acc + cur[param.dataIndex as number];
            }, 0),
          ], //param.value],
          viewPos: [param.event!.offsetX, param.event!.offsetY],
          dataIndex: param.dataIndex,
          seriesIndex: param.seriesIndex as number,
        },
      ]);
    });
    return () => {
      echartInstance.off('click');
    };
  }, [echartInstance, defaultDatum]); // defaultDatum위치 정리한번 해야함.

  return (
    <div style={{ height: '500px' }}>
      {markCoords.map((markCoordInfo, idx) => (
        <Draggable
          key={`${markCoordInfo.seriesIndex}-${markCoordInfo.dataIndex}`}
          bounds="parent"
          defaultPosition={{
            y: markCoordInfo.viewPos[1],
            x: markCoordInfo.viewPos[0],
          }}
        >
          <div
            style={{
              zIndex: 1,
              position: 'absolute',
              width: '100px',
              height: '100px',
              backgroundColor: 'lightblue',
              border: '1px solid black',
              cursor: 'move',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {idx} 드래거블이래
            <FlowAnnotation />
            <button
              style={{ border: '1px solid white' }}
              onClick={() => {
                const newCoords = [...markCoords].filter(
                  (coordInfo) =>
                    coordInfo.seriesIndex !== markCoordInfo.seriesIndex ||
                    coordInfo.dataIndex !== markCoordInfo.dataIndex
                );
                setMarkCoords(newCoords);
              }}
            >
              삭제
            </button>
          </div>
        </Draggable>
      ))}
      <ReactECharts
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
        option={defaultOption}
        // onEvents={{
        //   mousedown: () => {
        //     console.log('리액트 마우스다운 ');
        //   },
        // }}
      />
    </div>
  );
};
export default RealFlowEcharts;
