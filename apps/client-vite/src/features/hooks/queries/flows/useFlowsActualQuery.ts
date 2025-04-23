import { useInfiniteQuery } from '@tanstack/react-query';
import queryFactory from './queryFactory';
import addDate from 'src/features/utils/addDate';
import { useEffect, useState } from 'react';

type FlowDataValuesMetaDataType = {
  price: number;
  shares: number;
  accShares: number;
  transactionType: 'withdrawal' | 'allocation';
  exchangeRate: number;
};
type FlowDataValuesType = {
  [assetName: string]: {
    krwValue: number;
    localCurrencyValue: number;
    metaData: FlowDataValuesMetaDataType[];
  }[];
};

type FlowDataType = {
  values: FlowDataValuesType;
  date: string[];
};

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
  // 밑은 쿼리로 받아오는 현재 금액  (endDate에서의 금액으로 해도 될 듯.)
  // 자산별 금액이랑, 환율 같은거 있으면 좋을 듯.
  const endDateTotalMoney = {} as { [assetName: string]: number };
  // ㄴ> 근데, 이게 주가 따라 변동하게 되면, 쿼리 가져오는 동안에도 변하지 않나?
  //  ㄴ> 해결하는 간단한 방법은 전날 종가 혹은 당일 시가(시작)를 가져오게 하는거임.
  // endDate이니까, 이 때의 종가를 가져오게 하면 되겠네.
  //   ㄴ>근데 생각해보면 정확하지는 않지...
  //      왜냐면, 제일 처음 금액은 고정이어야 하걸랑. 0으로.
  //      근데, 제일 마지막 가격을 기준으로 변동량을 사용해 과거로 가며 계산하면,
  //      처음 금액이 0이 아닐 수도 있잖슴.
  //
  //  기록이라서 사실 기반이긴 한데... 그러면 매매마다 당시의 총평가액 같은걸 갖게 해야하나?

  // 밑은 무한 쿼리로 받아오는 거래 내용 (변화량)
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
          data: [
            // {
            //   assetId: 0, // 없는 인덱스. 1부터 시작이라.
            //   currency: 'USD',
            //   date: '2023-10-01',
            //   exchange_rate: 1,
            //   id: 1,
            //   price: 1000,
            //   shares: 1,
            //   accumulated_shares: 1,
            //   transaction_type: 'allocation',
            // },
          ],
          meta: {
            nextCursor: { endDate: '', id: 0, size: 0 },
          },
        },
      ],
    },
  });

  // test
  console.log('infiniteDefaultData: ', infiniteDefaultData);

  // const assetMaps: AssetMappingDataType =
  //   (infiniteDefaultData?.pages[0].meta.assetMappingData as {
  //     idToName: {
  //       [id: number]: string;
  //     };
  //     nameToId: {
  //       [name: string]: number;
  //     };
  //   }) ?? {};

  const latestAssetsData =
    infiniteDefaultData?.pages[0].meta.latestAssetsData?.reduce(
      (acc, assetData) => {
        const assetName = assetData.asset_id;
        return {
          ...acc,
          [assetName]: {
            accumulatedShares: assetData.accumulated_shares,
            latestPrice: assetData.latest_price,
            updatedAt: assetData.updated_at,
          },
        };
      },
      {}
    );

  //////////
  // accData는 옛날~최신 순서로.

  const [accData, setAccData] = useState<FlowDataType>({
    values: {},
    date: [],
  } as FlowDataType);

  useEffect(() => {
    const newlyFetchedPageInfo =
      infiniteDefaultData?.pages[infiniteDefaultData?.pages.length - 1];
    if (!newlyFetchedPageInfo?.data) return;

    // 밑에처럼 반복에 액션을 넣고싶지 않다면,
    // 그냥 마지막 페이지의 데이터를 가공해서 상태랑 붙이는게 나을 듯.

    // 날짜 유니크 오름차순
    const date = [
      ...new Set(newlyFetchedPageInfo.data.map((item) => item.date)),
    ].sort();

    const dateIndexMapping = date.reduce((mapping, date, idx) => {
      return { ...mapping, [date]: idx };
    }, {} as { [date: string]: number });

    setAccData((prevAccData) => {
      const newValues = makeValues(
        prevAccData,
        dateIndexMapping,
        newlyFetchedPageInfo,
        // assetMaps,
        date
      );
      //test
      console.log('prevAccData, newValues: ', prevAccData, newValues);

      // asset이 new에는 없는 애들은 padding해야지.. 이건 new에서 해줘도 되는거 아님?

      // 날짜 겹치는게 있는지 체크해야함. => "각 asset에 대해".

      if (date[date.length - 1] === prevAccData.date[0]) {
        const resDate = [
          ...date.slice(0, date.length - 1), // 겹치는거 하나 제거
          ...prevAccData.date,
        ];
        const resValues = makeResValue(newValues, prevAccData);
        // const resValues = Object.entries(prevAccData.values).reduce(
        //   (acc, [assetName, prevValueInfos]) => {
        //     const prevCorrectDataOnAsset = prevValueInfos.slice(
        //       1,
        //       prevValueInfos.length
        //     );
        //     const newCorrectDataOnAsset = newValues[assetName].slice(
        //       0,
        //       newValues[assetName].length - 1
        //     );
        //     return {
        //       ...acc,
        //       [assetName]: [
        //         ...prevCorrectDataOnAsset,
        //         dataOnDuplicatedDate[assetName],
        //         ...newCorrectDataOnAsset,
        //       ],
        //     };
        //   },
        //   {}
        // );

        return {
          date: resDate,
          values: resValues,
        };
      }
      // asset마다 합쳐줘야 함.
      // newValues에는 prev에 있는 asset까지 다 들어있으므로, 이를 기반으로 합치기.
      const resValues = Object.entries(newValues).reduce(
        (acc, [assetName, valueInfos]) => {
          return {
            ...acc,
            [assetName]: [
              ...valueInfos,
              ...(prevAccData.values?.[assetName] ?? []),
            ], // 없을 수도 있으니.
          };
        },
        {}
      );
      return {
        values: resValues,
        date: [...date, ...prevAccData.date],
      };
    });
  }, [infiniteDefaultData?.pages]);

  // ////////

  // const totalCount = infiniteDefaultData?.pages[0].meta?.total ?? 0;
  // const existCount =
  //   infiniteDefaultData?.pages.reduce(
  //     (accsum, page) => page.data.length + accsum,
  //     0
  //   ) ?? 0;
  // const hasNextPage = totalCount - existCount > 0;

  return {
    fetchNextPage,
    isError,
    isPending,
    hasNextPage,
    data: accData,
  };
};

