import { assert } from 'node:console';
import { date } from 'zod';

let base = +new Date(2019, 1, 1);
const oneDay = 24 * 3600 * 1000;
const defaultDate: string[] = [];
const maxDataKind = 10;

// 자산 추가
const defaultAssets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const defaultDatum: Array<{ asset: string; value: number[] }> = [];
for (let i = 0; i < maxDataKind; i++) {
  defaultDatum.push({
    asset: defaultAssets[i],
    value: [300 + Math.random() * 300],
  });
}
for (let i = 1; i < 200; i++) {
  const now = new Date((base += oneDay));
  defaultDate.push(
    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
  );
  for (let j = 0; j < maxDataKind; j++) {
    defaultDatum[j].value.push(
      Math.round((Math.random() - 0.5) * 20 + defaultDatum[j].value[i - 1])
    );
  }
}

//  asset: z.string().nonempty(),
//   date:
//     // z.string().nonempty()
//     z.date(),
//   transactionType: z.enum(['allocation', 'withdrawal']),
//   price: z.number().positive(),
//   currency: z.enum(['dollar', 'won']),
//   exchangeRate: z.number().default(1),
//   shares: z.number().positive(), // 주식 수량

// 확 낮거나 확 높은 데이터도 있어야 함. 종가랑 다르게 매매할 수 있으므로.

const defaultTradeData = [
  {
    asset: 'a',
    date: '2019/2/10',
    transactionType: 'allocation',
    price: 320,
    currency: 'dollar',
    exchangeRate: 1120.3,
    shares: 3,
  },
  {
    asset: 'b',
    date: '2019/2/10',
    transactionType: 'allocation',
    price: 240,
    currency: 'dollar',
    exchangeRate: 1120.3,
    shares: 5,
  },
  {
    asset: 'c',
    date: '2019/2/10',
    transactionType: 'allocation',
    price: 160,
    currency: 'dollar',
    exchangeRate: 1120.3,
    shares: 3,
  },
  {
    asset: 'd',
    date: '2019/2/10',
    transactionType: 'allocation',
    price: 50,
    currency: 'dollar',
    exchangeRate: 1120.3,
    shares: 6,
  },
  {
    asset: 'e',
    date: '2019/2/11',
    transactionType: 'allocation',
    price: 130,
    currency: 'dollar',
    exchangeRate: 1122,
    shares: 3,
  },
  {
    asset: 'f',
    date: '2019/2/11',
    transactionType: 'allocation',
    price: 50,
    currency: 'dollar',
    exchangeRate: 1122,
    shares: 2,
  },
  {
    asset: 'g',
    date: '2019/2/11',
    transactionType: 'allocation',
    price: 170,
    currency: 'dollar',
    exchangeRate: 1122,
    shares: 4,
  },
  {
    asset: 'h',
    date: '2019/2/11',
    transactionType: 'allocation',
    price: 70,
    currency: 'dollar',
    exchangeRate: 1122,
    shares: 5,
  },
  {
    asset: 'i',
    date: '2019/2/15',
    transactionType: 'allocation',
    price: 500,
    currency: 'dollar',
    exchangeRate: 1223,
    shares: 1,
  },
  {
    asset: 'j',
    date: '2019/2/15',
    transactionType: 'allocation',
    price: 70,
    currency: 'dollar',
    exchangeRate: 1223,
    shares: 9,
  },
  {
    asset: 'a',
    date: '2019/5/19',
    transactionType: 'allocation',
    price: 700,
    currency: 'dollar',
    exchangeRate: 1430.6,
    shares: 1,
  },
  {
    asset: 'b',
    date: '2019/5/19',
    transactionType: 'allocation',
    price: 100,
    currency: 'dollar',
    exchangeRate: 1430.6,
    shares: 8,
  },
  {
    asset: 'c', // 다 팜
    date: '2019/5/20',
    transactionType: 'withdrawal',
    price: 1000,
    currency: 'dollar',
    exchangeRate: 1441,
    shares: 3,
  },
  {
    asset: 'a',
    date: '2019/6/13',
    transactionType: 'allocation',
    price: 330,
    currency: 'dollar',
    exchangeRate: 1322.1,
    shares: 3,
  },
  {
    asset: 'b', // 이러면 10개 남음
    date: '2019/6/14',
    transactionType: 'withdrawal',
    price: 240,
    currency: 'dollar',
    exchangeRate: 1311.5,
    shares: 3,
  },
  {
    asset: 'b',
    date: '2019/6/15',
    transactionType: 'withdrawal',
    price: 400,
    currency: 'dollar',
    exchangeRate: 1287,
    shares: 5,
  },
  {
    asset: 'a',
    date: '2019/8/7',
    transactionType: 'withdrawal',
    price: 600,
    currency: 'dollar',
    exchangeRate: 1370,
    shares: 7,
  },
  {
    asset: 'b',
    date: '2019/8/7',
    transactionType: 'withdrawal',
    price: 20,
    currency: 'dollar',
    exchangeRate: 1370,
    shares: 5,
  },
  {
    asset: 'b',
    date: '2019/8/8',
    transactionType: 'allocation',
    price: 310,
    currency: 'dollar',
    exchangeRate: 1377,
    shares: 3,
  },
];

