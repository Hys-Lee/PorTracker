import ReusableEchart from 'src/shared/ui/MOLECULES/ReusableEchart';
import {
  // makeActualFlowEchartOption,
  addEventHandler,
  makeMarkPoints,
  addEventHandlerNew,
  // makeSeriesCommon,
  defaultFlowsActualOption,
  seriesCommon,
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
  FlowValue,
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

  // console.log('data, isPending, isError', data, isPending, isError);
  // const { accData: graphData, wonPerDollarUpdateDate } = data;

  console.log('markdata,focus: ', markData, focusInfo);

  const markPoints = useMemo(
    () => makeMarkPoints(markData, focusInfo),
    [markData, focusInfo]
  );

  /**
   * data를 차트에 적용 -- dataset사용 이후 버전
   */

  useEffect(
    () => {
      if (!chartInstance) return;
      // 일단 local을 적용하는걸로 해보자.
      const datasetSource = data.accData.values.localCurrencyValues;
      const xAxisName = 'date';
      const assetIds = Object.keys(data.latestAssetInfo);
      const datasetDimensions = [xAxisName, ...assetIds];

      const seriesOptions = Object.entries(data.latestAssetInfo).map(
        ([assetId, { name }], idx) => {
          return {
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              // color: chartInstance.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: `rgb(255, 158, ${68 + idx * 10})`,
              //   },
              //   {
              //     offset: 1,
              //     color: `rgb(255, 70, ${131 + idx * 10})`,
              //   },
              // ]),
            },

            ...seriesCommon,
            // zlevel: datasetDimensions.length - idx,
            name,
            encode: {
              x: xAxisName,
              y: assetId,
            },
          };
        }
      );

      chartInstance.setOption({
        dataset: {
          dimensions: datasetDimensions,
          source: datasetSource,
        },
        series: seriesOptions,
      });
    },
    [chartInstance, data.accData.values, data.latestAssetInfo] //  나중에 krwValue <-> localCurrencyValue 토글도 들어가야 함
  );

  /**
   * 마크포인트 그래프에 적용
   */

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

  /**
   * 클릭 이벤트 핸들러 등록 -- markPoint및 focus관련
   */

  useEffect(() => {
    if (!chartInstance) return;
    (chartInstance as EChartsInstance).on(
      'click',
      (param: echarts.ECElementEvent) => {
        // //test
        // console.log('PARAM: ', param);
        // const valuesOnDate = param.value as FlowValue;

        const determineFocus = (yAxis, xAxis, name) => {
          return (
            focusInfo &&
            focusInfo.accumulatedValue === yAxis &&
            focusInfo.date === xAxis &&
            focusInfo.assetName === name
          );
        };

        const evaluations = addEventHandlerNew(
          param,
          // mixedData,
          // valuesOnDate,
          determineFocus
        );
        //test
        console.log('EVALU: ', evaluations);

        evaluations.forEach((eachEvaluation) => {
          if (eachEvaluation.type === 'mark') {
            const markDataKey = `${focusInfo.assetName}-${focusInfo.date}`;

            setMarkData((prev) => ({ ...prev, [markDataKey]: focusInfo }));
          } else if (eachEvaluation.type === 'focus') {
            if (eachEvaluation.origin) {
              // origin처리
              setFocusInfo(markData[eachEvaluation.origin]);
            } else {
              // data 처리
              const newFocusInfo = eachEvaluation.data
                ? eachEvaluation.data
                : // : ActualFlowFocusInfoAtomInit;
                  undefined;

              setFocusInfo(newFocusInfo);
            }
          }
        });
      }
    );

    return () => (chartInstance as EChartsInstance).off('click');
  }, [chartInstance, mixedData, focusInfo]);

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
      <div style={{ height: '100% ', width: '100% ' }} ref={constraintsRef}>
        <ReusableEchart
          cachedGetInstance={getInstance}
          defaultOption={defaultFlowsActualOption}
        />
        {Object.entries(markData)
          .filter(([key, value]) => key !== 'focus')
          .map(
            (
              [
                key,
                {
                  assetName,
                  assetId,
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
                    assetName,
                    assetId,
                    date,
                    value,
                    viewPos,
                    type,
                    accumulatedValue,
                    dataIndex,
                    seriesIndex,
                    isExist: true,
                    original: `${assetName}-${date}`,
                  }));
                }}
                key={`${assetName}-${date}-${value}`}
                positionData={{
                  constraintsRef,
                  y: viewPos[1],
                  x: viewPos[0],
                }}
                contentsData={{
                  assetName,
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
