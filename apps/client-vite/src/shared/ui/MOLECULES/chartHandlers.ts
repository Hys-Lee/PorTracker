import * as echarts from 'echarts';
import { MarkDataContent } from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import // FlowDataValuesType,
// FlowDataValuesMetaDataType,
'src/features/hooks/queries/flows/useFlowsActualQuery';
import { FlowValue } from 'src/features/hooks/queries/flows/useFlowsActualQuery';

/** 아래는 dataset사용 전 series 공통 옵션 */
const seriesCommon = {
  progressive: 1000,
  large: true,
  // name: `${asset}`,
  stack: 'Total',
  type: 'line',
  //   symbol: 'none',
  symbolSize: 10,
  showSymbol: false,

  sampling: 'lttb',
  // itemStyle: {
  //   color: `rgb(255, ${70 + idx * 10}, 131)`,
  // },
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
  connectNulls: true,

  // areaStyle: {
  //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //     {
  //       offset: 0,
  //       color: `rgb(255, 158, ${68 + idx * 10})`,
  //     },
  //     {
  //       offset: 1,
  //       color: `rgb(255, 70, ${131 + idx * 10})`,
  //     },
  //   ]),
  // },
  emphasis: {
    focus: 'none',
    showSymbol: true,
    showAllSymbol: false,
  },
};

// export const makeSeriesCommon = (
//   asset: string,
//   values: { value: number; metaData: FlowDataValuesMetaDataType[] }[],
//   idx: number
// ) => ({
//   progressive: 1000,
//   large: true,
//   name: `${asset}`,
//   stack: 'Total',
//   type: 'line',
//   //   symbol: 'none',
//   symbolSize: 10,
//   showSymbol: false,

//   sampling: 'lttb',
//   itemStyle: {
//     color: `rgb(255, ${70 + idx * 10}, 131)`,
//   },
//   data: values,
//   select: {
//     disabled: false,
//     itemStyle: {
//       color: 'blue',
//       borderColor: 'black',
//       borderWidth: 2,
//       radius: 6,
//     },
//   },
//   selectedMode: 'multiple',

//   areaStyle: {
//     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//       {
//         offset: 0,
//         color: `rgb(255, 158, ${68 + idx * 10})`,
//       },
//       {
//         offset: 1,
//         color: `rgb(255, 70, ${131 + idx * 10})`,
//       },
//     ]),
//   },
//   emphasis: {
//     focus: 'none',
//     showSymbol: true,
//     showAllSymbol: false,
//   },
// });
// type ActualFlowEchartValues = {
//   [asset: string]: {
//     value: number;
//     metaData: FlowDataValuesMetaDataType[];
//   }[];
// };

const defaultFlowsActualOption = {
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
    left: 60,
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    position: 'left',
    type: 'value',
    boundaryGap: [0, '100%'],
  },
  dataZoom: [
    {
      id: 'inside-x',
      type: 'inside',
      xAxisIndex: 0,
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
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
      id: 'slider-x',
      type: 'slider',
      brushSelect: false, // 범위 드래그로 재설정 비활성화
    },
  ],
};
/** 아래는 dataset사용 전 ehcart options 기본 옵션 */

// const makeActualFlowEchartOption = (
//   commonDate: string[],
//   totalData: ActualFlowEchartValues
// ) => ({
//   animation: false,
//   tooltip: {
//     trigger: 'axis',
//     position: function (pt: number[]) {
//       return [pt[0] + 10, '10%'];
//     },
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//   },
//   grid: {
//     bottom: 30,
//     top: 30,
//     // right: 10,
//     left: 10,
//   },

//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: commonDate,
//   },
//   yAxis: {
//     position: 'right',
//     type: 'value',
//     boundaryGap: [0, '100%'],
//   },
//   dataZoom: [
//     {
//       id: 'inside-x',
//       type: 'inside',
//       xAxisIndex: 0,
//       zoomOnMouseWheel: true,
//       moveOnMouseMove: true,
//     },
//     {
//       id: 'inside-y',
//       type: 'inside',
//       yAxisIndex: 0,
//       filterMode: 'none',
//       zoomOnMouseWheel: true,
//       moveOnMouseMove: true,
//     },
//     {
//       id: 'slider-x',
//       type: 'slider',
//       brushSelect: false, // 범위 드래그로 재설정 비활성화
//     },
//   ],
//   series: Object.entries(totalData).map(([asset, valueInfos], idx) => {
//     console.log('keys,values', asset, valueInfos);
//     return makeSeriesCommon(asset, valueInfos, idx);
//   }),
// });

interface ParamData extends echarts.ECElementEvent {
  yAxis: number;
  xAxis: string;
  name: string;
}
// const addEventHandler = (
//   echartInstance,
//   defaultDatum,
//   handleMakrPoints,
//   handleFocus,
//   determineFocus
// ) => {
//   if (!echartInstance) return null;

//   echartInstance.on('click', (param: echarts.ECElementEvent) => {
//     if (
//       param.componentType !== 'markPoint' &&
//       param.componentType !== 'series'
//     ) {
//       return;
//     }

