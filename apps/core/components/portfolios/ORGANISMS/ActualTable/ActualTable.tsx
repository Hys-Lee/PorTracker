import CategoryIcon from '@core/components/shared/ATOMS/CategoryIcon/CategoryIcon';
import { CURRENCY_MAP, TRANSACTION_MAP } from '@core/constants';
import { colors } from '../../../../tokens/colors.stylex';
import { CurrencyValue, TransactionValue } from '@core/types';
import * as stylex from '@stylexjs/stylex';

// icons
import AllocationIcon from '@core/public/images/svgs/ArrowUp.svg?react';
import WithdrawalIcon from '@core/public/images/svgs/ArrowDown.svg?react';
import DividendIcon from '@core/public/images/svgs/Part.svg?react';
import FeeIcon from '@core/public/images/svgs/Reciept.svg?react';

interface ActualTableProps {
  actualData: RowProps[];
}
const ActualTable = ({ actualData }: ActualTableProps) => {
  return (
    <>
      <section style={{ color: colors.textNormal }}>
        <div {...stylex.props(indexWrapperStyles.base)}>
          {tableIndexTexts.map((text) => (
            <p
              style={{
                display: 'flex',
                justifyContent:
                  text === 'Asset'
                    ? 'start'
                    : text === 'Ratio/Acc' || text === 'Value'
                    ? 'end'
                    : 'center',
              }}
            >
              {text}
            </p>
          ))}
        </div>
        {/** 가상화 해야함 */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {actualData.map((data) => (
            <Row {...data} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ActualTable;

const tableIndexTexts = [
  'Asset',
  'Date',
  'Transaction Type',
  'Ratio/Acc',
  'Value',
  'Currency',
];

interface RowProps {
  categoryInfo: {
    name: string;
    color: number; // id값 혹은 index값 -> 이에 활용해서 글자색 + 배경색 맞추려고..
  };
  assetInfo: {
    name: string;
    description: string;
  };
  date: Date;
  id: string;
  transactionType: TransactionValue;
  changeInfo: {
    ratio: number;
    acc: number;
  };
  value: number;
  currency: CurrencyValue;
}
const Row = ({
  categoryInfo,
  assetInfo,
  changeInfo,
  currency,
  date,
  id,
  transactionType,
  value,
}: RowProps) => {
  return (
    <>
      <li
        key={id}
        style={{
          // display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'space-between',
          display: 'grid',
          gridTemplateColumns: '4fr 2fr 2fr 2fr 4fr 1fr',
          width: '100%',
          columnGap: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'end', gap: '2px' }}>
          <CategoryIcon
            text={categoryInfo.name}
            iconStylex={
              iconStyles[
                `${((categoryInfo.color % 10) + 1) as keyof typeof iconStyles}`
              ]
            }
          />
          <div>
            <p
              style={{ margin: 0, fontWeight: '900', fontSize: '18px' }}
            >{`${assetInfo.name}`}</p>
            <p
              style={{
                margin: 0,
                color: colors.textWeek,
                fontSize: '12px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >{`${categoryInfo.name} / ${assetInfo.description}`}</p>
          </div>
        </div>
        <p style={{ display: 'flex', justifyContent: 'center' }}>
          {`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            minWidth: 'min-content',
          }}
        >
          {transactionIconSelector(transactionType)}
          <p style={{ whiteSpace: 'nowrap', fontWeight: '700' }}>
            {TRANSACTION_MAP[transactionType]}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            minWidth: 'min-content',
          }}
        >
          <p style={{ fontWeight: '700' }}>{`${changeInfo.ratio}%`}</p>
          <p>{`/${changeInfo.acc}%`}</p>
        </div>

        <p style={{ display: 'flex', justifyContent: 'end' }}>{value}</p>
        <p style={{ display: 'flex', justifyContent: 'center' }}>
          {CURRENCY_MAP[currency]}
        </p>
      </li>
    </>
  );
};

const transactionIconSelector = (type: TransactionValue) => {
  switch (type) {
    case 'allocation':
      return (
        <div style={{ color: colors.iconTransactionMajor }}>
          <AllocationIcon width={32} height={32} />
        </div>
      );
    case 'withdrawal':
      return (
        <div style={{ color: colors.iconTransactionMinor }}>
          <WithdrawalIcon width={32} height={32} />
        </div>
      );
    case 'dividend':
      return (
        <div style={{ color: colors.iconTransactionProfit }}>
          <DividendIcon width={32} height={32} />
        </div>
      );
    case 'fee':
      return (
        <div style={{ color: colors.iconTransactionLoss }}>
          <FeeIcon width={32} height={32} />
        </div>
      );
    default:
      return null;
  }
};

/** styles */

const indexWrapperStyles = stylex.create({
  base: {
    display: 'grid',
    columnGap: '4px',
    justifyContent: 'space-between',
    width: '100%',
    gridTemplateColumns: '4fr 2fr 2fr 2fr 4fr 1fr',
    fontSize: '14px',
  },
});

const iconStyles = stylex.create({
  1: {
    color: colors.category1Strong,
    backgroundColor: colors.category1Week,
  },
  2: {
    color: colors.category2Strong,
    backgroundColor: colors.category2Week,
  },
  3: {
    color: colors.category3Strong,
    backgroundColor: colors.category3Week,
  },
  4: {
    color: colors.category4Strong,
    backgroundColor: colors.category4Week,
  },
  5: {
    color: colors.category5Strong,
    backgroundColor: colors.category5Week,
  },
  6: {
    color: colors.category6Strong,
    backgroundColor: colors.category6Week,
  },
  7: {
    color: colors.category7Strong,
    backgroundColor: colors.category7Week,
  },
  8: {
    color: colors.category8Strong,
    backgroundColor: colors.category8Week,
  },
  9: {
    color: colors.category9Strong,
    backgroundColor: colors.category9Week,
  },
  10: {
    color: colors.category10Strong,
    backgroundColor: colors.category10Week,
  },
});
