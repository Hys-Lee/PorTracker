import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import ChartAnnotation from './ChartAnnotation';
import { useAtom, useSetAtom } from 'jotai';
import {
  ActualFlowFocusInfoAtom,
  FocusContent,
  MarkDataContent,
} from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import { v4 as uuidV4 } from 'uuid';

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

interface MarkData {
  [id: string]: MarkDataContent;
  // focus: MarkDataContent;
}
const defaultOption = {
  animation: false,
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
    // right: 10,
    left: 10,
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: defaultDate,
  },
  yAxis: {
    position: 'right',
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

  // const [markData, setMarkData] = useState<MarkData>({ focus: {} } as MarkData);
  const [markData, setMarkData] = useState<MarkData>({} as MarkData);
  const [focusInfo, setFocusInfo] = useAtom(ActualFlowFocusInfoAtom);

  const focusInfoRef = useRef({});

  focusInfoRef.current = focusInfo;

  useEffect(() => {
    if (
      !focusInfo.isExist ||
      !focusInfo.original ||
      markData[focusInfo.original]
    )
      return;
    markData[focusInfo.original] = Object.keys(focusInfo).reduce((acc, cur) => {
      if (cur === 'isExist') return acc;
      return {
        ...acc,
        [cur as keyof MarkDataContent]: focusInfo[cur as keyof MarkDataContent],
      };
    }, {}) as MarkDataContent;
  }, [focusInfo]);

  useEffect(() => {
    if (chartRef.current !== null) {
      setEchartInstance(
        (chartRef.current as EChartsInstance).getEchartsInstance()
      );
    }
    return () => {
      if (echartInstance) {
        echartInstance.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!echartInstance) return;

    const markDataEntries = Object.entries(markData);

    let hasAlready = false;
    const markPointData: {
      name: string;
      xAxis: string;
      yAxis: number;
      itemStyle: object;
      label?: object;
    }[] = markDataEntries
      // .filter(([key, data]) => key !== 'focus')
      .map(([key, data], idx) => {
        const template = {
          name: `${data.asset}`,
          xAxis: data.date,
          yAxis: data.accumulatedValue,
          itemStyle: { borderColor: 'black' }, // type에 따라 모양이나 색 처리
          label: {
            show: true, // 레이블 표시
            formatter: () => `${idx}`, // 값 표시
            color: 'black', // 텍스트 색상
          },
        };
        // test
        console.log(
          'focusInfo.isExist ,          data.asset === focusInfo.asset ,          data.date === focusInfo.date',
          focusInfo.isExist,
          data.asset === focusInfo.asset,
          data.date === focusInfo.date
        );

        if (
          // data.asset === markData.focus.asset &&
          // data.date === markData.focus.date
          focusInfo.isExist &&
          data.asset === focusInfo.asset &&
          data.date === focusInfo.date
        ) {
          hasAlready = true;
          return {
            ...template,
            itemStyle: {
              borderColor: 'white',
              borderType: 'dotted',
              borderWidth: 4,
            },
          };
        }
        return template;
      });

    /// test
    console.log('makrpointdata 처음: ', markPointData);

    // const isFocusExist = Object.values(markData.focus).length > 0;
    const isFocusExist = focusInfo.isExist;
    if (isFocusExist && !hasAlready) {
      markPointData.push({
        // name: `${markData.focus.asset}-${markData.focus.date}`,
        // name: `${markData.focus.asset}`,
        // xAxis: markData.focus.date,
        // yAxis: markData.focus.accumulatedValue,
        name: `${focusInfo.asset}`,
        xAxis: focusInfo.date,
        yAxis: focusInfo.accumulatedValue,
        itemStyle: {
          borderColor: 'white',
          borderType: 'dotted',
          borderWidth: 4,
        },
      });
    }

    /// test
    console.log('makrpointdata 마지막: ', markPointData);

    echartInstance.setOption({
      series: [
        {
          markPoint: {
            data: markPointData,
          },
        },
      ],
    });
  }, [echartInstance, markData, focusInfo]);

  useEffect(() => {
    if (!echartInstance) return;

    echartInstance.on('click', (param: echarts.ECElementEvent) => {
      if (
        param.componentType !== 'markPoint' &&
        param.componentType !== 'series'
      ) {
        return;
      }
      //test
      console.log('param :', param);
      const accumulatedValue = defaultDatum.reduce(
        (acc, cur: number[], idx: number) => {
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
          // focus: markDataTemplate,
        }));
        setFocusInfo({ ...markDataTemplate, isExist: true, original: '' });
      } else if (param.componentType === 'markPoint') {
        //test
        console.log('makrdat: ', markData);
        const focusInfo = focusInfoRef.current as FocusContent;
        setMarkData((prev) => {
          // 임시 타입 처리
          const paramData = param.data as {
            yAxis: number;
            xAxis: string;
            name: string;
            // value:
          };
          const isFocus =
            // prev?.focus.accumulatedValue === paramData.yAxis &&
            // prev?.focus.date === paramData.xAxis &&
            // prev.focus.asset === paramData.name; // 포커스랑 동일 위치, 동일 시리즈
            focusInfo.accumulatedValue === paramData.yAxis &&
            focusInfo.date === paramData.xAxis &&
            focusInfo.asset === paramData.name &&
            focusInfo.isExist; // 포커스랑 동일 위치, 동일 시리즈
          const focusedKey = isFocus
            ? focusInfo.original
            : // ? `${focusInfo.asset}-${focusInfo.date}`
              //  //`${prev.focus.asset}-${prev.focus.date}`
              '';
          //test
          console.log('isFocus: ', isFocus, focusInfo, paramData, focusedKey);
          const nonFocus = Object.keys(focusInfo).reduce((acc, cur) => {
            if (cur === 'isExist' || cur === 'original') return { ...acc };
            return { ...acc, [cur]: focusInfo[cur as keyof MarkDataContent] };
          }, {}) as MarkDataContent;
          if (isFocus) {
            setFocusInfo((prev) => ({ ...prev, isExist: false }));
            //test
            console.log('이전은 뭔데: ', prev);
            return focusedKey === ''
              ? { ...prev, [`${focusInfo.asset}-${focusInfo.date}`]: nonFocus }
              : {
                  ...prev,
                  // [focusedKey]: prev[focusedKey] || prev.focus,
                  // focus: {} as MarkDataContent,
                  [focusedKey]: prev[focusedKey],
                };
          } else {
            // 포커스가 아닌 지점 클릭한다면..
            //test
            console.log('먼데 도대체');
            setFocusInfo({
              asset: paramData.name || '',
              date: paramData.xAxis,
              type: 'normal',
              value: 0, // 원본 value는 모르고 acc만 알게 되므로.
              viewPos: [param.event!.offsetX, param.event!.offsetY],
              dataIndex: param.dataIndex || 0,
              seriesIndex: param.seriesIndex as number,
              accumulatedValue: paramData.yAxis,
              isExist: true,
              original: `${paramData.name || ''}-${paramData.xAxis}`,
            });
            return prev;
            // return {
            //   ...prev,
            //   focus: {
            //     // asset: param.seriesName || '이름 없음',
            // asset: paramData.name || '',
            // date: paramData.xAxis,
            // type: 'normal',
            // value: 0, // 원본 value는 모르고 acc만 알게 되므로.
            // viewPos: [param.event!.offsetX, param.event!.offsetY],
            // dataIndex: param.dataIndex || 0,
            // seriesIndex: param.seriesIndex as number,
            // accumulatedValue: paramData.yAxis,
            //   }, // on-off기능
            // };
          }
        });
      }
    });
    return () => {
      echartInstance.off('click');
    };
  }, [echartInstance, defaultDatum]); // defaultDatum위치 정리한번 해야함.

  const constraintsRef = useRef(null);

  // useEffect(() => {
  //   setFocusInfo({
  //     asset: markData.focus.asset,
  //     date: markData.focus.date,
  //     type: markData.focus.type,
  //   });
  // }, [markData.focus.asset, markData.focus.date, markData.focus.type]);
  // useEffect(() => {
  //   setMarkData((prev) => ({
  //     ...prev,
  //     focus: {
  //       ...prev.focus,
  //       asset: focusInfo.asset,
  //       date: focusInfo.date,
  //       type: focusInfo.type,
  //     },
  //   }));
  // }, [focusInfo.asset, focusInfo.date, focusInfo.type]);

  //test
  console.log('makrDAta, focusInfo: ', markData, focusInfo);

  return (
    <div style={{ height: '100%', width: '100%' }} ref={constraintsRef}>
      <ReactECharts
        ref={chartRef}
        style={{ width: '100%', height: '100%' }}
        option={defaultOption}
      />
      {Object.entries(markData)
        .filter(([key, value]) => key !== 'focus')
        .map(
          (
            [
              key,
              {
                asset,
                date,
                value,
                viewPos,
                type,
                accumulatedValue,
                dataIndex,
                seriesIndex,
              },
            ],
            idx
          ) => (
            <ChartAnnotation
              onClick={() => {
                // setMarkData((prev) => ({
                //   ...prev,
                //   focus: {
                //     asset,
                //     date,
                //     value,
                //     viewPos,
                //     type,
                //     accumulatedValue,
                //     dataIndex,
                //     seriesIndex,
                //   },
                // }));
                setFocusInfo((prev) => ({
                  asset,
                  date,
                  value,
                  viewPos,
                  type,
                  accumulatedValue,
                  dataIndex,
                  seriesIndex,
                  isExist: true,
                  original: `${asset}-${date}`,
                }));
              }}
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
