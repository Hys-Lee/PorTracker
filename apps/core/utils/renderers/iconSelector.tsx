import {
  MemoEvaluationValue,
  MemoImportanceValue,
  TransactionValue,
} from '@core/types';
import { colors } from '../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
// transaction
import AllocationIcon from '@core/public/images/svgs/ArrowUp.svg?react';
import WithdrawalIcon from '@core/public/images/svgs/ArrowDown.svg?react';
import DividendIcon from '@core/public/images/svgs/Part.svg?react';
import FeeIcon from '@core/public/images/svgs/Reciept.svg?react';
// memoImportance
import CriticalIcon from '@core/public/images/svgs/Exclamation.svg?react';
import UsefulIcon from '@core/public/images/svgs/Bulb.svg?react';
import NormalIcon from '@core/public/images/svgs/Tag.svg?react';
// memoEvaluation
import BetterIcon from '@core/public/images/svgs/Face_Laugh.svg?react';
import GoodIcon from '@core/public/images/svgs/Face_Smile.svg?react';
import SosoIcon from '@core/public/images/svgs/Face_Plain.svg?react';
import BadIcon from '@core/public/images/svgs/Face_Sad.svg?react';
import WorseIcon from '@core/public/images/svgs/Face_Crying.svg?react';

/** Transaction */
const transactionIconSelector = (
  type: TransactionValue,
  width: number,
  height: number
) => {
  switch (type) {
    case 'allocation':
      return (
        <div style={{ color: colors.iconTransactionMajor }}>
          <AllocationIcon width={width} height={height} />
        </div>
      );
    case 'withdrawal':
      return (
        <div style={{ color: colors.iconTransactionMinor }}>
          <WithdrawalIcon width={width} height={height} />
        </div>
      );
    case 'dividend':
      return (
        <div style={{ color: colors.iconTransactionProfit }}>
          <DividendIcon width={width} height={height} />
        </div>
      );
    case 'fee':
      return (
        <div style={{ color: colors.iconTransactionLoss }}>
          <FeeIcon width={width} height={height} />
        </div>
      );
    default:
      return null;
  }
};

/** Memo Importance */
const memoImportanceIconSelector = (
  type: MemoImportanceValue,
  width: number,
  height: number,
  externalStylex?: stylex.StyleXStyles
) => {
  switch (type) {
    case 'critical':
      return (
        <div {...stylex.props(memoImportanceStyles[type], externalStylex)}>
          <CriticalIcon width={width} height={height} />
        </div>
      );
    case 'useful':
      return (
        <div {...stylex.props(memoImportanceStyles[type], externalStylex)}>
          <UsefulIcon width={width} height={height} />
        </div>
      );
    case 'normal':
      return (
        <div {...stylex.props(memoImportanceStyles[type], externalStylex)}>
          <NormalIcon width={width} height={height} />
        </div>
      );
    default:
      return null;
  }
};

const memoImportanceStyles = stylex.create({
  critical: { color: colors.iconMemoImportanceHigh },
  useful: { color: colors.iconMemoImportanceMiddle },
  normal: { color: colors.iconMemoImportanceLow },
});

/** Memo Evaluation */
const memoEvaluationSelector = (
  type: MemoEvaluationValue,
  width: number,
  height: number,
  externalStylex?: stylex.StyleXStyles
) => {
  switch (type) {
    case 'better':
      return (
        <div {...stylex.props(memoEvaluationStyles.base, externalStylex)}>
          <BetterIcon width={width} height={height} />
        </div>
      );
    case 'good':
      return (
        <div {...stylex.props(memoEvaluationStyles.base, externalStylex)}>
          <GoodIcon width={width} height={height} />
        </div>
      );
    case 'soso':
      return (
        <div {...stylex.props(memoEvaluationStyles.base, externalStylex)}>
          <SosoIcon width={width} height={height} />
        </div>
      );
    case 'bad':
      return (
        <div {...stylex.props(memoEvaluationStyles.base, externalStylex)}>
          <BadIcon width={width} height={height} />
        </div>
      );
    case 'worse':
      return (
        <div {...stylex.props(memoEvaluationStyles.base, externalStylex)}>
          <WorseIcon width={width} height={height} />
        </div>
      );
    default:
      return null;
  }
};
const memoEvaluationStyles = stylex.create({
  base: { color: colors.primary },
});

export {
  transactionIconSelector,
  memoImportanceIconSelector,
  memoEvaluationSelector,
};
