'use client';

import { dateFormatter } from '@core/utils/helpers/dateFormatter';
import { colors } from '../../../../../../tokens/colors.stylex';
import { TransactionValue } from '@core/types';
import { transactionIconSelector } from '@core/utils/renderers/iconSelector';
import { ScrollArea } from 'radix-ui';
import { useState } from 'react';
import Separator from '@core/components/shared/ATOMS/Separator/Separator';
import * as stylex from '@stylexjs/stylex';
import PasteIcon from '@core/assets/images/svgs/Paste.svg?react';

interface PortfolioReferenceProps {
  itemsInfo: {
    transactionnTypeInfo: {
      value: TransactionValue;
      text: string;
    };
    amount: number;
    exchangeRateInfo: {
      value: number;
      unit: string;
    };
    date: Date;
    price: number;
    id: string;
  }[];
}
const PortfolioReference = ({ itemsInfo }: PortfolioReferenceProps) => {
  const [selectedInfo, setSelectedInfo] = useState<
    PortfolioReferenceProps['itemsInfo'][number] | null
  >(null);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <p
            style={{
              margin: 0,
              color: colors.textWeek,
              fontWeight: '700',
              fontSize: '20px',
            }}
          >
            Recent History
          </p>
          {/* <div style={{ height: '200px', overflowY: 'auto' }}> */}
          <ScrollArea.Root>
            <ScrollArea.Viewport
              style={{
                height: '160px',
                // overflow: 'hidden',
              }}
            >
              <ul
                style={{
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {itemsInfo.map((info) => (
                  <HistoryRow
                    key={info.id}
                    id={info.id}
                    onClick={() => {
                      setSelectedInfo(info);
                    }}
                    amount={info.amount}
                    dateString={`${info.date.getFullYear()}.${
                      info.date.getMonth() + 1
                    }.${info.date.getDate()}`}
                    exchangeRateInfo={info.exchangeRateInfo}
                    transactionnTypeInfo={info.transactionnTypeInfo}
                  />
                ))}
              </ul>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              style={{
                width: '10px',
                background: colors.bgStrong,
                borderRadius: '24px',
                opacity: 0.7,
              }}
            >
              <ScrollArea.Thumb
                style={{ background: colors.textWeek, borderRadius: '24px' }}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          {/* </div> */}
        </section>
        <Separator color="strong" />
        <div style={{ position: 'relative', width: '100%', height: '240px' }}>
          {selectedInfo ? (
            <>
              <Preview
                dataText={{
                  amount: `${selectedInfo.amount}`,
                  date: dateFormatter(selectedInfo.date, 'YYYY.MM.DD', '.'),
                  exchangeRate: `${selectedInfo.exchangeRateInfo.value} ${selectedInfo.exchangeRateInfo.unit}`,
                  price: `${selectedInfo.price}`,
                  transactionType: selectedInfo.transactionnTypeInfo.text,
                }}
                totalValue={
                  selectedInfo.price *
                  selectedInfo.amount *
                  selectedInfo.exchangeRateInfo.value
                }
              />
              <button
                {...stylex.props(pasteButtonStyles.base)}
                type="button"
                // style={{}}
              >
                <PasteIcon width={24} height={24} />
              </button>
            </>
          ) : (
            <NoPreview />
          )}
        </div>
      </div>
    </>
  );
};

const pasteButtonStyles = stylex.create({
  base: {
    backgroundColor: {
      default: colors.bgWeek,
      ':hover': colors.bgNormal,
      ':focus': colors.bgNormal,
    },
    borderRadius: '12px',
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: ' 20px',
    right: '20px',
    // background: 'none',
    borderStyle: 'none',
    color: colors.iconFilter,
  },
});

interface HistoryRowProps
  extends Omit<PortfolioReferenceProps['itemsInfo'][number], 'price' | 'date'> {
  dateString: string;
  onClick?: () => void;
}

const HistoryRow = ({
  transactionnTypeInfo,
  amount,
  exchangeRateInfo,
  dateString,
  onClick,
}: HistoryRowProps) => {
  return (
    <>
      <li
        onClick={() => onClick && onClick()}
        style={{
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          color: colors.textNormal,
          justifyContent: 'space-between',
          padding: '0 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {transactionIconSelector(transactionnTypeInfo.value, 24, 24)}
          </div>
          <span style={{ color: colors.textStrong, fontWeight: '700' }}>
            {transactionnTypeInfo.text}
          </span>
        </div>
        <span>{`${amount} Units`}</span>
        <span>{`${exchangeRateInfo.value} ${exchangeRateInfo.unit}`}</span>
        <span style={{ fontWeight: '500' }}>{`${dateString}`}</span>
      </li>
    </>
  );
};

interface PreviewProps {
  dataText: {
    date: string;
    transactionType: string;
    price: string;
    exchangeRate: string;
    amount: string;
  };
  totalValue: number;
}
const Preview = ({ dataText, totalValue }: PreviewProps) => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '20px',
        // height: '200px',
      }}
    >
      {contentLabels.map(({ type, label }) => (
        <div
          key={type}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            width: '100%',
          }}
        >
          <span>{label}</span>
          <span>{dataText[type]}</span>
        </div>
      ))}
      <Separator color="normal" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          color: colors.textWeek,
        }}
      >
        <span>{`총 금액:${totalValue.toLocaleString()}`}</span>
      </div>
    </div>
  );
};

const NoPreview = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          // height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: colors.textWeek,
        }}
      >
        기록 선택 시 상세화면이 보입니다
      </div>
    </>
  );
};

const contentLabels: {
  type: keyof NonNullable<PreviewProps['dataText']>;
  label: string;
}[] = [
  { type: 'date', label: '날짜' },
  { type: 'transactionType', label: '거래유형' },
  { type: 'price', label: '가격' },
  { type: 'exchangeRate', label: '환율' },
  { type: 'amount', label: '수량' },
];

export default PortfolioReference;
