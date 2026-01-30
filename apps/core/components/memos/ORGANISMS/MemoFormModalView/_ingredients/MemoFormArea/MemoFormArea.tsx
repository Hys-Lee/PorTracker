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
import {
  ComponentProps,
  Fragment,
  useActionState,
  useEffect,
  useState,
} from 'react';
import { memoEvaluationSelector } from '@core/utils/renderers/iconSelector';
import {
  MemoEvaluationValue,
  MemoImportanceValue,
  MemoTypeValue,
  PortfolioTypeValue,
} from '@core/types';
import {
  AllPortfolioDetail,
  MemoForm,
} from '@core/schemas/features/memos/memos.schema';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  copiedMemoFormDataAtom,
  linkedPortfolioInfoAtom,
} from '@core/stores/memos/memoModalStore';
import { dateFormatter } from '@core/utils/helpers/dateFormatter';
import { PostMemoFormRes } from '@core/services/serverFunctions/memosServerFunctions';
// import { TargetPortfolio } from '@core/types/memos/referenceData';

interface MemoFormAreaProps {
  id: string;
  tagInfo?: string[];
  tmpPortfoliosInfo: AllPortfolioDetail[];
  initData?: MemoForm;
  formAction: (
    actionRes: PostMemoFormRes,
    formData: FormData
  ) => Promise<PostMemoFormRes>;
}

const localAction = (
  formData: FormData,
  evaluation: EvaluationsProps['value'],
  initData: any,
  tmpPortfoliosInfo: any,
  internalFormAction: any
) => {
  if (evaluation) formData.set('evaluation', evaluation);

  const dotDate = formData.get('date');
  if (dotDate) {
    const dashDate = dateFormatter(dotDate as string, 'YYYY-MM-DD', '-');
    formData.set('date', new Date(dashDate).toISOString());
  }

  if (formData.get('importance')) {
    const importance = JSON.parse(
      formData.get('importance') as string
    ) as ComponentProps<typeof Dropdown>['defaultValue'];

    importance?.[0]?.value &&
      formData.set('importance', importance?.[0]?.value);
  }

  if (formData.get('linkedPortfolioId')) {
    const linkedPortfolio = JSON.parse(
      formData.get('linkedPortfolioId') as string
    ) as ComponentProps<typeof Dropdown>['defaultValue'];

    if (linkedPortfolio?.[0]?.value) {
      formData.set('linkedPortfolioId', linkedPortfolio?.[0]?.value);

      // 임시 링크 포폴 타입 처리
      formData.set('linkedPortfolioType', 'actual' as PortfolioTypeValue);
    } else {
      formData.delete('linkedPortfolioId');
    }

    // memotype처러ㅣ
    (initData?.memoType || linkedPortfolio?.[0]?.index !== undefined) &&
      formData.set(
        'memoType',
        initData?.memoType ||
          tmpPortfoliosInfo[linkedPortfolio?.[0].index as number].portfolioType
      );
  } else {
    // memoType처리
    formData.set('memoType', 'event');
  }

  internalFormAction(formData);
};

