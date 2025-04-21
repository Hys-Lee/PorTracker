import ReusableEchart from 'src/shared/ui/MOLECULES/ReusableEchart';
import {
  makeActualFlowEchartOption,
  addEventHandler,
  makeMarkPoints,
  addEventHandlerNew,
  makeSeriesCommon,
} from 'src/shared/ui/MOLECULES/chartHandlers';
import {
  makeDefaultDate,
  makeDefaultDaum,
  makeDefaultMemo,
  makeDefaultTrade,
  makeMixedData,
  makeMixedDataWithMemo,
} from 'src/shared/ui/MOLECULES/chartDataHandler';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
  ActualFlowFocusInfoAtom,
  ActualFlowFocusInfoAtomInit,
} from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import { useAtom } from 'jotai';
import ChartAnnotation from './ChartAnnotation';
import { MarkDataContent } from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import { EChartsInstance } from 'echarts-for-react';
import useFlowsActualQuery, {
  FlowDataType,
  FlowDataValuesMetaDataType,
} from 'src/features/hooks/queries/flows/useFlowsActualQuery';
import { ActualDataResponse } from 'src/features/fetching/flows/getActuals';

interface MarkData {
  [id: string]: MarkDataContent;
}
const ActualFlowEchartNew = () => {
  const [chartInstance, setChartInstance] = useState<EChartsInstance | null>(
    null
  );
  const [markData, setMarkData] = useState<MarkData>({} as MarkData);
  const [focusInfo, setFocusInfo] = useAtom(ActualFlowFocusInfoAtom);
  const constraintsRef = useRef(null);
  const getInstance = useCallback((instance: EChartsInstance | null) => {
    if (instance) {
      setChartInstance(instance);
    }
  }, []);

  /** data처리 여기 일단. */
  const date = makeDefaultDate();
  const priceData = makeDefaultDaum();
  //
  const memo = makeDefaultMemo();
  const tradeData = makeDefaultTrade();
  const mixedData = makeMixedData(tradeData, priceData, date);
  //test
  // console.log('mixedDta: ', mixedData);
  const mixedDataWithMemo = makeMixedDataWithMemo(memo, date, mixedData);

  const [usingKRW, setUsingKRW] = useState(false);
  // fetch test
  const { data, isPending, isError, hasNextPage, fetchNextPage } =
    useFlowsActualQuery(new Date(Date.now()), 1);

  console.log('data, isPending, isError', data, isPending, isError);

  // const flattenedData = data?.pages.reduce((acc, page) => {
  //   return [...acc, ...page.data];
  // }, [] as { id: number; asset: string; currency: string; date: string; exchange_rate: number; price: number; shares: number; transaction_type: string }[]);

  // const organizedData2 =
  //   flattenedData?.reduce((acc, portfolio) => {
  //     const date = portfolio.date;
  //     const valueOnAsset = {
  //       price: portfolio.price,
  //       shares: portfolio.shares,
  //       transactionType: portfolio.transaction_type,
  //       exchangeRate: portfolio.exchange_rate,
  //     };
  //     if (acc[date]) {
  //       const newValue = acc[date][portfolio.asset]
  //         ? {
  //             ...acc[date],
  //             [portfolio.asset]: [...acc[date][portfolio.asset], valueOnAsset],
  //           }
  //         : { ...acc[date], [portfolio.asset]: [valueOnAsset] };

  //       return {
  //         ...acc,
  //         [date]: newValue,
  //       };
  //     }

  //     return {
  //       ...acc,
  //       [date]: {
  //         [portfolio.asset]: [valueOnAsset],
  //       },
  //     };
  //   }, {} as { [date: string]: { [asset: string]: { price: number; shares: number; transactionType: string; exchangeRate: number }[] } }) ??
  //   {};

  // // const organizedData = data?.pages.reduce((acc, page) => {
  // //   const pageSubResult = page.data.reduce((subResult, portfolio) => {
  // //     return {
  // //       ...subResult,
  // //       [portfolio.date]: {
  // //         [portfolio.asset]: {
  // //           price: portfolio.price,
  // //           shares: portfolio.shares,
  // //           transactionType: portfolio.transaction_type,
  // //           exchangeRate: portfolio.exchange_rate,
  // //         },
  // //       },
  // //     };
  // //   }, {} as { [date: string]: { [asset: string]: { price: number; shares: number; transactionType: string; exchangeRate: number } } });

  // //   const result = acc;
  // //   Object.entries(pageSubResult).forEach(([key, value]) => {
  // //     if (result[key]) {
  // //       result[key] = { ...result[key], ...value };
  // //     } else {
  // //       result[key] = value;
  // //     }
  // //   });
  // //   return result;
  // // }, {} as { [date: string]: { [asset: string]: { price: number; shares: number; transactionType: string; exchangeRate: number } } });

  // console.log('organizedData: ', organizedData2);

  // const totalDates = Object.keys(organizedData2);
  // //// totalData만들 때, 한 date에 최대 2개 data(transactionType따라)가 들어올 수 있음.

  // const makeTotalData = (usingEchangeRate: boolean) =>
  //   Object.values(organizedData2).reduce((prevDataOnAsset, dataOnDate, idx) => {
  //     // dataOnDate에 대해서 동작시키면 안되지.
  //     // 이전 데이터와 dateOnDAte 둘다 돌려야 해서 2차 루프 돌라여 하는데...

  //     return Object.entries(dataOnDate).reduce((acc, [asset, transactions]) => {
  //       const newValue = transactions.reduce((valueSum, transaction) => {
  //         return (
  //           valueSum +
  //           transaction.price *
  //             transaction.shares *
  //             (transaction.transactionType === 'allocation' ? 1 : -1) *
  //             (usingEchangeRate ? transaction.exchangeRate : 1)
  //         );
  //       }, 0);

  //       //test
  //       console.log(
  //         '내부동적 - asset, acc[asset], newValue: ',
  //         asset,
  //         acc[asset],
  //         newValue
  //       );
  //       if (acc[asset]) {
  //         const prevValue = [...acc[asset]];
  //         const padding = new Array(idx - prevValue.length).fill(
  //           prevValue[prevValue.length - 1]
  //         );

  //         return {
  //           ...acc,
  //           [asset]: [...prevValue, ...padding, newValue],
  //         };
  //       }
  //       const padding = new Array(idx).fill(0);
  //       return {
  //         ...acc,
  //         [asset]: [...padding, newValue],
  //       };
  //     }, prevDataOnAsset as { [asset: string]: number[] });
  //   }, {} as { [asset: string]: number[] });

  // //test
  // console.log('totalDates, totalData: ', totalDates, makeTotalData(false));

  // ////////////////////////////////////////////////////////////////////////////
  // // // test data handling
  // // const handleData = (usingEchangeRate) =>
  // //   !data
  // //     ? {}
  // //     : data.pages.reduce((acc, page) => {
  // //         const pageSubResult = page.data.reduce((subResult, portfolio) => {
  // //           const value =
  // //             portfolio.price *
  // //             portfolio.shares *
  // //             (portfolio.transaction_type === 'allocation' ? 1 : -1) *
  // //             (usingEchangeRate ? portfolio.exchange_rate : 1);
  // //           return {
  // //             ...subResult,
  // //             [portfolio.asset]: value,
  // //           };
  // //         }, {});

  // //         return { ...acc, ...pageSubResult };
  // //       }, {} as { [asset: string]: number[] });

  // // const handledDate = !data
  // //   ? []
  // //   : [
  // //       ...new Set(
  // //         data.pages.reduce((acc, page) => {
  // //           const pageSubResult = page.data.map((portfolio) => portfolio.date);
  // //           return [...acc, ...pageSubResult];
  // //         }, [] as string[])
  // //       ),
  // //     ];

  // // const tmpData = handleData(false);

  // const handledDate = data?.pages[0].data.map((item) => item.date) || [];
  // const tmpData =
  //   data?.pages[0].data.reduce((acc, portfolio) => {
  //     const value =
  //       portfolio.price *
  //       portfolio.shares *
  //       (portfolio.transaction_type === 'allocation' ? 1 : -1) *
  //       (portfolio.exchange_rate || 1);

  //     if (acc[portfolio.asset]) {
  //       const newAnswer = [...acc[portfolio.asset], value];
  //       return {
  //         ...acc,
  //         [portfolio.asset]: newAnswer,
  //       };
  //     }
  //     return {
  //       ...acc,
  //       [portfolio.asset]: [value],
  //     };
  //   }, {} as { [asset: string]: number[] }) || {};
  // //test
  // console.log('handledDate,tmpData: ', handledDate, tmpData);
  // console.log('hasNextPage: ', hasNextPage);

  const markPoints = makeMarkPoints(markData, focusInfo);

  const decidedValues = useMemo(() => {
    if (!data?.values) return {}; /// 이거 방어 코드 어케 쓰지?
    return Object.entries(data?.values).reduce((acc, [asset, valueInfos]) => {
      const decidedValueInfos = valueInfos.map((valueInfo) => ({
        metaData: valueInfo.metaData,
        value: usingKRW ? valueInfo.krwValue : valueInfo.localCurrencyValue,
      }));
      return { ...acc, [asset]: decidedValueInfos };
    }, {} as { [asset: string]: { value: number; metaData: FlowDataValuesMetaDataType[] }[] });
  }, [usingKRW, data]);
  const actualFlowDefaultOption = makeActualFlowEchartOption(
    data.date,
    decidedValues
  );

  useEffect(() => {
    // data 추가하는 로직
    if (!chartInstance) return;
    if (hasNextPage) {
      //test
      console.log('더 불러와');
      // fetchNextPage();
    }

    chartInstance.setOption({
      xAxis: {
        data: data.date,
      },
      series: Object.entries(decidedValues).map(([key, value], idx) => {
        return makeSeriesCommon(key, value, idx);
      }),
    });
  }, [data.date, decidedValues, chartInstance, hasNextPage]);

  // const actualFlowDefaultOption = makeActualFlowEchartOption(date, mixedData);

  useEffect(() => {
    if (!chartInstance) return;

    (chartInstance as EChartsInstance).setOption({
      series: [
        {
          markPoint: {
            data: markPoints,
          },
        },
      ],
    });
  }, [markPoints, chartInstance]);

  useEffect(() => {
    if (!chartInstance) return;
    (chartInstance as EChartsInstance).on(
      'click',
      (param: echarts.ECElementEvent) => {
        const determineFocus = (yAxis, xAxis, name) => {
          return (
            focusInfo &&
            focusInfo.accumulatedValue === yAxis &&
            focusInfo.date === xAxis &&
            focusInfo.asset === name
          );
        };

        const evaluations = addEventHandlerNew(
          param,
          mixedData,
          determineFocus
        );

        evaluations.forEach((eachEvaluation) => {
          if (eachEvaluation.type === 'mark') {
            const markDataKey = `${focusInfo.asset}-${focusInfo.date}`;

            setMarkData((prev) => ({ ...prev, [markDataKey]: focusInfo }));
          } else if (eachEvaluation.type === 'focus') {
            if (eachEvaluation.origin) {
              // origin처리
              setFocusInfo(markData[eachEvaluation.origin]);
            } else {
              // data 처리
              const newFocusInfo = eachEvaluation.data
                ? eachEvaluation.data
                : ActualFlowFocusInfoAtomInit;

              setFocusInfo(newFocusInfo);
            }
          }
        });
      }
    );

    return () => (chartInstance as EChartsInstance).off('click');
  }, [chartInstance, mixedData, focusInfo]);

  // addEventHandler(
  //   chartInstance,
  //   datum,
  //   (markPoint) => {
  //     //test
  //     console.log('마크 포인트: ', markPoint);
  //     const markDataKey = `${focusInfo.asset}-${focusInfo.date}`;
  //     setMarkData((prev) => ({ ...prev, [markDataKey]: focusInfo }));
  //   },
  //   (focusPoint, metaData) => {
  //     //test
  //     console.log('focus: ', focusPoint);
  //     if (metaData) {
  //       const key = `${metaData.seriesName}-${metaData.date}`;
  //       setFocusInfo(markData[key]);
  //     } else {
  //       setFocusInfo(focusPoint);
  //     }
  //   },
  //   (yAxis, xAxis, name) => {
  //     return (
  //       focusInfo &&
  //       focusInfo.accumulatedValue === yAxis &&
  //       focusInfo.date === xAxis &&
  //       focusInfo.asset === name
  //     );
  //   }
  // );

  return (
    <>
      <div
        onClick={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      >
        패치버튼
      </div>
      <div style={{ height: '100%', width: '100%' }} ref={constraintsRef}>
        <ReusableEchart
          cachedGetInstance={getInstance}
          defaultOption={actualFlowDefaultOption}
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
    </>
  );
};

export default ActualFlowEchartNew;