// const defaultMemo = [{ title: '', content: '', tags: '', customTemplate: '' }];

const defaultMemo = [
  {
    asset: 'a',
    date: '2019/2/10',
    transactionType: 'allocation',
    title: 'a 선택 이유',
    content: 'a는 ~라서 선택함. 일단 ~를 위해 ~정도에 선택',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'b',
    date: '2019/2/10',
    transactionType: 'allocation',
    title: 'b 선택 이유',
    content: 'b는 ~라서 선택함.',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'c',
    date: '2019/2/10',
    transactionType: 'allocation',
    title: 'c 선택 이유',
    content: 'c는 ~라서 선택함.',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'd',
    date: '2019/2/10',
    transactionType: 'allocation',
    title: 'd 선택 이유',
    content: 'd는 ~라서 선택함',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'e',
    date: '2019/2/11',
    transactionType: 'allocation',
    title: 'e 선택 이유',
    content: 'e는 ~라서 선택함. 매수 결정이 늦어져서 하루 미뤄짐',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'f',
    date: '2019/2/11',
    transactionType: 'allocation',
    title: 'f 선택 이유',
    content: 'f는 ~라서 선택. 매수 결정 늦어져서 미뤄짐',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'g',
    date: '2019/2/11',
    transactionType: 'allocation',
    title: 'g 선택 이유',
    content: 'g는 ~라서 선택. 매수 결정 늦어져서미뤄짐',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'h',
    date: '2019/2/11',
    transactionType: 'allocation',
    title: 'h 선택 이유',
    content: 'h는 ~라서 선택. 매수 결정 늦어져서 미뤄짐',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'i',
    date: '2019/2/15',
    transactionType: 'allocation',
    title: 'i 선택 이유',
    content: 'i는 ~라서 선택. 매수 계속 미뤄져서 늦어짐',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'j',
    date: '2019/2/15',
    transactionType: 'allocation',
    title: 'j 선택 이유',
    content: 'j는 ~라서 선택. i랑 같은 이유',
    tags: ['종목선택'],
    customTemplate: '',
  },
  {
    asset: 'a',
    date: '2019/5/19',
    transactionType: 'allocation',
    title: 'a 추매 이유',
    content: '뭔가 타이밍? 근데 잘 못 잡아서 당일 고점에 삼..',
    tags: ['매수', '타이밍', '실패'],
    customTemplate: '',
  },
  {
    asset: 'b',
    date: '2019/5/19',
    transactionType: 'allocation',
    title: 'b 추매 이유',
    content: '얘는 좀 싸게 산 듯? 근데, 환율이 좀 빡셈',
    tags: ['매수', '타이밍', '애매'],
    customTemplate: '',
  },
  {
    asset: 'c', // 다 팜
    date: '2019/5/20',
    transactionType: 'withdrawal',
    title: 'c 매도 이유',
    content:
      '졸라 올라서 비싸게 팜. 당일 고점으로 많이 올랐다가 빠졌는데, 최고점에서 팜. 환율 개같아도 좋았음.',
    tags: ['매도', '타이밍', '성공', '엑싯'],
    customTemplate: '',
  },
  {
    asset: 'a',
    date: '2019/6/13',
    transactionType: 'allocation',
    title: 'a 추매 이유',
    content: '가격 적당해서 산 듯? ',
    tags: ['매수', '타이밍'],
    customTemplate: '',
  },
  {
    asset: 'b', // 이러면 10개 남음
    date: '2019/6/14',
    transactionType: 'withdrawal',
    title: 'b 절반 팜',
    content: '뭐라 할까. 벨류가 낮아진 것 같아서 분할 매도함.',
    tags: ['매도', '벨류', '분할'],
    customTemplate: '',
  },
  {
    asset: 'b',
    date: '2019/6/15',
    transactionType: 'withdrawal',
    title: '이전의 절반을 팜',
    content: '반의 반을 판거임 결국.',
    tags: ['매도'],
    customTemplate: '',
  },
  {
    asset: 'a',
    date: '2019/8/7',
    transactionType: 'withdrawal',
    title: 'a 엑싯',
    content: '좋은 가격이라 다 팜. 괜찮을지도? 환율 좀 봐야겠지만',
    tags: ['매도', '엑싯'],
    customTemplate: '',
  },
  {
    asset: 'b',
    date: '2019/8/7',
    transactionType: 'withdrawal',
    title: 'b일단 다 팔기.',
    content: '몰라 걍 팜. 다시 살거임',
    tags: ['매도'],
    customTemplate: '',
  },
  {
    asset: 'b',
    date: '2019/8/8',
    transactionType: 'allocation',
    title: 'b이전만큼 사기?',
    content: '일단 다시 삼. 뭔가 호재가 떴나 봄',
    tags: ['매수'],
    customTemplate: '',
  },
  {
    // 이거 그냥 메모인데 이것도 되나 보자.
    asset: null,
    date: '2019/3/1',
    transactionType: 'allocation',
    title: '그냥 메모. 타이밍에 대한..',
    content: '그냥 메모. 어떤 종목 특정한것 대한게 아님.',
    tags: ['그냥'],
    customTemplate: '',
  },
].map((each) => ({ ...each, type: 'actual' }));

