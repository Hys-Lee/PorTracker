import { useCallback, useState } from 'react';
import makeUpdateMarkData from 'src/features/logic/flows/makeUpdateMarkData';
import useRecalculatableState from 'src/shared/hooks/useRecalculatableState';
import {
  AssetMetaInfo,
  MarkData,
} from 'src/widgets/flows/ui/ORGANISMS/ActualFlowChart/ActualFlowEchartsNew';
import { FlowValue } from '../../queries/flows/useFlowsActualQuery';

const useRenewableMarkData = (
  markDataInit: MarkData,
  dataSource: FlowValue[],
  assetsOrderd: AssetMetaInfo[],
  isRefetching: boolean // refetching에서만 동작하도록 할 수도 있고, 이게 더 나아보임.
) => {
  // assetsOrder는 페이지내 변하지 않는다, dataSource는 fetch시에만 변함
  const updateMarkData = useCallback(
    () => makeUpdateMarkData(dataSource, assetsOrderd),
    [dataSource && isRefetching, assetsOrderd]
  );
  const [markData, setMarkData] = useRecalculatableState({
    initState: markDataInit,
    dependentRecalculator: updateMarkData,
  });
};

export default useRenewableMarkData;