export default useFlowsActualQuery;
export { FlowDataValuesType, FlowDataValuesMetaDataType, FlowDataType };

function makeValues(
  prevAccData,
  dateIndexMapping,
  newlyFetchedPageInfo,
  // assetMaps: AssetMappingDataType,
  date
) {
  const makeValueInfoInit = () => ({
    krwValue: 0,
    localCurrencyValue: 0,
    metaData: [],
  });
  // data 초기화 (존재하는 asset들 []로 초기화)
  const dataInit: FlowDataValuesType = newlyFetchedPageInfo.data.reduce(
    (acc, cur) => {
      // test
      console.log(
        'dataInit안에서: newlyFetchedPageInfo,assetMaps: ',
        newlyFetchedPageInfo
        // assetMaps
      );
      const assetName = cur.asset.name;
      return {
        ...acc,
        [assetName]: new Array(
          date.length +
            (prevAccData.values[assetName] ? 0 : prevAccData.date.length) // 이전 내용에 존재하면 현재 fetch 내용만 고려. 처음 들어온거면 이전 고려해서 데이터 쌓아야 하니.
        ).fill(makeValueInfoInit()),
      };
    },
    {}
  );
  // test
  console.log('dataInit: ', dataInit);
  // 기존에 있던 asset들도 padding위한 초기화
  const prevAssetInit: FlowDataValuesType = Object.entries(
    prevAccData.values
  ).reduce((acc, [assetName]) => {
    return {
      ...acc,
      [assetName]: new Array(date.length).fill(makeValueInfoInit()),
    };
  }, {});
  const data = { ...prevAssetInit, ...dataInit };

  // 각 asset대해 date위치에 맞는 위치에만 데이터 넣기
  // mutation 방식임을 표현하기 위해 for문을 사용함.
  // metaData채우기.
  for (let i = 0; i < newlyFetchedPageInfo.data.length; i++) {
    const curDate = newlyFetchedPageInfo.data[i].date;
    const dataIdx = dateIndexMapping[curDate];
    const valueInfo = {
      price: newlyFetchedPageInfo.data[i].price,
      transactionType:
        (newlyFetchedPageInfo.data[i].transaction_type as
          | 'withdrawal'
          | 'allocation') ?? 'allocation',
      shares: newlyFetchedPageInfo.data[i].shares,
      accShares: newlyFetchedPageInfo.data[i].accumulated_shares,
      exchangeRate: newlyFetchedPageInfo.data[i].exchange_rate,
    };

    //mutation
    const assetName = newlyFetchedPageInfo.data[i].asset.name;
    data[assetName][dataIdx].metaData.push(valueInfo);
  }

  // 빈 부분 채우기... padding 맹키로다가
  // 근데, 한 날짜에 withdrawal이랑 allocation이 있을 수 있는데,
  // 이걸 채울 순 없지 않나?  value값은 당시 값으로 하고, 이거는 하나.
  //// 이거 말고 withdrwal같은 타입이나 변화량 같은 정보는 따로 넣을 수 없나? 넣어도 된다.
  // 어차피 "$"로 계산하고, 현재 환율에 따라서만 변환하는거잖슴?
  // 따라서 계산은 그냥 달러로 한다고 생각하면 됨.
  // 여기서는 최신것부터(맨 뒤부터) metaData가 없다면 money를 그대로, 있다면 계산해서 넣어주면 됨.

  // 이 밑의 계산 다시해야함. 제일 최근이면 맨 뒤쪽부터 계산해야했음.

  // 결국 훨씬 간단해졌는데? 누적 shares만으로 그냥 계산 갈기면 될 듯.
  // 겹치는 날짜 빼고는 순서 상관할 필요가 없을 듯..
  // 아래는 겹치는 것 고려X 전체 대상 계산.

  Object.entries(data).forEach(([assetName, dataOnAsset]) => {
    dataOnAsset.forEach((valueInfo, idx) => {
      if (valueInfo.metaData.length > 0) {
        // 거래 내용이 있다면
        const metaData = valueInfo.metaData;
        const lastMetaData = metaData[metaData.length - 1];
        const localCurrencyValue = lastMetaData.accShares * lastMetaData.price;
        const localExchangeRate = metaData[metaData.length - 1].exchangeRate;
        const krwValue = localCurrencyValue * localExchangeRate;

        valueInfo.localCurrencyValue = localCurrencyValue;
        valueInfo.krwValue = krwValue;
      } else {
        // 거래 내용이 없다면 -> 단순 패딩
        // 어차피 과거 값으로 들어가는거라서, 이전 데이터랑 무관하게
        // 0번째 valueInfo라면 value는 0이어야 함.
        const prevValueInfo =
          idx > 0
            ? {
                krwValue: dataOnAsset[idx - 1].krwValue,
                localCurrencyValue: dataOnAsset[idx - 1].localCurrencyValue,
              }
            : { krwValue: 0, localCurrencyValue: 0 }; //dataOnAsset prevAccData[assetName][0].value;

        valueInfo.krwValue = prevValueInfo.krwValue;
        valueInfo.localCurrencyValue = prevValueInfo.localCurrencyValue;
      }
    });
  });

  return data;
}

