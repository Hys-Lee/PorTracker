import {
  FlowData,
  FlowTransaction,
  FlowOtherData,
  AssetOthersFieldOnAssetId,
  AssetOthersField,
} from '../useFlowsActualQuery';
import { ActualDataResponse } from 'src/features/fetching/flows/getActuals';
function transform2AccActualFlow(
  prevAccData: FlowData,
  latestFetchedData: ActualDataResponse['data'],
  latestAssetInfo: { [assetId: number]: { accShares: number; name: string } }
) {
  //
  // const snapshotDeepCopyHelper = (objectWithDateAndAssetId) => {
  //   return Object.entries(objectWithDateAndAssetId).reduce(
  //     (acc, [fieldName, value]) => {
  //       if (typeof value !== 'object') return { ...acc, [fieldName]: value };
  //       if (value instanceof Array) return { ...acc, [fieldName]: [...value] };
  //       // 이제는 object일 것임. Array제외하곤.
  //       return { ...acc, [fieldName]: snapshotDeepCopyHelper(value) };
  //     },
  //     {}
  //   );
  // };
  const emptyOtherDataElement = Object.entries(latestAssetInfo).reduce(
    (acc, [assetId, { accShares }]) => {
      return {
        ...acc,
        [assetId]: {
          accShares,
          symbolPrice: 0,
          symbolExchangeRate: 0,
          transactions: [],
        },
      };
    },
    {} as AssetOthersField
  );

  const prevLatelyFlowData =
    // !isInitFetch
    //   ? {
    //       values: {
    //         krwValue: prevAccData.values.krwValues[0],
    //         localCurrencyValue: prevAccData.values.localCurrencyValues[0],
    //       },
    //       otherData: prevAccData.otherData[0],
    //     }
    //   : {
    //       values: {
    //         krwValue: {},
    //         localCurrencyValue: {},
    //       },
    //       otherData: {},
    //     };
    {
      values: {
        krwValue: { ...(prevAccData.values.krwValues?.[0] ?? {}) },
        localCurrencyValue: {
          ...(prevAccData.values.localCurrencyValues?.[0] ?? {}),
        },
      },
      otherData: prevAccData.otherData[0]
        ? Object.entries(prevAccData.otherData[0]).reduce(
            (acc, [assetIdOrNot, value]) => {
              if (Number.isNaN(Number(assetIdOrNot)))
                return { ...acc, [assetIdOrNot]: value };

              const assetId = Number(assetIdOrNot);
              const assetData = value as AssetOthersFieldOnAssetId;
              return {
                ...acc,
                [assetId]: {
                  ...assetData,
                  transactions: [...assetData.transactions],
                },
              };
            },
            {} as FlowOtherData
          )
        : (emptyOtherDataElement as FlowOtherData),
    };

  const isInitFetch = prevAccData.otherData.length === 0; //otherData가 아니라도 상관 없지만..

  // prev의 0번째까지 포함해서 초기 데이터 만들기. -> 살아있는 asset들 다 있으니 이를 활용.

  const uniqueAscendingDates = [
    ...new Set(
      isInitFetch
        ? latestFetchedData.map((fetchedData) => fetchedData.date)
        : [
            ...latestFetchedData.map((fetchedData) => fetchedData.date),
            prevLatelyFlowData.otherData.date,
          ]
    ),
  ].sort();

  const date2IdxMap: { [date: string]: number } = uniqueAscendingDates.reduce(
    (acc, date, idx) => {
      if (!date) return acc;
      return { ...acc, [date]: idx };
    },
    {}
  );

  // 초기화 헬퍼 함수
  const initHelper = (dates, spread) => {
    return dates.map((date, idx) => {
      // 마지막만 다른거 채우기
      if (idx === dates.length - 1) {
        return {
          ...spread,
          date,
        };
      }
      return { date };
    });
  };

  // 초기화
  const curFlowData: FlowData = {
    values: {
      krwValues: initHelper(
        uniqueAscendingDates,
        prevLatelyFlowData.values.krwValue
      ),
      // uniqueAscendingDates.map((date, idx)=>{
      //   if (idx===uniqueAscendingDates.length-1){
      //     return {
      //       ...prevLatelyFlowData.values.krwValue,
      //       date,
      //     }
      //   }
      //   return ({date})}),
      localCurrencyValues: initHelper(
        uniqueAscendingDates,
        prevLatelyFlowData.values.localCurrencyValue
      ),
    },
    otherData: uniqueAscendingDates.map((date, idx) =>
      idx === uniqueAscendingDates.length - 1
        ? { ...prevLatelyFlowData.otherData, date } // prevLately.other가 없더라도 되도록
        : ({
            date,
            ...emptyOtherDataElement,
          } as FlowOtherData)
    ),
  };

  // transaction들 fetched로부터 채우기 -- fetched는 날짜 오름차순으로(오래된게 0번째로) 보내겠지.
  latestFetchedData.forEach((fetchedTransaction) => {
    const transactionDate = fetchedTransaction.date;
    const assetId = fetchedTransaction.asset_id;
    const transactionInfo: FlowTransaction = {
      price: fetchedTransaction.price,
      shares: fetchedTransaction.shares,
      transactionType:
        fetchedTransaction.transaction_type as FlowTransaction['transactionType'],
      exchangeRate: fetchedTransaction.exchange_rate,
    };

    // 가변 수정 (기존 데이터가 있던 날짜라면 transaction들 순서는 달라질 수 있음... 그래도 상관 없다면 이대로 두자.)
    const assetData =
      curFlowData.otherData[date2IdxMap[transactionDate]][assetId];

    /** curFlowData의 otherData는 각 시점에서 모든 assetId를 다 들고 있으므로,
     *  fetchedData의 asset의 것에 걍 push만 해주면 됨. */
    assetData.transactions.push(transactionInfo);

    /** 아래는 initcurFLow의 otherData수정 전. */

    // if (assetData) {
    //   assetData.transactions.push(transactionInfo);
    // } else {
    //   curFlowData.otherData[date2IdxMap[transactionDate]][assetId] = {
    //     accShares: 0,
    //     symbolExchangeRate: 0,
    //     symbolPrice: 0,
    //     transactions: [transactionInfo],
    //   };
    // }
  });

  // otherData채우기 -> 이전 fetched인 accData내용이 필요 -> setAccData안에서 이뤄져야 하는 일

  /** ohterData가 각 날짜에서 모든 asset의 accShares를 갖게 된다면 futureInfo를 따로 관리할 필요가 없다! */

  // /// 처음으로 참조할 미래 데이터 만들기 -> 안의 값은 밑의 처리를 거칠 때마다 바뀌며 매 순간의 정보를 수정 및 저장하며 진행할 것임.
  // const futureInfoAtEachMoment: {
  //   [assetId: number]: {
  //     futureAccShares: number;
  //     futureDeltaShares: number;
  //   };
  // } =
  //   prevAccData.otherData.length < 2 // 첫 동작 체크(latest만 있는지)
  //     ? Object.entries(latestAssetInfo).reduce((acc, [assetId, assetInfo]) => {
  //         return {
  //           ...acc,
  //           [assetId]: {
  //             futureAccShares: assetInfo.accShares,
  //             futureDeltaShares: 0,
  //           },
  //         };
  //       }, {})
  //     : Object.entries(prevAccData.otherData[1]).reduce(
  //         (accFutureInfo, [assetIdOrDate, futureOtherDataOrDateValue]) => {
  //           // Date라면 furut
  //           if (Number.isNaN(Number(assetIdOrDate))) return accFutureInfo;

  //           const assetId = Number(assetIdOrDate);
  //           const futureOtherData = futureOtherDataOrDateValue as FlowOtherData;
  //           const futureDeltaShares = futureOtherData[
  //             assetId
  //           ].transactions.reduce((acc, curTransaction) => {
  //             return (
  //               acc +
  //               (curTransaction.transactionType === 'withdrawal'
  //                 ? -1 * curTransaction.price
  //                 : curTransaction.price)
  //             );
  //           }, 0);

  //           const futureAccShares = futureOtherData[assetId].accShares;

  //           return {
  //             ...accFutureInfo,
  //             [assetId]: { futureAccShares, futureDeltaShares },
  //           };
  //         },
  //         {}
  //       );

  //test
  console.log('transactin들 넣은 후 cur.other: ', curFlowData.otherData);

  /// 내림차순으로 처리하기
  const otherDataLastIdx = curFlowData.otherData.length - 1;
  // curFlowData.otherData.length > 0 ? curFlowData.otherData.length - 1 : 0;
  for (let i = otherDataLastIdx; i >= 0; i--) {
    const latelyOtherData = curFlowData.otherData[i];
    Object.entries(latelyOtherData).forEach(
      ([assetIdOrDate, otherDataOrDateValue]) => {
        if (Number.isNaN(Number(assetIdOrDate))) return;

        const assetId = Number(assetIdOrDate);
        const otherData = otherDataOrDateValue as AssetOthersFieldOnAssetId;
        const hasTransaction = otherData.transactions.length > 0;

        /** futureInfo없이 otherData에 transactino이 없는 날의 asset에 대해서도 accShares 비롯한 otherData를 다 넣자. */
        const futureAccShares =
          i === otherDataLastIdx // curFlow외부에서 가져와야 하는 경우
            ? prevAccData.otherData?.[1]?.[assetId].accShares ?? // prev에서 가져올 수 있는 경우 (prev에 데이터 2개 이상일 때)
              latestAssetInfo[assetId].accShares // prev에 데이터 1개 이하일 때는 latest사용
            : curFlowData.otherData[i + 1][assetId].accShares;

        const calculateDeltaShares = (transactions) => {
          if (!(transactions instanceof Array)) return 0;

          return transactions.reduce((acc, curTransaction) => {
            return (
              acc +
              (curTransaction.transactionType === 'withdrawal'
                ? -1 * curTransaction.shares
                : curTransaction.shares)
            );
          }, 0);
        };

        const futureDeltaShares =
          i === otherDataLastIdx
            ? calculateDeltaShares(
                prevAccData.otherData?.[1]?.[assetId].transactions
              ) ?? 0
            : calculateDeltaShares(
                curFlowData.otherData[i + 1][assetId].transactions
              );

        otherData.accShares = futureAccShares - futureDeltaShares;

        /** 아래는 futureInfo를 사용해서 처리하는 방법 */
        // // futureInfo를 통해 현재의 accShares결정. 현재 accShares를 갖고 있다면(0아니면) 이를 사용.
        // if (otherData.accShares === 0)
        //   otherData.accShares =
        //     futureInfoAtEachMoment[assetId].futureAccShares -
        //     futureInfoAtEachMoment[assetId].futureDeltaShares;

        // // futureInfo를 현재의 것으로 업데이트하기. (다음 사용을 위해)
        // futureInfoAtEachMoment[assetId].futureAccShares = otherData.accShares;
        // futureInfoAtEachMoment[assetId].futureDeltaShares = hasTransaction
        //   ? otherData.transactions.reduce((acc, curTransaction) => {
        //       return (
        //         acc +
        //         (curTransaction.transactionType === 'withdrawal'
        //           ? -1 * curTransaction.shares
        //           : curTransaction.shares)
        //       );
        //     }, 0)
        //   : 0;

        // transaction이 있다면, 첫번째의 것으로 symbol값들 채우기
        if (hasTransaction) {
          otherData.symbolPrice = otherData.transactions[0].price;
          otherData.symbolExchangeRate = otherData.transactions[0].exchangeRate;
        }
      }
    );
  }

  // values채우기
  curFlowData.otherData.forEach((otherData, commonIdx) => {
    Object.entries(otherData).forEach(
      ([assetIdOrDate, otherMetaDataOrDate]) => {
        if (Number.isNaN(Number(assetIdOrDate))) return;

        const assetId = Number(assetIdOrDate);
        const curOtherData = otherMetaDataOrDate as AssetOthersFieldOnAssetId;

        /** futureInfo없애면서 추가. transaction없으면 values는 안채우기 */
        if (curOtherData.transactions.length === 0) return;

        // localCurrencyValues채우기
        curFlowData.values.localCurrencyValues[commonIdx][assetId] =
          curOtherData.accShares * curOtherData.symbolPrice;
        // krwValue채우기
        curFlowData.values.krwValues[commonIdx][assetId] =
          curOtherData.accShares *
          curOtherData.symbolPrice *
          curOtherData.symbolExchangeRate;
      }
    );
  });

  // prevAccData와 합치기 prev의 1번째 인덱스부터의 것과 cur과 합치기.

  const result: FlowData = {
    values: {
      krwValues: [
        ...curFlowData.values.krwValues,
        ...prevAccData.values.krwValues.slice(1),
      ],
      localCurrencyValues: [
        ...curFlowData.values.localCurrencyValues,
        ...prevAccData.values.localCurrencyValues.slice(1),
      ],
    },
    otherData: [...curFlowData.otherData, ...prevAccData.otherData.slice(1)],
  };

  return result;
}

export default transform2AccActualFlow;
