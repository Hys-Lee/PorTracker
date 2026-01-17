'use client';

import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import Dropdown, {
  DropdownItem,
} from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import Switch, {
  SwitchSelected,
} from '@core/components/shared/MOLECULES/Switch/Switch';
import { colors } from '../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';

// icons
import AssetIcon from '@core/assets/images/svgs/BusinessCase.svg?react';
import DateIcon from '@core/assets/images/svgs/Calendar.svg?react';
import TransactionIcon from '@core/assets/images/svgs/Exchange.svg?react';
import CurrencyIcon from '@core/assets/images/svgs/Dollar.svg?react';
import { ComponentProps, useState } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import type { TransactionValue, CurrencyValue } from '@core/types';
import {
  CURRENCY_MAP,
  CURRENCY_VALUES,
  TRANSACTION_MAP,
} from '@core/constants/domain';
import Button from '@core/components/shared/ATOMS/Button/Button';

type TransactionInfo = DropdownItem<TransactionValue>;
type CurrencyInfo = SwitchSelected<CurrencyValue>;

type FilterState = {
  assets: ComponentProps<typeof Dropdown>['value'];
  dates: ComponentProps<typeof DatePicker>['value'];
  transaction: TransactionInfo[];
  currency: CurrencyInfo;
};

const defaultCurrency: CurrencyInfo = {
  value: 'usd',
  text: CURRENCY_MAP['usd'],
};

type QueryInfo = {
  assets?: string;
  startDate?: string;
  endDate?: string;
  transaction?: string;
  currency?: string;
};

