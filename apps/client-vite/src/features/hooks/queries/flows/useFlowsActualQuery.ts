import { useInfiniteQuery } from '@tanstack/react-query';
import queryFactory from './queryFactory';
import addDate from 'src/features/utils/addDate';
import { useEffect, useState } from 'react';
import { ActualDataResponse } from 'src/features/fetching/flows/getActuals';

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

interface FetchedTransformedData {
  values: {
    krwValues: { [date: DateField['date']]: AssetIdField };
    localCurrencyValues: { [date: DateField['date']]: AssetIdField };
  };
  otherData: { [date: DateField['date']]: AssetOthersField };
}

// interface FlowInfo {
//   data: FlowData;
//   date: string[];
// }

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

  const wonPerDollarRateOfToday =
    infiniteDefaultData?.pages[0].meta.exchangeRateOfTodayData?.[0] // 달러 하나니까.
      ?.standard_rate ?? 0;

  const wonPerDollarUpdateDate =
    infiniteDefaultData?.pages[0].meta.exchangeRateOfTodayData?.[0]?.updated_at; // 달러 하나니까.

  // const latestAssetsData =
  //   infiniteDefaultData?.pages[0].meta.latestAssetsData?.reduce(
  //     (acc, assetData) => {
  //       const assetName = assetData.asset.name;
  //       return {
  //         ...acc,
  //         [assetName]: [
  //           {
  //             accShares: assetData.accumulated_shares,
  //             krwValue: assetData.accumulated_shares * assetData.latest_price,
  //             localCurrencyValue:
  //               assetData.accumulated_shares *
  //               assetData.latest_price *
  //               wonPerDollarRateOfToday,
  //             metaData: [],
  //           },
  //         ],
  //       };
  //     },
  //     {}
  //   ) ?? {};

  const latestAssetInfo: {
    [assetId: keyof AssetIdField]: { accShares: number; date: string };
  } =
    infiniteDefaultData?.pages[0].meta.latestAssetsData?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.asset_id]: { accShares: cur.accumulated_shares },
      }),
      {}
    ) ?? {};

  const assetId2NameMap: { [assetId: keyof AssetIdField]: string } =
    infiniteDefaultData?.pages[0].meta.latestAssetsData?.reduce(
      (acc, cur) => ({ ...acc, [cur.asset_id]: cur.asset.name }),
      {}
    ) ?? {};

  const assetIdDimensionOrder =
    infiniteDefaultData?.pages[0].meta.latestAssetsData?.map(
      (item) => item.asset_id
    );

  const [accData, setAccData] = useState<FlowData>({} as FlowData);

  useEffect(() => {
    if (!infiniteDefaultData) return;
    const latestFetchedDataIdx = infiniteDefaultData.pages.length - 1;
    const latestFetchedData =
      infiniteDefaultData.pages[latestFetchedDataIdx].data;

    if (latestFetchedDataIdx == 0) {
      // 첫 fetch에는 오늘 데이터와 accShares 최종을 덧붙이기.
      const today = new Date().toISOString();
      const initValues = (assetIdDimensionOrder as number[]).reduce(
        (acc, assetId) => ({ ...acc, [assetId]: 0 }),
        {}
      );
      const initOtherData = (assetIdDimensionOrder as number[]).reduce(
        (acc, assetId) => ({
          ...acc,
          [assetId]: {
            accShares: latestAssetInfo[assetId].accShares, // transactions내용 취합
            symbolPrice: 0, // 없으면 0
            symbolExchangeRate: 0, // 없으면 0
            transactions: [],
          },
        }),
        {}
      );

      setAccData(() => ({
        values: {
          krwValues: [{ ...initValues, date: today }],
          localCurrencyValues: [{ ...initValues, date: today }],
        },
        otherData: [{ ...initOtherData, date: today }],
      }));
    }

    // 일단 이번 fetch에 대해 만들고 (데이터는 옛날게 0번째임.)

    /** 가변으로 최대한 효율을 따져서 처리하기. date와 인덱스의 매핑 만들어서 최대한 깔끔하게 처리해보기. */

    setAccData((prevAccData) => {
      /** 밑에는 불변으로 처리했던거. 얕은 복사라도 reduce의 누적을 사용하니 O(N^2)라 일단 포기 */
      // const curFlowData:FetchedTransformedData = {
      //   values:{
      //     krwValues:{},
      //     localCurrencyValues:{},
      //   },
      //   otherData:{}
      // }
      // const curTransactionsByDate =
      //  latestFetchedData.reduce((acc,fetchedTransaction)=>{
      //   const curDate = fetchedTransaction.date;
      //   const assetId = fetchedTransaction.asset_id;
      //   const transaction  : FlowTransaction = {
      //     price:fetchedTransaction.price,
      //     exchangeRate:fetchedTransaction.exchange_rate,
      //     shares:fetchedTransaction.shares,
      //     transactionType:fetchedTransaction.transaction_type as 'withdrawal' | 'allocation'
      //   }
      //   const prevTransactions = (acc[curDate][assetId].transactions??[]);
      //   return {...acc, [curDate]:{
      //     ...acc[curDate], [assetId]:{
      //       transactions:[...prevTransactions, transaction],
      //     }
      //   }}
      // },{} as {[date:string]:{[assetId:number]:{transactions:FlowTransaction[]}
      //   }});
      //   // curOtherData 나머지 채우기
      // const curOtherData :FetchedTransformedData['otherData']= Object.entries(curTransactionsByDate).reduce((accCurOtherData,[date, assetTransactions])=>{
      //   const assetOtherData = Object.entries(assetTransactions).reduce((accOtherOnAsset,[assetIdString, {transactions}])=>{
      //     const assetId = Number(assetIdString);
      //     if (transactions.length<=0) return {...accOtherOnAsset};
      //     const accShares = transactions?.reduce((acc,curTransaction)=>{
      //       return acc+ (curTransaction.transactionType==='withdrawal'?-1*curTransaction.price:curTransaction.price)
      //     },0)
      //     const lastTransactionIdx = transactions.length-1;
      //     const lastPrice = transactions[lastTransactionIdx].price;
      //     const lastExchangeRate = transactions[lastTransactionIdx].exchangeRate;
      //     const others:AssetOthersFieldOnAssetId = {transactions, accShares, symbolPrice:lastPrice, symbolExchangeRate:lastExchangeRate}
      //     return {...accOtherOnAsset,[assetId]: others}  as AssetOthersField
      //   },{});
      //   return {...accCurOtherData, [date]:assetOtherData}
      // },{});
      // // curFlowData 채우기
      // Object.entries(curOtherData).forEach(([date, assetTransactions])=>{
      //   Object.entries(assetTransactions).forEach(([assetIdString, otherDataInfo])=>{
      //     const assetOtherData:AssetOthersFieldOnAssetId =   otherDataInfo;
      //     const krwValue = (assetOtherData).accShares * assetOtherData.accShares;
      //     const localCurrencyValue = assetOtherData.symbolExchangeRate * krwValue;
      //     curFlowData.values.krwValues = {}
      //   })
      // })
    });
    // 합칠 때, 날짜가 겹치는거(최대 1개)가 있다면 따로 처리하기(krw,local, others각각)
  }, []);
  /** 밑은 과거 코드ㅌㅌ */
  // const today = new Date();
  // const todayString = `${today.getFullYear()}-${
  //   today.getMonth() + 1
  // }-${today.getDate()}`;

  //   const [accData, setAccData] = useState<FlowInfo>({
  //     values: {},
  //     date: [],
  //   } as FlowInfo);

  //   useEffect(() => {
  //     const newlyFetchedPageInfo =
  //       infiniteDefaultData?.pages[infiniteDefaultData?.pages.length - 1];
  //     if (!newlyFetchedPageInfo || newlyFetchedPageInfo?.data.length === 0)
  //       return;

  //     // 초기 데이터 넣기...
  //     if (infiniteDefaultData.pages.length === 1) {
  //       setAccData({ values: latestAssetsData, date: [todayString] });
  //       // return;
  //     }

  //     const date = [
  //       ...new Set(newlyFetchedPageInfo.data.map((item) => item.date)),
  //     ].sort();

  //     const dateIndexMapping = date.reduce((mapping, date, idx) => {
  //       return { ...mapping, [date]: idx };
  //     }, {} as { [date: string]: number });

  //     setAccData((prevAccData) => {
  //       const newValues = makeValues(
  //         prevAccData,
  //         dateIndexMapping,
  //         newlyFetchedPageInfo.data,
  //         date
  //       );

  //       const isDateDuplicated = prevAccData.date[0] === date[date.length - 1];

  //       const resDate = [
  //         ...(isDateDuplicated ? date.slice(1) : date),
  //         ...prevAccData.date,
  //       ];
  //       //test
  //       console.log('RESDATE: ', resDate);

  //       return {
  //         values: newValues,
  //         date: resDate,
  //       };
  //     });
  //   }, [infiniteDefaultData?.pages]);

  return {
    fetchNextPage,
    isError,
    isPending,
    hasNextPage,
    data: { accData, wonPerDollarUpdateDate },
  };
};