const makeDefaultMemo = () => defaultMemo;
const makeDefaultTrade = () => defaultTradeData;
const makeDefaultDate = () => defaultDate;
const makeDefaultDaum = () => defaultDatum;

/**  이건 tradeDates 동작을 추상화 한거임. 밑에서도 이런 느낌 동작 사용할 줄 알았는데 아니었음.. 아까워서 일단 둠.   */
// const makeArrayValuesOnField = (
//   keyField: string,
//   valueField: string,
//   original: { [keyField]: string; [valueField]: unknown }[]
// ) =>
//   original.reduce(
//     (acc, curData) => ({
//       ...acc,
//       [curData[keyField] as string]: [
//         ...(acc[curData[keyField] as string] as unknown[]),
//         curData[valueField],
//       ],
//     }),
//     {}
//   );

/**
 *
 * @param tradeData  - memoData도 됨. 다만, asset이 null인경우는 key값이 'tmp'가 됨.
 * @param dateData
 * @returns
 */
const getMatchingIdxOnAssets = (
  tradeData,
  dateData
): { [x: string]: unknown[] } => {
  const tradeDates = tradeData.reduce(
    (datesPerAsset, curTrade) => ({
      ...datesPerAsset,
      [curTrade.asset ? curTrade.asset : 'tmp']: [
        ...(datesPerAsset[curTrade.asset] || []),
        curTrade.date,
      ],
    }),
    {}
  );

  // tradeData.map((trade) => trade.date!);
  // const matchingIdx = dateData.reduce((allIdxs, dateValue, idx) => {
  //   return dateValue in tradeDates ? [...allIdxs, idx] : allIdxs;
  // }, [] as number[]);

  const matchingIdxOnAssets = Object.keys(tradeDates).reduce((acc, asset) => {
    const matchingIdx = dateData.reduce((allIdxs, dateValue, idx) => {
      return (tradeDates as { [asset: string]: string[] })[asset].includes(
        dateValue
      )
        ? [...allIdxs, idx]
        : allIdxs;
    }, [] as number[]);
    return { ...acc, [asset]: matchingIdx };
  }, {} as { [asset: string]: number[] });

  return matchingIdxOnAssets;
};

