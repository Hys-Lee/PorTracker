import { inputBase } from '@core/styles/input.stylex';
import { colors } from '../../../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import Dropdown, {
  DropdownItem,
} from '@core/components/shared/MOLECULES/Dropdown/Dropdown';

import TextArea from '@core/components/shared/ATOMS/TextArea/TextArea';
import TagInput from '@core/components/shared/ATOMS/TagInput/TagInput';
import { MEMO_EVALUATION_VALUES, MEMO_IMPORTANCE_MAP } from '@core/constants';
import { ComponentProps, Fragment, useState } from 'react';
import { memoEvaluationSelector } from '@core/utils/renderers/iconSelector';
import { MemoEvaluationValue, MemoImportanceValue } from '@core/types';

interface MemoFormAreaProps {
  tagInfo?: string[]; //ComponentProps<typeof TagInput>['options'];
  importanceInfo: MemoImportanceValue[];
  initData?: {
    title: string;
    date: Date;
    importance: DropdownItem<MemoImportanceValue>;
    // linkedInfo?: DropdownItem<>;
    content: string;
    tags: string[];
    evaluation?: MemoEvaluationValue;
  };
}

const MemoFormArea = ({
  importanceInfo,
  initData,
  tagInfo,
}: MemoFormAreaProps) => {
  const [evaluation, setEvaluation] = useState<EvaluationsProps['value']>(
    initData?.evaluation
  );
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
          defaultValue={initData?.title}
          {...stylex.props(inputBase.base, formElementStyles.base)}
        />
      </div>
      <div {...stylex.props(formElementStyles.doubleWrapper)}>
        <div {...stylex.props(formElementStyles.area)}>
          <label {...stylex.props(formElementStyles.label)}>날짜</label>
          <DatePicker
            defaultValue={initData?.date}
            range={false}
            {...stylex.props(datePickerStyles.base)}
          />
        </div>
        <div {...stylex.props(formElementStyles.area)}>
          <label {...stylex.props(formElementStyles.label)}>중요도</label>
          <Dropdown
            multi={false}
            items={importanceInfo.map((data) => ({
              value: data,
              text: MEMO_IMPORTANCE_MAP[data],
            }))}
            triggerStylex={{
              ...formElementStyles.base,
              ...importanceStyles.base,
            }}
            defaultValue={
              initData?.importance
                ? [initData?.importance]
                : [{ value: 'normal', text: MEMO_IMPORTANCE_MAP['normal'] }]
            }
          />
        </div>
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>연결</label>
        <Dropdown
          multi={false}
          items={[]}
          triggerStylex={{ ...formElementStyles.base }}
          // defaultValue={initData?.linkedId}
        />
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>메모 내용</label>
        <div {...stylex.props(textAreaStyles.wrapper)}>
          <TextArea
            externalStylex={textAreaStyles.base}
            rows={6}
            defaultValue={initData?.content}
          />
        </div>
        {/* <textarea {...stylex.props(inputBase.base)} /> */}
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>태그</label>
        <TagInput
          options={tagInfo?.map((tag) => ({ title: tag, value: tag }))}
          defaultValue={initData?.tags}
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
  },
});

const importanceStyles = stylex.create({
  base: {
    width: '100px',
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