const MemoFormArea = ({
  // importanceInfo,
  id,
  tmpPortfoliosInfo,
  initData,
  tagInfo,
  formAction,
}: MemoFormAreaProps) => {
  const [evaluation, setEvaluation] = useState<EvaluationsProps['value']>(
    initData?.evaluation
  );

  const [res, internalFormAction, isPending] = useActionState(formAction, {
    data: null,
    error: { message: '', type: 'VALIDATION_ERROR' },
    success: false,
  } as unknown as PostMemoFormRes);

  const copiedMemoData = useAtomValue(copiedMemoFormDataAtom);
  //test
  // console.log('copiediMemoData: ', copiedMemoData);
  const finalData = { ...copiedMemoData, ...initData };

  //test
  // console.log('finalData: ', finalData, res);

  const setSelectedLinkedPortfolio = useSetAtom(linkedPortfolioInfoAtom);

  useEffect(() => {
    // copiedMemoData 변화를 evaluatino 상태에 반영하기
    if (!copiedMemoData) return;
    setEvaluation(copiedMemoData.evaluation);
  }, [copiedMemoData]);

  return (
    <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      // }}
      id={id}
      style={{
        // display: 'flex',
        // flexDirection: 'column',
        // gap: '20px',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr auto 1fr 1fr ',
        rowGap: '12px',
        // rowGap: '16px',
        gridTemplateColumns: '1fr',
        color: colors.textNormal,
        // width: '100%',
        width: 'auto',
        height: '100%',
        justifyContent: 'center',
      }}
      action={(formData) => {
        localAction(
          formData,
          evaluation,
          initData,
          tmpPortfoliosInfo,
          internalFormAction
        );
        // if (evaluation) formData.set('evaluation', evaluation);
        // const dotDate = formData.get('date');
        // if (dotDate) {
        //   const dashDate = dateFormatter(dotDate as string, 'YYYY-MM-DD', '-');
        //   formData.set('date', new Date(dashDate).toISOString());
        // }
        // if (formData.get('importance')) {
        //   const importance = JSON.parse(
        //     formData.get('importance') as string
        //   ) as ComponentProps<typeof Dropdown>['defaultValue'];
        //   importance?.[0]?.value &&
        //     formData.set('importance', importance?.[0]?.value);
        // }
        // if (formData.get('linkedPortfolioId')) {
        //   const linkedPortfolio = JSON.parse(
        //     formData.get('linkedPortfolioId') as string
        //   ) as ComponentProps<typeof Dropdown>['defaultValue'];
        //   if (linkedPortfolio?.[0]?.value) {
        //     formData.set('linkedPortfolioId', linkedPortfolio?.[0]?.value);
        //   } else {
        //     formData.delete('linkedPortfolioId');
        //   }
        //   // memotype처러ㅣ
        //   (initData?.memoType || linkedPortfolio?.[0]?.index !== undefined) &&
        //     formData.set(
        //       'memoType',
        //       initData?.memoType ||
        //         tmpPortfoliosInfo[linkedPortfolio?.[0].index as number]
        //           .portfolioType
        //     );
        // } else {
        //   // memoType처리
        //   formData.set('memoType', 'event');
        // }
        // internalFormAction(formData);
      }}
    >
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>{'제목'}</label>
        <div {...stylex.props(formElementStyles.valueErrorBox)}>
          <input
            name="title"
            key={finalData?.title}
            defaultValue={res.error?.payload?.title || finalData?.title}
            // defaultValue={'finalData?.title'}
            {...stylex.props(inputBase.base, formElementStyles.base)}
          />

          <span {...stylex.props(formElementStyles.errorMsg)}>
            {res.error?.details?.title?.[0]}
          </span>
        </div>
      </div>
      <div {...stylex.props(formElementStyles.doubleWrapper)}>
        <div {...stylex.props(formElementStyles.area)}>
          <label {...stylex.props(formElementStyles.label)}>날짜</label>
          <div {...stylex.props(formElementStyles.valueErrorBox)}>
            <DatePicker
              name="date"
              key={finalData?.date?.toISOString()}
              defaultValue={finalData?.date}
              range={false}
              {...stylex.props(datePickerStyles.base)}
            />
            <span {...stylex.props(formElementStyles.errorMsg)}>
              {res.error?.details?.date?.[0]}
            </span>
          </div>
        </div>
        <div {...stylex.props(formElementStyles.area)}>
          <label {...stylex.props(formElementStyles.label)}>중요도</label>
          <div {...stylex.props(formElementStyles.valueErrorBox)}>
            <Dropdown
              name="importance"
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
              key={finalData.importance}
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
            <span {...stylex.props(formElementStyles.errorMsg)}>
              {res.error?.details?.importance?.[0]}
            </span>
          </div>
        </div>
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>연결</label>
        <div {...stylex.props(formElementStyles.valueErrorBox)}>
          <Dropdown
            name="linkedPortfolioId"
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
                setSelectedLinkedPortfolio(null);
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
                setSelectedLinkedPortfolio(
                  tmpPortfoliosInfo[linkInfo[0].index]
                );
              }
            }}
            // key={finalData.li}
            defaultValue={
              finalData?.linkedPortfolioInfo
                ? [
                    {
                      text: finalData?.linkedPortfolioInfo?.assetName,
                      value: finalData?.linkedPortfolioInfo?.id,
                    },
                  ]
                : undefined
            }
          />
          <span {...stylex.props(formElementStyles.errorMsg)}>
            {res.error?.details?.linkedPortfolioId?.[0]}
          </span>
        </div>
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>메모 내용</label>
        <div {...stylex.props(textAreaStyles.wrapper)}>
          <div {...stylex.props(formElementStyles.valueErrorBox)}>
            <TextArea
              name="content"
              externalStylex={textAreaStyles.base}
              rows={6}
              key={finalData?.content}
              defaultValue={finalData?.content}
            />
            <span {...stylex.props(formElementStyles.errorMsg)}>
              {res.error?.details?.content?.[0]}
            </span>
          </div>
        </div>
        {/* <textarea {...stylex.props(inputBase.base)} /> */}
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>태그</label>
        <div {...stylex.props(formElementStyles.valueErrorBox)}>
          <TagInput
            name="tags"
            options={tagInfo?.map((tag) => ({ title: tag, value: tag }))}
            defaultValue={finalData?.tags}
            key={finalData?.tags?.join(',')}
            externalStylex={tagStyles.base}
          />
          <span {...stylex.props(formElementStyles.errorMsg)}>
            {res.error?.details?.tags?.[0]}
          </span>
        </div>
      </div>
      <div {...stylex.props(formElementStyles.area)}>
        <label {...stylex.props(formElementStyles.label)}>평가</label>
        <div {...stylex.props(formElementStyles.valueErrorBox)}>
          <Evaluations
            onClick={(value) => {
              setEvaluation(value);
            }}
            value={evaluation}
          />
          <span {...stylex.props(formElementStyles.errorMsg)}>
            {res.error?.details?.evaluation?.[0]}
          </span>
        </div>
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
  valueErrorBox: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  errorMsg: {
    position: 'absolute',
    fontSize: '12px',
    color: colors.loss,
    bottom: '-14px',
    right: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