const makeMixedData = (
  tradeData: object[],
  priceData: { asset: string; value: number[] }[],
  dateData: string[]
) => {
  const matchingIdxOnAssets = getMatchingIdxOnAssets(tradeData, dateData);

  // 그냥 trade 해당 날짜의 shares만 알고 price은 data의 price 사용해서 곱하면 내 현재 평가금이네.
  // ㄴ> 여러번 trade를 했다면...  그냥 구간별로 계산하면 될 것 같긴 한데. 즉, 특정 날짜 이후로는 당시 가에 K개, 또 다른 날짜 이후론 당시 가에 N개 곱하면 되겠네.
  // 즉, 개수 누적 정보를 알아내야 하네.

  // const shareChanges = tradeData.map((trade) =>
  //   trade.transactionType === 'allocation' ? trade.shares : -trade.shares
  // );

  const shareChanges = tradeData.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.asset]: [
        ...(acc[cur.asset] || []),
        cur.transactionType === 'allocation' ? cur.shares : -cur.shares,
      ],
    };
  }, {});

  // const accumulatedShares = shareChanges.reduce(
  //   (totalSum, eachChange) => totalSum + eachChange,
  //   0
  // );
  const accumulatedSharesOnTrade = Object.keys(shareChanges).reduce(
    (acc, asset) => {
      return {
        ...acc,
        [asset]: shareChanges[asset].reduce(
          (acc, cur, idx) => [...acc, idx === 0 ? cur : acc[idx - 1] + cur],
          []
        ),
      };
    },
    {} as { [asset: string]: number[] }
  );
  // 얘가 이상하네.
  //test
  console.log(
    'accumulatedSharesOnTrade, shareCahnges: ',
    accumulatedSharesOnTrade,
    shareChanges,
    matchingIdxOnAssets
  );

  const result = priceData.map(({ asset, value: priceOnly }) => {
    const evaluatedValue = priceOnly.map((price, idx) => {
      // const applyingIdx: null | number = matchingIdxOnAssets[asset].reduce(
      //   (acc, cur) => {
      //     return idx <= cur ? cur : acc;
      //   },
      //   null
      // );

      /**   mutable한 방식으로 걍 찾음. */
      let applyingIdxForTrade = null;
      for (let i = 0; i < matchingIdxOnAssets[asset].length; i++) {
        const matchingIdxForTotal = matchingIdxOnAssets[asset][i];
        if ((matchingIdxForTotal as number) <= idx) {
          applyingIdxForTrade = i; // 가장 높은놈 갖도록
        }
      }

      // test
      // console.log(
      //   'applyingIdx, accumulatedSharesOnTrade[asset]: ',
      //   applyingIdxForTrade,
      //   accumulatedSharesOnTrade[asset],
      //   price,
      //   applyingIdxForTrade === null
      //     ? 0
      //     : accumulatedSharesOnTrade[asset][applyingIdxForTrade]
      // );

      return (
        price *
        (applyingIdxForTrade === null
          ? 0
          : accumulatedSharesOnTrade[asset][applyingIdxForTrade])
      );
    });
    return { asset, value: evaluatedValue };
  });

  return result;

  // ** 참고로, 몇%올랐는지는 현재 평가금이랑 구매 총금액을 이용하면 되네.
};

const makeMixedDataWithMemo = (
  memoData,
  dateData,
  mixedData: { asset: string; value: number[] }[]
) => {
  const matchingIdxsOnAsset = getMatchingIdxOnAssets(memoData, dateData); // asset이 null인경우 "tmp"가 key임.

  mixedData.map(({ asset, value }) => {
    const memo = value.map((_) => null);
    matchingIdxsOnAsset[asset].forEach(
      (matchingIdx, memoIdx) =>
        (memo[matchingIdx as number] = memoData[memoIdx])
    );

    return { asset, value, memo };
  });
};

/// Trade 데이터 수정하기
const putTradeData = (newTradeData) => {
  for (let i = 0; i < defaultTradeData.length; i++) {
    if (
      defaultTradeData[i].asset === newTradeData.asset &&
      defaultTradeData[i].date === newTradeData.date
    ) {
      defaultTradeData[i] = newTradeData;
    }
  }
};

export {
  makeDefaultMemo,
  makeDefaultTrade,
  makeDefaultDate,
  makeDefaultDaum,
  makeMixedData, // asset당 각 시점 평가금액 계산
  makeMixedDataWithMemo, // 위에다 memo연결
  putTradeData,
};
