import { MarkDataContent } from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import { FlowValue } from 'src/features/hooks/queries/flows/useFlowsActualQuery';
import binarySearch from '../../utils/binarySearch';
import {
  AssetMetaInfo,
  MarkData,
} from 'src/widgets/flows/ui/ORGANISMS/ActualFlowChart/ActualFlowEchartsNew';
import getAccYvalueOnChart from './getAccValueOnChart';

const makeUpdateMarkData = (
  dataSource: FlowValue[],
  assetsOrdered: AssetMetaInfo[]
) => {
  return (originalMarkData: MarkData) => {
    const newMarkData = Object.entries(originalMarkData).reduce(
      (accMarkData, [markDataKey, prevMarkDataContent]) => {
        const { assetId, date, seriesIndex } =
          prevMarkDataContent as MarkDataContent;

        // dataSource는 날짜별로 정렬된거니까 사실. bs로 목표 찾기
        const targetIndex = binarySearch({
          data: dataSource,
          l: 0,
          r: dataSource.length,
          findLogic: (target) => {
            return target.date === date;
          },
          getNextLR: (pointer, l, r, m) => {
            const pointingDate = new Date(pointer.date);
            const goalDate = new Date(date);
            if (pointingDate < goalDate) return [m + 1, r];
            else if (pointingDate > goalDate) return [l, m - 1];
            throw new Error('findLogic이 잘못됐거나, 날짜 비교가 이상하거나');
          },
        });

        // 못찾으면
        if (targetIndex === null) return accMarkData;

        // 찾으면
        const flowDataOnDate: FlowValue = dataSource[targetIndex];
        const newValue = flowDataOnDate[assetId];
        const newAccValue = getAccYvalueOnChart(
          flowDataOnDate,
          assetsOrdered,
          seriesIndex
        );

        return {
          ...accMarkData,
          [markDataKey]: {
            ...prevMarkDataContent,
            value: newValue,
            accumulatedValue: newAccValue,
          },
        };
      },

      {} as MarkData
    );
    return newMarkData;
  };
};
export default makeUpdateMarkData;