export default useFlowsActualQuery;
export {
  FlowData,
  FlowTransaction,
  FlowOtherData,
  AssetOthersFieldOnAssetId,
  AssetOthersField,
};
// export { FlowData, FlowAssetTransactions, FlowInfo };

// function makeValues(
//   prevAccData: FlowInfo,
//   dateIndexMapping,
//   newlyFetchedPageInfo: ActualDataResponse['data'],
//   date
// ) {
//   const buildMetadata = (
//     asset: string,
//     date: string,
//     transactions: ActualDataResponse['data']
//   ): FlowAssetTransactions[] => {
//     return transactions
//       .filter(
//         (transaction) =>
//           transaction.date === date && transaction.asset.name === asset
//       )
//       .map((filtered) => ({
//         price: filtered.price,
//         transactionType:
//           filtered.transaction_type as FlowAssetTransactions['transactionType'],
//         shares: filtered.shares,
//         exchangeRate: filtered.exchange_rate,
//       }));
//   };

//   const buildNewValueInfos = (
//     asset: string,
//     latelyTransactionValue: {
//       krwValue: number;
//       localCurrencyValue: number;
//       accShares: number;
//       metaData: FlowAssetTransactions[];
//     }[],
//     datesFornewValueInfos: string[],
//     newTransactions: ActualDataResponse['data']
//   ) => {
//     // prev에서 첫 Transaction까지 포함.
//     const prevFirstTransactionIdx = latelyTransactionValue.findIndex(
//       (valueInfo) => valueInfo.metaData.length > 0
//     );
//     const prevNotUpdatedLastIdx =
//       prevFirstTransactionIdx >= 0
//         ? prevFirstTransactionIdx
//         : latelyTransactionValue.length - 1; // 못찾으면 마지막 요소인 latest-asset-state

