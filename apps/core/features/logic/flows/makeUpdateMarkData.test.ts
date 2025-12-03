import {
  AssetMetaInfo,
  MarkData,
} from '../../../widgets/flows/ui/ORGANISMS/ActualFlowChart/ActualFlowEchartsNew';
import { MarkDataContent } from '../../../entities/flows/atoms/actualFlowFocusAtoms';
import { FlowValue } from '../../hooks/queries/flows/useFlowsActualQuery';

import makeUpdateMarkData from './makeUpdateMarkData';

/**
 * MarkData의 aassetId랑 dataIndex를 활용해서, 해당 데이터에 접근한 뒤,
 * value, accumulatedValue를 최신화하는 것.
 *
 * 왜냐면 FlowValue 구조때메 assetId랑 dataIndex만 있으면 데이터 접근 가능.
 * */
const markData: MarkData = {
  // 필요한 데이터만
  markdata1: {
    accumulatedValue: 334,
    assetId: 2,
    dataIndex: 1,
    date: '2025-05-17',
    value: 221,
    seriesIndex: 1,
  },
};
// 데이터 쌓이는 순서는 dataDimension을 따른다.

const assetsOrdered: AssetMetaInfo[] = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
];

const chartCurDataSource: FlowValue[] = [
  { date: '2025-05-16', 1: 1, 2: 2, 3: 3 },
  { date: '2025-05-17', 1: 11, 2: 22, 3: 33 },
  { date: '2025-05-18', 1: 111, 2: 222, 3: 333 },
];

describe('makeUpdateMarkData 테스트들', () => {
  /**
   * dataSource에서 markData의 정보를 활용해 타겟을 참조하고, value, accmulatedValue를 최신화 한다.
   * accumulatedValue를 최신화 할 때는, dataDimension을 활용해 계산한다
   */
  const updateMarkData = makeUpdateMarkData(chartCurDataSource, assetsOrdered);

  test(`1개만 업데이트 할 때`, () => {
    //
    const resultMarkData = updateMarkData(markData);

    const targetKey = 'markdata1';

    const prevMarkDataContent: MarkDataContent = markData[targetKey];
    const targetValueOnDate = chartCurDataSource[prevMarkDataContent.dataIndex];
    const accAssetIds = assetsOrdered
      .filter((item, idx) => idx <= prevMarkDataContent.seriesIndex)
      .map((item) => item.id);

    const expValue = targetValueOnDate[prevMarkDataContent.assetId];
    const expAccValue = accAssetIds.reduce(
      (accSum, id) => accSum + targetValueOnDate[id],
      0
    );

    const expectation: MarkData = {
      [targetKey]: {
        ...prevMarkDataContent,
        value: expValue,
        accumulatedValue: expAccValue,
      } as MarkDataContent,
    };

    expect(resultMarkData).toEqual(expectation);
  });

  test('여러개-2개- 업데이트 해보자.', () => {
    // markData에 하나 더 넣어보자.
    const targetKeys = ['markdata1', 'markdata2'];

    const markDataHaving2 = {
      [targetKeys[0]]: {
        ...markData[targetKeys[0]],
      },
      [targetKeys[1]]: {
        accumulatedValue: 123123,
        assetId: 3,
        dataIndex: 0,
        date: '2025-05-16',
        value: 123123,
        seriesIndex: 2,
      },
    };

    const resultMarkData = updateMarkData(markDataHaving2);

    const expectation = targetKeys.reduce((acc, targetKey) => {
      const prevMarkDataContent: MarkDataContent = markDataHaving2[targetKey];
      const targetValueOnDate =
        chartCurDataSource[prevMarkDataContent.dataIndex];
      const accAssetIds = assetsOrdered
        .filter((item, idx) => idx <= prevMarkDataContent.seriesIndex)
        .map((item) => item.id);

      const expValue = targetValueOnDate[prevMarkDataContent.assetId];
      const expAccValue = accAssetIds.reduce(
        (accSum, id) => accSum + targetValueOnDate[id],
        0
      );
      return {
        ...acc,
        [targetKey]: {
          ...prevMarkDataContent,
          value: expValue,
          accumulatedValue: expAccValue,
        },
      };
    }, {} as MarkData);

    expect(resultMarkData).toEqual(expectation);
  });
});
