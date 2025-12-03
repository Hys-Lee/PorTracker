import {
  FlowData,
  FlowOtherData,
  AssetOthersFieldOnAssetId,
} from '../useFlowsActualQuery';
import { ActualDataResponse } from '../../../../../features/fetching/flows/getActuals';
import transform2AccActualFlow from './transform2AccActualFlow';

const today = '2025-05-06';
const latestAssetInfo = {
  1: {
    accShares: 3,
  },
  2: {
    accShares: 2,
  },
};
const prevState: FlowData = {
  values: {
    krwValues: [],
    localCurrencyValues: [],
  },
  otherData: [],
};

describe('infiniteQuery데이터 변환 로직', () => {
  test('첫 요청 (latest asset state은 처리했다고 치고.)', () => {
    const prevState: FlowData = {
      values: {
        krwValues: [],
        localCurrencyValues: [],
      },
      otherData: [],
    };
    const targetAssetId = 1;

    const fetchedData: ActualDataResponse['data'] = [
      {
        asset_id: targetAssetId,
        asset: {
          name: 'a',
        },
        currency: 'dollar',
        date: '2025-05-05',
        exchange_rate: 1000,
        id: 111,
        price: 456,
        shares: 2,
        transaction_type: 'allocation',
      },
    ];
    const result = transform2AccActualFlow(
      prevState,
      fetchedData,
      latestAssetInfo
    );

    const expAccShares = latestAssetInfo[targetAssetId].accShares;
    const expLocalCurrencyValue = expAccShares * fetchedData[0].price;
    const expKrwValue = expLocalCurrencyValue * fetchedData[0].exchange_rate;

    const expectation: FlowData = {
      values: {
        krwValues: [
          { date: fetchedData[0].date, [fetchedData[0].asset_id]: expKrwValue },
          ...prevState.values.krwValues,
        ],
        localCurrencyValues: [
          {
            date: fetchedData[0].date,
            [fetchedData[0].asset_id]: expLocalCurrencyValue,
          },
          ...prevState.values.localCurrencyValues,
        ],
      },
      otherData: [
        {
          date: fetchedData[0].date,
          [fetchedData[0].asset_id]: {
            accShares: expAccShares,
            symbolExchangeRate: fetchedData[0].exchange_rate,
            symbolPrice: fetchedData[0].price,
            transactions: [
              {
                exchangeRate: fetchedData[0].exchange_rate,
                price: fetchedData[0].price,
                shares: fetchedData[0].shares,
                transactionType: fetchedData[0].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
          2: {
            accShares: 2,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
        },
        ...prevState.otherData,
      ],
    };

    expect(result).toEqual(expectation);
  });
  test(`1개 들어있을 때, 추가로 넣기 (안겹치는 날짜).
    futureInfo의 초기상태는 prev의 1번째여야 하는데 없으므로, 
    latest의 것을 사용해야 함. 즉, 위의 prev에 0개가 들어있을 때와 같음.
    `, () => {
    console.error('여기에용');
    const prevState: FlowData = {
      values: {
        krwValues: [{ date: '2025-05-04', 1: 333000, 2: 44400 }],
        localCurrencyValues: [{ date: '2025-05-04', 1: 333, 2: 444 }],
      },
      otherData: [
        {
          date: '2025-05-04',
          1: {
            accShares: 3,
            symbolExchangeRate: 1000,
            symbolPrice: 111,
            transactions: [
              {
                exchangeRate: 1000,
                price: 111,
                shares: 2,
                transactionType: 'allocation',
              },
              {
                exchangeRate: 1000,
                price: 111,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
          2: {
            accShares: 2,
            symbolExchangeRate: 100,
            symbolPrice: 222,
            transactions: [
              {
                exchangeRate: 100,
                price: 222,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
        },
      ],
    };

    const targetAssetId = 1;

    const fetchedData: ActualDataResponse['data'] = [
      {
        asset_id: targetAssetId,
        asset: {
          name: 'a',
        },
        currency: 'dollar',
        date: '2025-05-03',
        exchange_rate: 1200,
        id: 111,
        price: 456,
        shares: 2,
        transaction_type: 'allocation',
      },
    ];
    const result = transform2AccActualFlow(
      prevState,
      fetchedData,
      latestAssetInfo
    );
    const expAccShares = 3 - 1;
    const expLocalCurrencyValue = expAccShares * fetchedData[0].price;
    const expKrwValue = expLocalCurrencyValue * fetchedData[0].exchange_rate;
    const expectation: FlowData = {
      values: {
        krwValues: [
          { date: fetchedData[0].date, [targetAssetId]: expKrwValue },
          ...prevState.values.krwValues,
        ],
        localCurrencyValues: [
          { date: fetchedData[0].date, [targetAssetId]: expLocalCurrencyValue },
          ...prevState.values.localCurrencyValues,
        ],
      },
      otherData: [
        {
          date: fetchedData[0].date,
          [targetAssetId]: {
            accShares: expAccShares,
            symbolExchangeRate: fetchedData[0].exchange_rate,
            symbolPrice: fetchedData[0].price,
            transactions: [
              {
                exchangeRate: fetchedData[0].exchange_rate,
                price: fetchedData[0].price,
                shares: fetchedData[0].shares,
                transactionType: fetchedData[0].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
          2: {
            accShares: 3,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
        },
        ...prevState.otherData,
      ],
    };
    expect(result).toEqual(expectation);
  });
  test('이후 특정 asset이 date가 겹칠 때.', () => {
    const prevState: FlowData = {
      values: {
        krwValues: [{ date: '2025-05-04', 1: 333000, 2: 44400 }],
        localCurrencyValues: [{ date: '2025-05-04', 1: 333, 2: 444 }],
      },
      otherData: [
        {
          date: '2025-05-04',
          1: {
            accShares: 3,
            symbolExchangeRate: 1000,
            symbolPrice: 111,
            transactions: [
              {
                exchangeRate: 1000,
                price: 111,
                shares: 2,
                transactionType: 'allocation',
              },
              {
                exchangeRate: 1000,
                price: 111,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
          2: {
            accShares: 2,
            symbolExchangeRate: 100,
            symbolPrice: 222,
            transactions: [
              {
                exchangeRate: 100,
                price: 222,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
        },
      ],
    };

    const targetAssetId = 1;

    const fetchedData: ActualDataResponse['data'] = [
      {
        asset_id: targetAssetId,
        asset: {
          name: 'a',
        },
        currency: 'dollar',
        date: '2025-05-04',
        exchange_rate: 1000,
        id: 111,
        price: 456,
        shares: 2,
        transaction_type: 'withdrawal',
      },
      {
        asset_id: targetAssetId,
        asset: {
          name: 'a',
        },
        currency: 'dollar',
        date: '2025-05-03',
        exchange_rate: 1200,
        id: 111,
        price: 456,
        shares: 2,
        transaction_type: 'withdrawal',
      },
    ];

    const result = transform2AccActualFlow(
      prevState,
      fetchedData,
      latestAssetInfo
    );

    const oldestAccShares = 3 - 1 + 2;
    const oldestLocalCurrencyValue = oldestAccShares * fetchedData[1].price;
    const oldestKrwValue =
      oldestLocalCurrencyValue * fetchedData[1].exchange_rate;

    const expectation: FlowData = {
      values: {
        krwValues: [
          {
            date: fetchedData[1].date,
            [targetAssetId]: oldestKrwValue,
          },
          { ...prevState.values.krwValues[0] },
        ],
        localCurrencyValues: [
          {
            date: fetchedData[1].date,
            [targetAssetId]: oldestLocalCurrencyValue,
          },
          ...prevState.values.localCurrencyValues,
        ],
      },
      otherData: [
        {
          date: fetchedData[1].date,
          [targetAssetId]: {
            accShares: oldestAccShares,
            symbolExchangeRate: fetchedData[1].exchange_rate,
            symbolPrice: fetchedData[1].price,
            transactions: [
              {
                exchangeRate: fetchedData[1].exchange_rate,
                price: fetchedData[1].price,
                shares: fetchedData[1].shares,
                transactionType: fetchedData[1].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
          2: {
            accShares: 3,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
        },
        {
          ...prevState.otherData[0],
          1: {
            ...prevState.otherData[0][1],
            transactions: [
              ...prevState.otherData[0][1].transactions,
              {
                exchangeRate: fetchedData[0].exchange_rate,
                price: fetchedData[0].price,
                shares: fetchedData[0].shares,
                transactionType: fetchedData[0].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
        },
      ],
    };

    expect(result).toEqual(expectation);
  });
  test(`이후 특정 asset이 동일 date에서 데이터가 이전 fetch에선 없다가 이후 fetch에선 존재함.
    
    참고로 fetch를 통해 처음으로 추가한 asset이라는 특징도 담음
    `, () => {
    //
    const prevState: FlowData = {
      values: {
        krwValues: [{ date: '2025-05-04', 1: 333000 }], //, 2: 44400 }],
        localCurrencyValues: [{ date: '2025-05-04', 1: 333 }], //, 2: 444 }],
      },
      otherData: [
        {
          date: '2025-05-04',
          1: {
            accShares: 3,
            symbolExchangeRate: 1000,
            symbolPrice: 111,
            transactions: [
              {
                exchangeRate: 1000,
                price: 111,
                shares: 2,
                transactionType: 'allocation',
              },
              {
                exchangeRate: 1000,
                price: 111,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
          2: {
            accShares: 2,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
          // 2: {
          //   accShares: 2,
          //   symbolExchangeRate: 100,
          //   symbolPrice: 222,
          //   transactions: [
          //     {
          //       exchangeRate: 100,
          //       price: 222,
          //       shares: 1,
          //       transactionType: 'withdrawal',
          //     },
          //   ],
          // },
        },
      ],
    };
    const targetAssetId = 2;

    const fetchedData: ActualDataResponse['data'] = [
      {
        asset: { name: 'b' },
        asset_id: 2,
        currency: 'dollar',
        date: '2025-05-04',
        exchange_rate: 100,
        id: 222,
        price: 222,
        shares: 2,
        transaction_type: 'allocation',
      },
    ];

    const result = transform2AccActualFlow(
      prevState,
      fetchedData,
      latestAssetInfo
    );

    const expAccShares = 2;
    const expLocalCurrencyValue = expAccShares * fetchedData[0].price;
    const expKrwValue = expLocalCurrencyValue * fetchedData[0].exchange_rate;
    const expectation: FlowData = {
      values: {
        krwValues: [
          { ...prevState.values.krwValues[0], [targetAssetId]: expKrwValue },
        ],
        localCurrencyValues: [
          {
            ...prevState.values.localCurrencyValues[0],
            [targetAssetId]: expLocalCurrencyValue,
          },
        ],
      },
      otherData: [
        {
          ...prevState.otherData[0],
          [targetAssetId]: {
            accShares: expAccShares,
            symbolExchangeRate: fetchedData[0].exchange_rate,
            symbolPrice: fetchedData[0].price,
            transactions: [
              {
                exchangeRate: fetchedData[0].exchange_rate,
                price: fetchedData[0].price,
                shares: fetchedData[0].shares,
                transactionType: fetchedData[0].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
        },
      ],
    };
    expect(result).toEqual(expectation);
  });
  test(`2개 날짜 데이터가 들어있다가, 새로운 데이터가 들어올 때.
    어차피 날짜가 다르니까, 들어있는 데이터들의 assetId는 다르게 해둠
    `, () => {
    //
    const prevState: FlowData = {
      values: {
        krwValues: [
          { date: '2025-05-03', 2: 44400 },
          { date: '2025-05-04', 1: 333000 },
        ],
        localCurrencyValues: [
          { date: '2025-05-03', 2: 444 },
          { date: '2025-05-04', 1: 333 },
        ],
      },
      otherData: [
        {
          date: '2025-05-03',
          1: {
            accShares: 3,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
          3: {
            accShares: 1,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
          2: {
            accShares: 2,
            symbolExchangeRate: 100,
            symbolPrice: 222,
            transactions: [
              {
                exchangeRate: 100,
                price: 222,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
        },
        {
          date: '2025-05-04',
          1: {
            accShares: 3,
            symbolExchangeRate: 1000,
            symbolPrice: 111,
            transactions: [
              {
                exchangeRate: 1000,
                price: 111,
                shares: 2,
                transactionType: 'allocation',
              },
              {
                exchangeRate: 1000,
                price: 111,
                shares: 1,
                transactionType: 'withdrawal',
              },
            ],
          },
          2: {
            accShares: 2,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
          3: {
            accShares: 1,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
        },
      ],
    };
    const latestAssetInfo = {
      1: { accShares: 3 },
      2: { accShares: 2 },
      3: { accShares: 1 },
    };
    const fetchedData: ActualDataResponse['data'] = [
      {
        asset: { name: 'a' },
        asset_id: 1,
        currency: 'dollar',
        date: '2025-05-02',
        exchange_rate: 1100,
        id: 1123,
        price: 55,
        shares: 4,
        transaction_type: 'withdrawal',
      },
      {
        asset: { name: 'c' },
        asset_id: 3,
        currency: 'won',
        date: '2025-05-03',
        exchange_rate: 1,
        id: 46513,
        price: 25000,
        shares: 4,
        transaction_type: 'withdrwal',
      },
    ];

    const result = transform2AccActualFlow(
      prevState,
      fetchedData,
      latestAssetInfo
    );
    const expAccShares = {
      1: prevState.otherData[0][1].accShares - 1, // 2여야 함
      3: latestAssetInfo[3].accShares,
    };
    const expLocalCurrencyValue = {
      1: fetchedData[0].price * expAccShares[1],
      3: fetchedData[1].price * expAccShares[3],
    };
    const expKrwValue = {
      1: expLocalCurrencyValue[1] * fetchedData[0].exchange_rate,
      3: expLocalCurrencyValue[3] * fetchedData[1].exchange_rate,
    };

    const expectation: FlowData = {
      values: {
        krwValues: [
          { date: fetchedData[0].date, 1: expKrwValue[1], 3: expKrwValue[3] },
          ...prevState.values.krwValues,
        ],
        localCurrencyValues: [
          {
            date: fetchedData[0].date,
            1: expLocalCurrencyValue[1],
            3: expLocalCurrencyValue[3],
          },
          ...prevState.values.localCurrencyValues,
        ],
      },
      otherData: [
        {
          date: fetchedData[0].date,
          1: {
            accShares: expAccShares[1],
            symbolExchangeRate: fetchedData[0].exchange_rate,
            symbolPrice: fetchedData[0].price,
            transactions: [
              {
                exchangeRate: fetchedData[0].exchange_rate,
                price: fetchedData[0].price,
                shares: fetchedData[0].shares,
                transactionType: fetchedData[0].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
          2: {
            accShares: 3,
            symbolExchangeRate: 0,
            symbolPrice: 0,
            transactions: [],
          },
          3: {
            accShares: expAccShares[3],
            symbolExchangeRate: fetchedData[1].exchange_rate,
            symbolPrice: fetchedData[1].price,
            transactions: [
              {
                exchangeRate: fetchedData[1].exchange_rate,
                price: fetchedData[1].price,
                shares: fetchedData[1].shares,
                transactionType: fetchedData[1].transaction_type as
                  | 'withdrawal'
                  | 'allocation',
              },
            ],
          },
        },
        ...prevState.otherData,
      ],
    };

    /**
     * futureInfo에서, prev[1]에는 없지만 latest에는 있을수도 있음.
     * 이는 prev에 데이터가 많이 쌓여있을 때도 동일한 문제가 발생할 수 있음. prev에는 해당 asset이 없으면 어캄.
     *
     * 방법이 없는데? [{date:~, assetId1:~, }, ...] 이런식으로 저장하면, asset별로 prev에서 참조할 accShares를 고르기 어려움.
     *  어디까지 봐야 해당 asset의 결과가 나오는지 모르니까.
     *
     * 데이터 형식을 바꾼다면 특정 날짜에  몇 asset의 데이터가 없을 때도 데이터를 채워줘야 함. null등으로.
     *  아니 어차피 이러면 각 asset에서도 언제가 참조할 수 있는 곳인지 모르잖슴. 거슬러 올라가면서 null이 아닌값을 찾아야 하는건 동일함.
     *
     * 그냥 지금 형태를 지키면서, 새로운 fetched에서도 futureInfo를 적절하게 재공해주려면, state에 futureInfo를 집어넣는수밖에 없는데.
     *  futureInfoByFetch로 저장하고, 한 fetch에서는 futureInfoByFetch를 초기화한 futureInfo에서 변형시켜 사용하는 방식으로 해야 할 듯.
     *  - 문제점
     *    지금 futureInfo는 prev[1]에 데이터가 있다고 가정하고(없으면 latest의 것을 사용하는) 이 정보를 갖고 있음.
     *    즉, futureInfoByEveryMoment를 다 변형 후 이를 넣으면 안되고, 중간에 멈춰서 따로 저장용으로 빼내야 함...
     *
     *    ㄴ> 이건 좀 아닌 것 같지?
     *
     * 그러면, 매 date마다의 otherData에서는 transactions이 있든 없든 accShares를 갖고 있어야 함.
     *    이건 가능한가?
     *    가능해보인다. (나중에 그래프보면서 중간 데이터를 수정할 때, shares나 transactionType을 건드린다면
     *                   데이터를 해당 범위까지 새롭게 fetch시키는 작업이 필요하긴 할 듯... 이러면 그냥 애초에 수정동작을 넣어야 하냐에 의문이 생기기도 하네.)
     *
     *      괄호에 걱정한 문제는 이 방식을 쓰든 안쓰든 상관 없어서 나중에 따로 생각해보고.
     *
     *   'futureInfo를 통해 현재의 accShares결정. 현재 accShares를 갖고 있다면(0아니면) 이를 사용.'
     *   를 위해 현재의 accShares가 0이라면 계산하고, 0이 아니면 그대로 사용하게 한 방법도 위로 대체 가능한 것 같다.
     *    이 기능은 asset 내용에서 date가 겹치는 경우를 대비한건데, (겹치면 이전 accShares값이 있을테니)
     *
     *    걍 prev[1]혹은 latest를 통해 다시 계산시키면 되므로.
     *
     *  근데, 현재 otherData는 prev[0]을 마지막원소로 한 초기화에, fetched내용으로 transactions들을 추가하기만 했음.
     *    따라서, 이 transactions들 추가하는 과정이 아니라, 초기화 과정에서 prev[0]의 모든 날짜에 대해 초기 데이터를 넣도록 해야 함.
     *      그래야, curFlowData의 otherData에 대해 순회하면서 otherData다른 값들 채워 넣는 과정에서, 빼먹는 asset(각 날짜에 대해)들이 없지.
     *
     * 정리하자면, values들은 날짜에 없는 asset들이 존재할 수 있지만, otherData는 항상 모든 날짜에 요구되는 모든 asset들 다 가져야 함.
     *  ㄴ> 이러면 테스트의 모든 prev, expectation의 otherData구조를 다 바꿔야 함... (좀더 예쁘게 짰다면 좀 쉬웠을텐데)
     */
  });
});