//     const prevNotUpdated = latelyTransactionValue.slice(
//       0,
//       prevNotUpdatedLastIdx + 1
//     );
//     const prevUpdated = latelyTransactionValue.slice(prevNotUpdatedLastIdx + 1);

//     const descendingDate = datesFornewValueInfos.reverse();
//     const valueInfosApplyOnMetaDataByDescendingDate = descendingDate.reduce(
//       (resOnPrevDate, date, curDateIdx) => {
//         const curMetaDatas: FlowAssetTransactions[] = buildMetadata(
//           asset,
//           date,
//           newTransactions
//         );
//         const hasTransaction = curMetaDatas.length > 0;
//         const prevDeltaShares =
//           curDateIdx > 0
//             ? resOnPrevDate[resOnPrevDate.length - 1].metaData.reduce(
//                 (acc, cur) =>
//                   acc +
//                   (cur.transactionType === 'withdrawal'
//                     ? -1 * cur.price
//                     : cur.price),
//                 0
//               )
//             : 0;

//         const prevAccShares =
//           curDateIdx > 0
//             ? resOnPrevDate[resOnPrevDate.length - 1].accShares
//             : prevNotUpdated[prevNotUpdated.length - 1].accShares;

//         // accShares는 언제나 최근 날짜로부터 참조가능
//         const accShares = hasTransaction
//           ? prevAccShares - prevDeltaShares
//           : prevAccShares;

