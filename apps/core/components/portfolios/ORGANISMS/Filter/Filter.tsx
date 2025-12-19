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
import AssetIcon from '@core/public/images/svgs/BusinessCase.svg?react';
import DateIcon from '@core/public/images/svgs/Calendar.svg?react';
import TransactionIcon from '@core/public/images/svgs/Exchange.svg?react';
import CurrencyIcon from '@core/public/images/svgs/Dollar.svg?react';
import { ComponentProps, useState } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import type { TransactionValue, CurrencyValue } from '@core/types';
import { CURRENCY_MAP, TRANSACTION_MAP } from '@core/constants/domain';

type TransactionInfo = DropdownItem<TransactionValue>;
type CurrencyInfo = SwitchSelected<CurrencyValue>;

type FilterState = {
  assets: ComponentProps<typeof Dropdown>['value'];
  dates: ComponentProps<typeof DatePicker>['value'];
  transaction: TransactionInfo[];
  currency: CurrencyInfo;
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
}
const Filter = ({ assetInfo, transactionInfo, currencyInfo }: FilterProps) => {
  const [filterStates, setFilterStates] = useState<FilterState>({
    assets: [],
    dates: null,
    transaction: [{ value: 'allocation', text: TRANSACTION_MAP['allocation'] }],
    currency: { value: 'usd', text: CURRENCY_MAP['usd'] },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  // 일반 핸들링 함수도 제네릭으로 만들어서 코드 량이 줄긴 했는데...
  const handleFilter = <K extends keyof FilterState>(
    type: K,
    valueInfo: FilterState[K],
    urlInfo: { name: string; value: string }[]
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
          padding: '4px',
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
          value={filterStates.assets}
        />
        <DatePicker
          rootStyleX={DateFilterStyles.base}
          range={true}
          prefix={<DatePrefix />}
          suffix={<></>}
          onChange={(dates) => {
            const hasNull = !dates || !dates[0] || !dates[1];
            if (hasNull) {
              handleFilter('dates', null, []);
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
          onValueChange={([value]) => {
            const valueString = value.value;
            handleFilter(
              'transaction',
              [value],
              [{ name: 'transaction', value: valueString }]
            );
          }}
          selectedText={
            <TransactionText content={filterStates.transaction[0].text} />
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
            }}
          >
            <CurrencyIcon width={14} height={14} />
            <span>{`Currency: `}</span>
          </p>
          <Switch
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
  <p
    style={{ lineHeight: 1, display: 'flex', alignItems: 'center', gap: '8px' }}
  >
    <div>
      <AssetIcon width={12} height={12} />
    </div>
    <span>{`Assets: ${content || ''}`}</span>
  </p>
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
      <span>
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
    <p
      style={{
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '8px',
      }}
    >
      <div style={{ width: '14px', height: '14px' }}>
        <TransactionIcon width={14} height={14} />
      </div>
      <span>{`Transaction: `}</span>

      <span>{`${content || ''}`}</span>
    </p>
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