interface FilterProps {
  assetInfo: { value: string; name: string }[];
  transactionInfo: {
    value: TransactionValue;
    name: (typeof TRANSACTION_MAP)[TransactionValue];
  }[];
  currencyInfo: [
    { value: CurrencyValue; name: (typeof CURRENCY_MAP)[CurrencyValue] },
    { value: CurrencyValue; name: (typeof CURRENCY_MAP)[CurrencyValue] }
  ];
  init?: QueryInfo;
}
const Filter = ({
  assetInfo,
  transactionInfo,
  currencyInfo,
  init,
}: FilterProps) => {
  const getInitData = (): FilterState => {
    const assetInfoMap = new Map<
      NonNullable<FilterState['assets']>[number]['value'],
      NonNullable<FilterState['assets']>[number]
    >();
    assetInfo.forEach((data) =>
      assetInfoMap.set(data.value, { value: data.value, text: data.name })
    );

    const dates =
      init?.startDate && init.endDate
        ? ([new Date(init.startDate), new Date(init.endDate)] as [Date, Date])
        : null;

    const validCurrency =
      init?.currency &&
      CURRENCY_VALUES.includes(
        init?.currency as (typeof CURRENCY_VALUES)[number]
      );

    const transaction: TransactionInfo | undefined = transactionInfo
      .map((data) => ({ value: data.value, text: data.name }))
      .find((data) => init?.transaction === data.value);
    return {
      assets: init?.assets
        ? init.assets
            .split(',')
            .map((value) => assetInfoMap.get(value))
            .filter((data) => !!data)
        : [],
      dates,
      currency: validCurrency
        ? {
            value: init.currency as CurrencyValue,
            text: CURRENCY_MAP[init.currency as CurrencyValue],
          }
        : defaultCurrency,
      transaction: transaction ? [transaction] : [],
    };
  };

  const [filterStates, setFilterStates] = useState<FilterState>(
    getInitData
    // {
    //   assets: [],
    //   dates: null,
    //   // transaction: [{ value: 'allocation', text: TRANSACTION_MAP['allocation'] }],
    //   transaction: [],
    //   currency: defaultCurrency,
    // }
  );

  //test
  console.log('filteState: ', filterStates);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  // 일반 핸들링 함수도 제네릭으로 만들어서 코드 량이 줄긴 했는데...
  const handleFilter = <K extends keyof FilterState>(
    type: K,
    valueInfo: FilterState[K],
    // urlInfo: { name: string; value: string }[]
    urlInfo: { name: keyof QueryInfo; value: string }[]
  ) => {
    setFilterStates((prev) => {
      return { ...prev, [type]: valueInfo };
    });

    // URL QUEERY

    urlInfo.forEach(({ name, value }) => {
      params.set(name, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          minWidth: 'min-content',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: `0 0 0 1px rgb(from var(--gray-b-s) r g b / 1)`,
          // padding: '4px',
          padding: '8px',
        }}
      >
        <Dropdown
          multi
          items={assetInfo.map((data) => ({
            value: data.value,
            text: data.name,
          }))}
          // items={[
          //   { text: '1', value: '1' },
          //   { text: '2', value: '2' },
          //   { text: '3', value: '3' },
          // ]}
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
          // value={filterStates.assets}
        />
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

            // handleFilter('dates', dates, `${dateStartString},${dateEndString}`);
            handleFilter('dates', dates as [Date, Date], [
              { name: 'startDate', value: dateStartString },
              { name: 'endDate', value: dateEndString },
            ]);
          }}
          defaultValue={filterStates.dates as [Date, Date] | null}
        />
        <Dropdown
          triggerStylex={TransactionFilterStyles.base}
          multi={false}
          items={transactionInfo.map((data) => ({
            value: data.value,
            text: data.name,
          }))}
          placeholder={<TransactionText />}
          // selectedText={<TransactionText />}
          onValueChange={(selected) => {
            if (selected.length <= 0) {
              handleFilter(
                'transaction',
                [],
                [{ name: 'transaction', value: '' }]
              );
              return;
            }
            const value = selected[0];

            const valueString = value.value;
            handleFilter(
              'transaction',
              [value],
              [{ name: 'transaction', value: valueString }]
            );
          }}
          defaultValue={filterStates.transaction}
          selectedText={
            <TransactionText
              content={filterStates.transaction?.[0]?.text ?? ''}
            />
          }
        />
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: colors.bgNormal,
            borderRadius: '12px',
            padding: '0 15px',
            height: '36px',
          }}
        >
          <p
            style={{
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: colors.iconFilter,
            }}
          >
            <CurrencyIcon width={14} height={14} />
            <span>{`Currency: `}</span>
          </p>
          <Switch
            defaultSelected={filterStates.currency}
            rootStylex={switchStyles.base}
            items={
              currencyInfo.map((data) => ({
                value: data.value,
                text: data.name,
              })) as ComponentProps<typeof Switch<CurrencyValue>>['items']
            }
            onChange={(value) => {
              handleFilter('currency', value, [
                { name: 'currency', value: value.value },
              ]);
            }}
          />
        </label>
      </section>
    </>
  );
};

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

const AssetFilterStyles = stylex.create({
  base: {
    height: '36px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'start',
    width: '250px',
  },
});

const DatePrefix = () => {
  return (
    <p style={{ lineHeight: 1, padding: '3px', margin: 0 }}>
      <span style={{ color: colors.iconFilter }}>
        <DateIcon width={14} height={14} />
      </span>
    </p>
  );
};

const DateFilterStyles = stylex.create({
  base: {
    height: '36px',
    // fontSize: '14px', // Antd 기본 14라서... 걍 얘에 맞춤
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'start',
    width: '250px',
  },
});

const TransactionText = ({ content }: { content?: string }) => {
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
        <TransactionIcon width={14} height={14} />
      </div>
      <span>{`Transaction: `}</span>

      <span>{`${content || ''}`}</span>
    </div>
  );
};

const TransactionFilterStyles = stylex.create({
  base: {
    height: '36px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'start',
    width: '200px',
    minWidth: '200px',
  },
});

const switchStyles = stylex.create({
  base: {
    backgroundColor: colors.bgStrong,
    whiteSpace: 'nowrap',
  },
});

export default Filter;