//         // 값은 과거 데이터가 필요함.
//         const krwValue = hasTransaction
//           ? accShares * curMetaDatas[curMetaDatas.length - 1].price
//           : 0;
//         const localCurrencyValue = hasTransaction
//           ? krwValue * curMetaDatas[curMetaDatas.length - 1].exchangeRate
//           : 0;

//         return [
//           ...resOnPrevDate,
//           {
//             accShares,
//             krwValue,
//             localCurrencyValue,
//             metaData: curMetaDatas,
//           },
//         ];
//       },
//       [] as typeof latelyTransactionValue
//     );
//     const valueInfosApplyOnMetaData =
//       valueInfosApplyOnMetaDataByDescendingDate.reverse();

//     /// notUpdated랑 합치기  -> notUpdated[0]이랑 비교.
//     const isDateDuplicated =
//       prevAccData.date[0] ===
//       datesFornewValueInfos[datesFornewValueInfos.length - 1];

//     const metaDataOnDuplicated = isDateDuplicated
//       ? [
//           ...prevNotUpdated[0].metaData,
//           ...valueInfosApplyOnMetaData[valueInfosApplyOnMetaData.length - 1]
//             .metaData,
//         ]
//       : [];

//     const valueInfosWithNotUpdated = isDateDuplicated
//       ? [
//           ...valueInfosApplyOnMetaData.slice(
//             0,
//             valueInfosApplyOnMetaData.length - 1
//           ),
//           {
//             // accShares도 최신 데이터를 따라야 함.
//             ...prevNotUpdated[0],
//             metaData: metaDataOnDuplicated,
//           },
//           ...prevNotUpdated.slice(1),
//         ]
//       : [...valueInfosApplyOnMetaData, ...prevNotUpdated];

//     const updatedValuInfos = valueInfosWithNotUpdated.reduce(
//       (acc, cur, idx) => {
//         if (idx === 0) return [cur];
//         if (idx === valueInfosWithNotUpdated.length - 1) return [...acc, cur]; // 맨 마지막은 참조읽기용이라 제외

//         const hasTransaction = cur.metaData.length > 0;
//         if (hasTransaction) return [...acc, cur];

//         const priorValueInfo = acc[acc.length - 1];
//         const krwValue = priorValueInfo.krwValue;
//         const localCurrencyValue = priorValueInfo.localCurrencyValue;
//         return [
//           ...acc,
//           {
//             ...cur,
//             krwValue,
//             localCurrencyValue,
//           },
//         ];
//       },
//       [] as typeof valueInfosWithNotUpdated
//     );

//     const resValueInfos = [...updatedValuInfos, ...prevUpdated];
//     return resValueInfos;
//   };
//   const result = Object.entries(prevAccData.values).reduce(
//     (acc, [asset, valueInfosOnAsset]) => {
//       const newValueInfos = buildNewValueInfos(
//         asset,
//         valueInfosOnAsset,
//         date,
//         newlyFetchedPageInfo
//       );
//       return {
//         ...acc,
//         [asset]: newValueInfos,
//       };
//     },
//     {}
//   );

//   return result;
// }
