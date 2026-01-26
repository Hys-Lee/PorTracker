'use client';

import { inputBase } from '@core/styles/input.stylex';
import { colors } from '../../../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import Dropdown, {
  DropdownItem,
} from '@core/components/shared/MOLECULES/Dropdown/Dropdown';

import TextArea from '@core/components/shared/ATOMS/TextArea/TextArea';
import TagInput from '@core/components/shared/ATOMS/TagInput/TagInput';
import {
  MEMO_EVALUATION_VALUES,
  MEMO_IMPORTANCE_MAP,
  MEMO_IMPORTANCE_VALUES,
} from '@core/constants';
import { ComponentProps, Fragment, useEffect, useState } from 'react';
import { memoEvaluationSelector } from '@core/utils/renderers/iconSelector';
import {
  MemoEvaluationValue,
  MemoImportanceValue,
  MemoTypeValue,
} from '@core/types';
import {
  AllPortfolioDetail,
  MemoForm,
} from '@core/schemas/features/memos/memos.schema';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  copiedMemoFormDataAtom,
  linkedPortfolioInfoAtom,
} from '@core/stores/memos/memoModal';
// import { TargetPortfolio } from '@core/types/memos/referenceData';

interface MemoFormAreaProps {
  tagInfo?: string[];
  tmpPortfoliosInfo: AllPortfolioDetail[];
  initData?: MemoForm;
}

