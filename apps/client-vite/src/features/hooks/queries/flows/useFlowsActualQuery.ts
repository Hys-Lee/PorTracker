import { useInfiniteQuery } from '@tanstack/react-query';
import queryFactory from './queryFactory';
import addDate from 'src/features/utils/addDate';
import { useEffect, useMemo, useState } from 'react';
import { ActualDataResponse } from 'src/features/fetching/flows/getActuals';
import transform2AccActualFlow from './useFlowsActualQueryLogics/transform2AccActualFlow';

interface FlowTransaction {
  price: number;
  shares: number;
  // accShares: number;
  transactionType: 'withdrawal' | 'allocation';
  exchangeRate: number;
}

interface DateField {
  date: string;
}

interface AssetIdField {
  [assetId: number]: number; // transaction이 없으면 뭐 assetId가 없으니 undefined인거지.
}

type FlowValue = DateField & AssetIdField;

interface AssetOthersFieldOnAssetId {
  accShares: number; // transactions내용 취합
  symbolPrice: number; // 없으면 0
  symbolExchangeRate: number; // 없으면 0
  transactions: FlowTransaction[];
}

interface AssetOthersField {
  [assetId: number]: AssetOthersFieldOnAssetId;
}

type FlowOtherData = DateField & AssetOthersField;

interface FlowData {
  values: {
    krwValues: FlowValue[];
    localCurrencyValues: FlowValue[];
  };
  otherData: FlowOtherData[];
}

/**
 *
 * @param endDate
 * @param size
 * @param assetIds 첫 요청은 무조건 undefined가 되도록..
 * @param transactionType
 * @returns
 */
const useFlowsActualQuery = (
  endDate: Date,
  size: number,
  assetIds?: number[],
  transactionType?: string
) => {
  const {
    data: infiniteDefaultData,
    isError,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...queryFactory.actualInfinite(endDate, size, assetIds, transactionType),
    placeholderData: {
      pageParams: [],
      pages: [
        {
          data: [],
          meta: {
            nextCursor: { endDate: '', id: 0, size: 0 },
          },
        },
      ],
    },
  });

  // const wonPerDollarRateOfToday =
  //   infiniteDefaultData?.pages[0].meta.exchangeRateOfTodayData?.[0] // 달러 하나니까.
  //     ?.standard_rate ?? 0;

  const wonPerDollarUpdateDate =
    infiniteDefaultData?.pages[0].meta.exchangeRateOfTodayData?.[0]?.updated_at; // 달러 하나니까.

  const latestAssetInfo: {
    [assetId: keyof AssetIdField]: { accShares: number; name: string };
  } = useMemo(
    () =>
      infiniteDefaultData?.pages[0].meta.latestAssetsData?.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.asset_id]: {
            accShares: cur.accumulated_shares,
            name: cur.asset.name,
          },
        }),
        {}
      ) ?? {},
    [infiniteDefaultData]
  );

  // const assetId2NameMap: { [assetId: keyof AssetIdField]: string } =
  //   infiniteDefaultData?.pages[0].meta.latestAssetsData?.reduce(
  //     (acc, cur) => ({ ...acc, [cur.asset_id]: cur.asset.name }),
  //     {}
  //   ) ?? {};

  // const assetIdDimensionOrder =
  //   infiniteDefaultData?.pages[0].meta.latestAssetsData?.map(
  //     (item) => item.asset_id
  //   );

  const [accData, setAccData] = useState<FlowData>({
    values: {
      krwValues: [],
      localCurrencyValues: [],
    },
    otherData: [],
  } as FlowData);

  //test
  console.log('위에서 accDAta: ', accData);

  useEffect(() => {
    if (!infiniteDefaultData) return;
    const latestFetchedDataIdx = infiniteDefaultData.pages.length - 1;
    const latestFetchedData =
      infiniteDefaultData.pages[latestFetchedDataIdx].data;

    /** 가변으로 최대한 효율을 따져서 처리하기. date와 인덱스의 매핑 만들어서 최대한 깔끔하게 처리해보기. */

    setAccData((prevAccData) => {
      const newAccData = transform2AccActualFlow(
        prevAccData,
        latestFetchedData,
        latestAssetInfo
      );
      return newAccData;
    });
  }, [infiniteDefaultData, latestAssetInfo]);

  /**  test용  */
  // const fetchNextPage = () => {
  //   //
  // };
  // const isError = false;
  // const isPending = false;
  // const hasNextPage = false;
  // const accData

  return {
    fetchNextPage,
    isError,
    isPending,
    hasNextPage,
    data: { accData, wonPerDollarUpdateDate, latestAssetInfo },
  };
};

export default useFlowsActualQuery;
export {
  FlowValue,
  FlowData,
  FlowTransaction,
  FlowOtherData,
  AssetOthersFieldOnAssetId,
  AssetOthersField,
};
