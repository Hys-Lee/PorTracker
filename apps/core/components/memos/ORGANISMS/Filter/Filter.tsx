'use client';

import * as stylex from '@stylexjs/stylex';
import {
  filterWrapperStyles,
  AssetFilterStyles,
  DateFilterStyles,
  MemoTypeFilterStyles,
  switchStyles,
} from '@core/styles/filter.stylex';
import { colors } from '../../../../tokens/colors.stylex';

import Dropdown from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import Switch from '@core/components/shared/MOLECULES/Switch/Switch';

// icons
import AssetIcon from '@core/assets/images/svgs/BusinessCase.svg?react';
import DateIcon from '@core/assets/images/svgs/Calendar.svg?react';
import TransactionIcon from '@core/assets/images/svgs/Exchange.svg?react';
import CurrencyIcon from '@core/assets/images/svgs/Dollar.svg?react';
import MemoIcon from '@core/assets/images/svgs/Memo.svg?react';

// types
import { DropdownItem } from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import { SwitchSelected } from '@core/components/shared/MOLECULES/Switch/Switch';
import { CurrencyValue, MemoTypeValue } from '@core/types';

import { ComponentProps, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CURRENCY_MAP, MEMO_TYPE_MAP, MEMO_TYPE_VALUES } from '@core/constants';

type MemoInfo = DropdownItem<MemoTypeValue>;
type CurrencyInfo = SwitchSelected<CurrencyValue>;

type FilterState = {
  // assets: Array<{ text: string; value: string }>;
  dates: [Date, Date] | null; // 시작일, 종료일
  memoType: MemoInfo[];
  currency: CurrencyInfo;
};

type FilterQuery = {
  // assets?: string; // comma separated values
  startDate?: string; // ISO string
  endDate?: string; // ISO string
  memoType?: string;
  currency?: string;
};

interface FilterProps {
  // assetInfo: FilterState['assets'];
  memoTypeInfo: FilterState['memoType'];
  currencyInfo: CurrencyInfo[];
  // init?: FilterState;
  init?: FilterQuery;
}

// const getInitFilterState = (rawInit: FilterQuery): FilterState => {
//   return {
//     assets: rawInit.assets
//       ? rawInit.assets.split(',').map((value) => ({ text: v, value: v }))
//       : [],
//     dates:
//       rawInit.startDate && rawInit.endDate
//         ? [new Date(rawInit.startDate), new Date(rawInit.endDate)]
//         : null,
//     memoType: rawInit.memoType
//       ? [{ text: rawInit.memoType, value: rawInit.memoType as MemoTypeValue }]
//       : [],
//     currency: rawInit.currency
//       ? { text: rawInit.currency, value: rawInit.currency as CurrencyValue }
//       : { text: 'USD', value: 'usd' },
//   };
// };

const getInitFilterState = (
  // assetInfo: FilterProps['assetInfo'],
  init: FilterProps['init'],
  memoTypeInfo: FilterProps['memoTypeInfo'],
  currencyInfo: FilterProps['currencyInfo']
): FilterState => {
  // const assetInfoMap = new Map<string, FilterState['assets'][number]>();
  // assetInfo.forEach((data) => assetInfoMap.set(data.value, data));

  //test
  console.log('memotype in getInitFilterState: ', init?.memoType, memoTypeInfo);

  const memoType: MemoInfo | undefined = memoTypeInfo.find(
    (data) => data.value === (init?.memoType as MemoTypeValue)
  );

  //test
  console.log('found memotype: ', !!memoType);

  return {
    // assets: init?.assets
    //   ? init.assets.split(',').map((value) => ({
    //       text: assetInfoMap.get(value)?.text ?? '',
    //       value,
    //     }))
    //   : [],
    dates:
      init?.startDate && init?.endDate
        ? [new Date(init.startDate), new Date(init.endDate)]
        : null,
    // memoType: memoType ? [memoType] : [],
    memoType: memoType ? [memoType] : [],
    currency: init?.currency
      ? {
          text: CURRENCY_MAP[init.currency as CurrencyValue] || '',
          value: init.currency as CurrencyValue,
        }
      : currencyInfo[0],
  };
};