function makeResValue(newValues, prevAccData) {
  // data는 가격은 이전 데이터가 최신이므로 이를 사용.  metaData만 합치면 됨.
  const metaDataOnDuplicatedDate = Object.entries(newValues).reduce(
    (acc, [assetName, valueInfos]) => {
      //test
      console.log(
        'prevAccData.values,assetName',
        prevAccData.values,
        assetName
      );

      const prevMetaData = prevAccData.values[assetName]?.[0].metaData ?? []; // 최근 날짜 대한. prev에 해당 asset은 없을 수 있으니.
      const newMetaData = valueInfos[valueInfos.length - 1].metaData; // 옛날 날짜 대한.
      return { ...acc, [assetName]: [...newMetaData, ...prevMetaData] };
    },
    {} as { [assetName: string]: FlowDataValuesMetaDataType[] }
  );
  // 이거 누적 데이터를 사용해야지. 그게 더 최신 날짜 데이터니까.
  const dataOnDuplicatedDate = Object.entries(prevAccData.values).reduce(
    (acc, [assetName, valueInfos]) => {
      const recentValues = valueInfos[0];
      return {
        ...acc,
        [assetName]: [
          {
            ...recentValues,
            metaData: metaDataOnDuplicatedDate[assetName],
          },
        ],
      };
    },
    {} as {
      [assetName: string]: {
        krwValue: number;
        localCurrencyValue: number;
        metaData: {
          price: number;
          shares: number;
          accShares: number;
          transactionType: 'withdrawal' | 'allocation';
          exchangeRate: number;
        }[];
      }[];
    }
  );

  // newValues에는 prev에 있는 asset까지 다 들어있으므로, 이를 기반으로 합치기.
  const resValues = Object.entries(newValues).reduce(
    (acc, [assetName, newValueInfos]) => {
      const newCorrectDataOnAsset = newValueInfos.slice(
        0,
        newValueInfos.length - 1
      );
      const prevCorrectDataOnAsset =
        prevAccData.values[assetName]?.slice(
          1,
          prevAccData.values[assetName].length
        ) ?? []; // 없을 수 있으니.

      return {
        ...acc,
        [assetName]: [
          ...newCorrectDataOnAsset,
          ...(dataOnDuplicatedDate[assetName] ?? []), // asset에서 중복된게 없을수도 있으니.
          ...prevCorrectDataOnAsset,
        ],
      };
    },
    {}
  );
  return resValues;
}