//     const accumulatedValue = defaultDatum.reduce(
//       (acc: number, cur: number[], idx: number) => {
//         if (idx > (param.seriesIndex as number)) return acc;
//         return acc + cur[param.dataIndex as number];
//       },
//       0
//     );
//     //test
//     console.log('parma:', param);
//     const markDataTemplate: any =
//       //MarkDataContent
//       {
//         asset: param.seriesName || '이름 없음',
//         date: param.name,
//         type: 'normal',
//         value: Number.isInteger(Number(param.value)) ? Number(param.value) : 0,
//         viewPos: [param.event!.offsetX, param.event!.offsetY],
//         dataIndex: param.dataIndex || 0,
//         seriesIndex: param.seriesIndex as number,
//         accumulatedValue,
//       };

//     if (param.componentType === 'series') {
//       handleFocus(markDataTemplate, null);
//       //   setFocusInfo({ ...markDataTemplate, isExist: true, original: '' });
//     } else if (param.componentType === 'markPoint') {
//       //   const focusInfo = focusInfoRef.current as FocusContent;
//       const paramData = param.data as ParamData;
//       const isFocus = determineFocus(
//         paramData.yAxis,
//         paramData.xAxis,
//         paramData.name
//       );
//       // focusInfo.accumulatedValue === paramData.yAxis &&
//       // focusInfo.date === paramData.xAxis &&
//       // focusInfo.asset === paramData.name &&
//       // focusInfo.isExist; // 포커스랑 동일 위치, 동일 시리즈

//       //   const focusedKey = isFocus ? focusInfo.original : '';

//       const metaData = { seriesName: paramData.name, date: paramData.xAxis };

//       if (isFocus) {
//         // handleMakrPoints(markDataTemplate);
//         handleMakrPoints();
//         handleFocus(null, null);
//       } else {
//         // const originalKey = `${paramData.name}-${paramData.xAxis}`;
//         handleFocus(null, metaData);
//       }
//     }
//   });
// };

const getYcoord = (
  valueOnDate: FlowValue //{ asset: string; value: number[] }[],
  // targetSeriesIndex: number,
  // targetDataIndex: number
) =>
  Object.entries(valueOnDate).reduce((accSum, [fieldName, value]) => {
    // assetId가 아닌 경우 -date- 는 제외
    if (Number.isNaN(Number(fieldName))) return accSum;

    // assetId가 있는 경우
    return value + accSum;
  }, 0);
// data.reduce(
//   (
//     accumulatedSum: number,
//     curSeriesData: { asset: string; value: number[] },
//     seriesIdx: number
//   ) => {
//     if (seriesIdx > targetSeriesIndex) return accumulatedSum;
//     return accumulatedSum + curSeriesData.value[targetDataIndex];
//   },

//   0
// );

const addEventHandlerNew = (
  param: echarts.ECElementEvent,
  valueOnDate,
  determineFocus
): {
  type: 'mark' | 'focus';
  data?: MarkDataContent | null;
  origin?: string;
}[] => {
  if (param.componentType !== 'markPoint' && param.componentType !== 'series') {
    return [];
  }

  if (param.componentType === 'series') {
    const accumulatedValue = getYcoord(
      // defaultDatum,
      valueOnDate
      // param.seriesIndex as number,
      // param.dataIndex
    );
    const markDataTemplate: any = {
      asset: param.seriesName || '이름 없음',
      date: param.name,
      type: 'normal',
      value: Number.isInteger(Number(param.value)) ? Number(param.value) : 0,
      viewPos: [param.event!.offsetX, param.event!.offsetY],
      dataIndex: param.dataIndex || 0,
      seriesIndex: param.seriesIndex as number,
      accumulatedValue,
    };
    return [{ type: 'focus', data: markDataTemplate }];
  } else {
    const paramData = param.data as ParamData;
    const isFocus = determineFocus(
      paramData.yAxis,
      paramData.xAxis,
      paramData.name
    );
    if (isFocus) {
      return [{ type: 'mark' }, { type: 'focus', data: null }];
    } else {
      return [
        { type: 'focus', origin: `${paramData.name}-${paramData.xAxis}` },
      ];
    }
  }
};

const makeMarkPoints = (markData, focusInfo) => {
  const markDataEntries = Object.entries(markData);

  let hasAlready = false;
  const markPointData: {
    name: string;
    xAxis: string;
    yAxis: number;
    itemStyle: object;
    label?: object;
  }[] = markDataEntries.map(([key, data], idx) => {
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

    if (
      focusInfo &&
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

  // ttest
  console.log('아마 마크포인트 포커스 편입전: ', markPointData);

  // const isFocusExist = focusInfo.isExist;
  if (focusInfo && !hasAlready) {
    markPointData.push({
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
  return markPointData;
};

export {
  // makeActualFlowEchartOption,
  // addEventHandler,
  addEventHandlerNew,
  makeMarkPoints,
  defaultFlowsActualOption,
  seriesCommon,
};
