import { FlowValue } from 'src/features/hooks/queries/flows/useFlowsActualQuery';
import { AssetMetaInfo } from 'src/widgets/flows/ui/ORGANISMS/ActualFlowChart/ActualFlowEchartsNew';

const getAccYvalueOnChart = (
  valueOnDate: FlowValue, //{ asset: string; value: number[] }[],
  assetsOrdered: AssetMetaInfo[],
  targetSeriesIndex: number
  // targetDataIndex: number
) =>
  assetsOrdered.reduce((accSum, { id: assetId, name }, idx) => {
    // 현재 시리즈 위에 있는 것들은 누적합 제외
    if (targetSeriesIndex < idx) return accSum;

    const hasAssetIdOnDate = valueOnDate?.[assetId] ? true : false;
    if (!hasAssetIdOnDate) return accSum;

    // 클릭 지점에 있는 assetId에 대한 값들만 처리
    const value = valueOnDate[assetId];
    return value + accSum;
  }, 0);

export default getAccYvalueOnChart;