const MemoFormArea = ({
  // importanceInfo,
  tmpPortfoliosInfo,
  initData,
  tagInfo,
}: MemoFormAreaProps) => {
  const [evaluation, setEvaluation] = useState<EvaluationsProps['value']>(
    initData?.evaluation
  );

  const copiedMemoData = useAtomValue(copiedMemoFormDataAtom);
  const finalData = copiedMemoData || initData;

  const setSelectedLinkedPortfolio = useSetAtom(linkedPortfolioInfoAtom);

  useEffect(() => {
    // copiedMemoData 변화를 evaluatino 상태에 반영하기
    if (!copiedMemoData) return;
    setEvaluation(copiedMemoData.evaluation);
  }, [copiedMemoData]);

  return (
    <form
      //   id={id}
      style={{
        // display: 'flex',
        // flexDirection: 'column',
        // gap: '20px',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr auto 1fr 1fr ',
        rowGap: '8px',
        gridTemplateColumns: '1fr',
        color: colors.textNormal,
        // width: '100%',
        width: 'auto',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>{'제목'}</label>
        <input
          defaultValue={finalData?.title}
          {...stylex.props(inputBase.base, formElementStyles.base)}
        />
      </div>
      <div {...stylex.props(formElementStyles.doubleWrapper)}>
        <div {...stylex.props(formElementStyles.area)}>
          <label {...stylex.props(formElementStyles.label)}>날짜</label>
          <DatePicker
            defaultValue={finalData?.date}
            range={false}
            {...stylex.props(datePickerStyles.base)}
          />
        </div>
        <div {...stylex.props(formElementStyles.area)}>
          <label {...stylex.props(formElementStyles.label)}>중요도</label>
          <Dropdown
            multi={false}
            items={MEMO_IMPORTANCE_VALUES.map((data) => ({
              value: data,
              text: MEMO_IMPORTANCE_MAP[data],
            }))}
            icon
            triggerStylex={{
              ...formElementStyles.base,
              ...importanceStyles.base,
            }}
            defaultValue={
              finalData?.importance
                ? [
                    {
                      value: finalData.importance,
                      text: MEMO_IMPORTANCE_MAP[finalData.importance],
                    },
                  ]
                : [{ value: 'normal', text: MEMO_IMPORTANCE_MAP['normal'] }]
            }
          />
        </div>
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>연결</label>
        <Dropdown
          multi={false}
          items={tmpPortfoliosInfo.map((data, idx) => {
            if (data.portfolioType === 'actual')
              return { text: data.assetName, value: data.id };
            else return { text: data.name, value: data.id };
          })}
          icon
          triggerStylex={{
            ...formElementStyles.base,
            ...portfolioLinkStyles.base,
          }}
          onValueChange={(linkInfo) => {
            if (!linkInfo[0]) {
              setSelectedLinkedPortfolio(undefined);
              return;
            }
            if (linkInfo[0].index !== undefined) {
              // index가 0일 때도 있으니까..
              const { portfolioType, ...portfolioData } =
                tmpPortfoliosInfo[linkInfo[0].index];

              // const linkedPortfolioData =
              //   portfolioType === 'actual'
              //     ? {
              //         // type: 'actual' as Extract<MemoTypeValue, 'actual'>,

              //         ...(portfolioData as ActualPortfolioDetail),
              //       }
              //     : {
              //         // type: 'target' as Extract<MemoTypeValue, 'target'>,
              //         ...(portfolioData as TargetPortfolioDetail),
              //       };
              setSelectedLinkedPortfolio(tmpPortfoliosInfo[linkInfo[0].index]);
            }
          }}
          // defaultValue={finalData?.linkedId}
        />
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>메모 내용</label>
        <div {...stylex.props(textAreaStyles.wrapper)}>
          <TextArea
            externalStylex={textAreaStyles.base}
            rows={6}
            defaultValue={finalData?.content}
          />
        </div>
        {/* <textarea {...stylex.props(inputBase.base)} /> */}
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>태그</label>
        <TagInput
          options={tagInfo?.map((tag) => ({ title: tag, value: tag }))}
          defaultValue={finalData?.tags}
          externalStylex={tagStyles.base}
        />
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>평가</label>
        <Evaluations
          onClick={(value) => {
            setEvaluation(value);
          }}
          value={evaluation}
        />
      </div>
    </form>
  );
};
export default MemoFormArea;

interface EvaluationsProps {
  value?: MemoEvaluationValue;
  onClick: (value: MemoEvaluationValue) => void;
}
const Evaluations = ({ value, onClick }: EvaluationsProps) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '8px' }}>
        {MEMO_EVALUATION_VALUES.map((type) => (
          <div
            key={type}
            onClick={() => {
              onClick(type);
            }}
            style={{ height: '28px' }}
            // {...stylex.props(evaluationStyles.btn)}
          >
            {memoEvaluationSelector(type, 28, 28, {
              ...evaluationStyles.base,
              ...(value === type && evaluationStyles.activated),
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const formElementStyles = stylex.create({
  base: {
    height: '44px',
    boxShadow: {
      default: 'none',
      ':hover': `0 0 0 1px ${colors.primary}`,
      ':focus': `0 0 0 1px ${colors.primary}`,
    },
    backgroundColor: colors.bgNormal,
  },
  area: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  doubleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  label: {
    width: '68px',
  },
});

const datePickerStyles = stylex.create({
  base: {
    height: '44px',
    boxShadow: {
      default: `0 0 0 1px rgb(from ${colors.primary} r g b / 0) !important`,
      ':focus': `0 0 0 2px ${colors.primary} !important`,
      ':hover': `0 0 0 1px ${colors.primary} !important`,
    },
  },
});

const textAreaStyles = stylex.create({
  base: {
    resize: 'none',
    flexGrow: 1,
  },
  wrapper: { flexGrow: 1 },
});

const tagStyles = stylex.create({
  base: {
    height: '44px',
    flexGrow: 1,
  },
});

const importanceStyles = stylex.create({
  base: {
    position: 'relative',
    width: '100px',
    paddingRight: '30px',
  },
});

const portfolioLinkStyles = stylex.create({
  base: {
    position: 'relative',
    flexGrow: 1,
  },
});

const evaluationStyles = stylex.create({
  base: {
    color: {
      default: `rgb(from ${colors.primary} r g b / 0.5 )`,
      // ':hover': colors.primary,
      ':hover': `rgb(from ${colors.primary} r g b / 0.7 )`,
    },
    height: '100%',
  },
  activated: {
    color: `rgb(from ${colors.primary} r g b / 1 )`,
    backgroundColor: `rgb(from ${colors.primary} r g b / 0.2 )`,
    borderRadius: '12px',
  },
  btn: {},
});