const Filter = ({
  // assetInfo,
  currencyInfo,
  memoTypeInfo,
  init,
}: FilterProps) => {
  //test
  console.log('init in filter: ', init);

  // const getInitFilterState = (): FilterState => {
  //   const assetInfoMap = new Map<string, FilterState['assets'][number]>();
  //   assetInfo.forEach((data) => assetInfoMap.set(data.value, data));

  //   //test
  //   console.log(
  //     'memotype in getInitFilterState: ',
  //     init?.memoType,
  //     memoTypeInfo
  //   );

  //   const memoType: MemoInfo | undefined = memoTypeInfo.find(
  //     (data) => data.value === (init?.memoType as MemoTypeValue)
  //   );

  //   //test
  //   console.log('found memotype: ', !!memoType);

  //   return {
  //     assets: init?.assets
  //       ? init.assets.split(',').map((value) => ({
  //           text: assetInfoMap.get(value)?.text ?? '',
  //           value,
  //         }))
  //       : [],
  //     dates:
  //       init?.startDate && init?.endDate
  //         ? [new Date(init.startDate), new Date(init.endDate)]
  //         : null,
  //     // memoType: memoType ? [memoType] : [],
  //     memoType: memoType ? [memoType] : [],
  //     currency: init?.currency
  //       ? {
  //           text: CURRENCY_MAP[init.currency as CurrencyValue] || '',
  //           value: init.currency as CurrencyValue,
  //         }
  //       : currencyInfo[0],
  //   };
  // };

  const [filterStates, setFilterStates] = useState<FilterState>(() =>
    getInitFilterState(
      // assetInfo,
      init,
      memoTypeInfo,
      currencyInfo
    )
  );

  //test
  console.log('filterstate: ', filterStates);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (
    stateKey: keyof FilterState,
    value: FilterState[keyof FilterState],
    queryParams: Array<{ name: string; value: string }>
  ) => {
    setFilterStates((prev) => ({
      ...prev,
      [stateKey]: value,
    }));

    const params = new URLSearchParams(searchParams);
    queryParams.forEach(({ name, value }) => {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section {...stylex.props(filterWrapperStyles.base)}>
        {/* <Dropdown
          multi={true}
          items={assetInfo.map((data) => ({
            value: data.value,
            text: data.text,
          }))}
          placeholder={<AssetText />}
          selectedText={
            <AssetText
              content={filterStates.assets?.map(({ text }) => text).join(',')}
            />
          }
          triggerStylex={AssetFilterStyles.base}
          onValueChange={(values) => {
            const valueString = values.map(({ value }) => value).join(',');
            handleFilter('assets', values, [
              { name: 'assets', value: valueString },
            ]);
          }}
          defaultValue={filterStates.assets}
        /> */}
        <DatePicker
          rootStyleX={DateFilterStyles.base}
          range={true}
          prefix={<DatePrefix />}
          suffix={<></>}
          onChange={(dates) => {
            const hasNull = !dates || !dates[0] || !dates[1];
            if (hasNull) {
              handleFilter('dates', null, [
                { name: 'startDate', value: '' },
                { name: 'endDate', value: '' },
              ]);
              return;
            } else {
            }
            const dateStartString = dates[0] ? dates[0].toISOString() : '';
            const dateEndString = dates[1] ? dates[1].toISOString() : '';

            handleFilter('dates', dates as [Date, Date], [
              { name: 'startDate', value: dateStartString },
              { name: 'endDate', value: dateEndString },
            ]);
          }}
          defaultValue={filterStates.dates as [Date, Date] | null}
        />
        <Dropdown
          triggerStylex={MemoTypeFilterStyles.base}
          multi={false}
          // items={[
          //   { text: '1', value: '1' },
          //   { text: '2', value: '2' },
          //   { text: '3', value: '3' },
          // ]}
          items={memoTypeInfo.map((data) => ({
            value: data.value,
            text: data.text,
          }))}
          placeholder={<MemoText />}
          selectedText={
            <MemoText content={filterStates.memoType[0]?.text || ''} />
          }
          onValueChange={(data) => {
            handleFilter(
              'memoType',
              [...data],
              [
                { name: 'memoType', value: data[0]?.value ?? '' },
                ...(data[0]?.value !== 'actual'
                  ? // actual타입이 아닐 땐 currency 비우기
                    [
                      {
                        name: 'currency',
                        value: '',
                      },
                    ]
                  : []),
              ]
            );
          }}
          defaultValue={filterStates.memoType}
        />
        {filterStates.memoType?.[0]?.value === 'actual' && (
          <label {...stylex.props(switchStyles.wrapper)}>
            <p {...stylex.props(switchStyles.label)}>
              <CurrencyIcon width={14} height={14} />
              <span>{`Currency: `}</span>
            </p>
            <Switch
              // defaultSelected={filterStates.currency}
              rootStylex={switchStyles.base}
              // items={[
              //   { text: '1', value: '1' },
              //   { text: '2', value: '2' },
              // ]}
              items={
                currencyInfo.map((data) => ({
                  value: data.value,
                  text: data.text,
                })) as ComponentProps<typeof Switch<CurrencyValue>>['items']
              }
              onChange={(value) => {
                setFilterStates((prev) => ({ ...prev, currency: value }));
                handleFilter('currency', value, [
                  { name: 'currency', value: value.value },
                ]);
              }}
            />
          </label>
        )}
      </section>
    </>
  );
};

export default Filter;

/** 기타 필터 아이템 재료들 */

const AssetText = ({ content }: { content?: string }) => (
  <div
    style={{ lineHeight: 1, display: 'flex', alignItems: 'center', gap: '8px' }}
  >
    <div style={{ color: colors.iconFilter }}>
      <AssetIcon width={12} height={12} />
    </div>
    <span>{`Assets: ${content || ''}`}</span>
  </div>
);

const DatePrefix = () => {
  return (
    <p style={{ lineHeight: 1, padding: '3px', margin: 0 }}>
      <span style={{ color: colors.iconFilter }}>
        <DateIcon width={14} height={14} />
      </span>
    </p>
  );
};

const MemoText = ({ content }: { content?: string }) => {
  return (
    <div
      style={{
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '8px',
      }}
    >
      <div style={{ width: '14px', height: '14px', color: colors.iconFilter }}>
        <MemoIcon width={14} height={14} />
      </div>
      <span>{`MemoType: `}</span>

      <span>{`${content || ''}`}</span>
    </div>
  );
};
