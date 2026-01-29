'use client';

import {
  MemoEvaluationValue,
  MemoImportanceValue,
  PortfolioTypeValue,
} from '@core/types';
import { colors } from '../../../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
import { ScrollArea } from 'radix-ui';
import TagPill from '@core/components/shared/ATOMS/TagPill/TagPill';
import MemoPill from '@core/components/shared/ATOMS/MemoPill/MemoPill';
import { dateFormatter } from '@core/utils/helpers/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import { memoKeys } from '@core/services/keys/memoKeys';
import { getMemoRecents } from '@core/services/client';
import { memoEvaluationSelector } from '@core/utils/renderers/iconSelector';
import Separator from '@core/components/shared/ATOMS/Separator/Separator';
import PasteIcon from '@core/assets/images/svgs/Paste.svg?react';
import {
  nonScorlledOverflowStyles,
  scrollBarStyles,
} from '@core/styles/scroll.stylex';
import { useState } from 'react';
import { pasteButtonStyles } from '@core/styles/icon.stylex';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  copiedMemoFormDataAtom,
  linkedPortfolioInfoAtom,
} from '@core/stores/memos/memoModal';
import { MemoRecent } from '@core/schemas/features/memos/memos.schema';

// export type MemoRecent = MemoRecent;
// PreviewProps & { id: string };

interface MemoReferenceProps {
  initInfo?: {
    portfolioId: string;
    portfolioType: PortfolioTypeValue;
  };
}

const MemoReference = ({ initInfo }: MemoReferenceProps) => {
  const linkedPortfolioData = useAtomValue(linkedPortfolioInfoAtom); // 선택 안하면 undefined

  const { data: recentsRes } = useQuery({
    queryKey: memoKeys.recents(
      linkedPortfolioData?.id || initInfo?.portfolioId,
      linkedPortfolioData?.portfolioType || initInfo?.portfolioType
    ),
    queryFn: () => {
      return getMemoRecents(
        linkedPortfolioData?.id || initInfo?.portfolioId,
        linkedPortfolioData?.portfolioType || initInfo?.portfolioType
      );
    },
  }); // useSuspenseQuery로 바꿀거임.

  const [selectedRecent, setSelectedRecent] = useState<
    MemoRecent | undefined
  >();

  const setCopiedMemoFormData = useSetAtom(copiedMemoFormDataAtom);

  return (
    <>
      <div {...stylex.props(memoReferenceStyles.wrapper)}>
        <section {...stylex.props(memoReferenceStyles.recentArea)}>
          <p {...stylex.props(memoReferenceStyles.subTitle)}>Recent History</p>

          <ScrollArea.Root>
            <ScrollArea.Viewport
              style={{
                height: '80px',
                // overflow: 'hidden',
              }}
            >
              <ul {...stylex.props(memoReferenceStyles.recentList)}>
                {(recentsRes?.data as MemoRecent[] | undefined)?.map(
                  (recentData) => {
                    return (
                      <div
                        key={recentData.id}
                        onClick={() => {
                          setSelectedRecent(recentData);
                        }}
                      >
                        <MemoHistoryRow
                          date={recentData.date}
                          firstTag={recentData.tags?.[0]}
                          importance={recentData.importance}
                          title={recentData.title}
                        />
                      </div>
                    );
                  }
                ) ?? []}
              </ul>
            </ScrollArea.Viewport>
            <ScrollArea.ScrollAreaScrollbar
              {...stylex.props(scrollBarStyles.verticalBox)}
            >
              <ScrollArea.Thumb
                {...stylex.props(scrollBarStyles.verticalThumb)}
              />
            </ScrollArea.ScrollAreaScrollbar>
          </ScrollArea.Root>
        </section>

        <Separator color="strong" />
        <div {...stylex.props(memoReferenceStyles.previewArea)}>
          {selectedRecent ? (
            <>
              <Preview {...selectedRecent} />
              <button
                type="button"
                {...stylex.props(
                  pasteButtonStyles.base,
                  memoReferenceStyles.pasteBtn
                )}
                onClick={() => {
                  setCopiedMemoFormData(selectedRecent);
                }}
              >
                <PasteIcon />
              </button>
            </>
          ) : (
            <div {...stylex.props(memoReferenceStyles.noPreview)}>
              기록 선택 시 상세 화면이 보입니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MemoReference;

const memoReferenceStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  recentArea: { display: 'flex', flexDirection: 'column', gap: '24px' },
  subTitle: {
    margin: 0,
    color: colors.textWeek,
    fontWeight: '700',
    fontSize: '16px',
  },
  recentList: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    // height: 'auto',
    // flexGrow: 1,
  },
  previewArea: {
    position: 'relative',
    width: '100%',
    flexGrow: 1,
    height: '200px',
  },
  noPreview: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.textWeek,
  },
  pasteBtn: {
    top: 0,
    right: 0,
    width: '36px',
    height: '36px',
  },
});

interface MemoHistoryRowProps {
  title: string;
  firstTag?: string;
  importance: MemoImportanceValue;
  date: Date;
}
const MemoHistoryRow = ({
  date,
  firstTag,
  importance,
  title,
}: MemoHistoryRowProps) => {
  return (
    <>
      <div {...stylex.props(memoHistoryRowStyles.wrapper)}>
        <span {...stylex.props(memoHistoryRowStyles.title)}>{title}</span>
        {firstTag && (
          <TagPill
            content={firstTag}
            externalStylex={memoHistoryRowStyles.tag}
          />
        )}
        <div {...stylex.props(memoHistoryRowStyles.importanceBox)}>
          <MemoPill
            type={importance}
            wrapperStylex={memoHistoryRowStyles.importance}
          />
        </div>
        <span {...stylex.props(memoHistoryRowStyles.date)}>
          {dateFormatter(date, 'YYYY.MM.DD', '.')}
        </span>
      </div>
    </>
  );
};

const memoHistoryRowStyles = stylex.create({
  wrapper: {
    // display: 'flex',
    // gap: '8px',
    // justifyContent: 'space-between',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    alignContent: 'center',
    gap: '4px',
  },
  title: {
    fontWeight: '600',
    color: colors.textStrong,
    // display: 'flex',
    display: 'inline-block',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    minWidth: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 'auto 0',
  },
  tag: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    minWidth: 0,
    width: 'auto',
    maxWidth: 'fit-content',
    display: 'inline-block',
    margin: 'auto 0',
    // alignItems: 'center',
  },
  importance: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
  },
  importanceBox: {
    display: 'flex',
    justifyContent: 'end',
  },
  date: {
    fontWeight: '400',
    color: colors.textNormal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
});

// interface PreviewProps {
//   date: Date;
//   title: string;
//   importance: MemoImportanceValue;
//   content: string;
//   tags: string[];
//   evaluation: MemoEvaluationValue;
// }
type PreviewProps = Omit<MemoRecent, 'id'>;
const Preview = ({
  content,
  date,
  evaluation,
  importance,
  tags,
  title,
}: PreviewProps) => {
  return (
    <>
      <div {...stylex.props(previewStyels.wrapper)}>
        <div {...stylex.props(previewStyels.dateBox)}>
          <span {...stylex.props(previewStyels.date)}>
            {dateFormatter(date, 'YYYY.MM.DD', '.')}
          </span>
        </div>
        <span {...stylex.props(previewStyels.title)}>{title}</span>
        <MemoPill
          type={importance}
          wrapperStylex={previewStyels.importance}
          icon={false}
        />
        <ScrollArea.Root {...stylex.props(previewStyels.contentArea)}>
          <ScrollArea.Viewport style={{ height: '100%' }}>
            <p {...stylex.props(previewStyels.content)}>{content}</p>
          </ScrollArea.Viewport>
          <ScrollArea.ScrollAreaScrollbar
            {...stylex.props(scrollBarStyles.verticalBox)}
          >
            <ScrollArea.Thumb
              {...stylex.props(scrollBarStyles.verticalThumb)}
            />
          </ScrollArea.ScrollAreaScrollbar>
        </ScrollArea.Root>

        <ScrollArea.Root
          dir="ltr"
          style={{ width: '100%', overflow: 'hidden' }}
        >
          <ScrollArea.Viewport
            style={{ width: '100%' }}
            // {...stylex.props(
            //   previewStyels.tagsBox
            //   // nonScorlledOverflowStyles.horizontalFadeout
            // )}
          >
            <div
              {...stylex.props(
                previewStyels.tagsBox
                // nonScorlledOverflowStyles.horizontalFadeout
              )}
            >
              {tags.map((tag) => (
                <TagPill content={tag} externalStylex={previewStyels.tags} />
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.ScrollAreaScrollbar
            orientation="horizontal"
            {...stylex.props(scrollBarStyles.horizontalBox)}
          >
            <ScrollArea.Thumb
              {...stylex.props(scrollBarStyles.horizontalThumb)}
            />
          </ScrollArea.ScrollAreaScrollbar>
        </ScrollArea.Root>
        {/* <div
          {...stylex.props(
            previewStyels.tagsBox
            // nonScorlledOverflowStyles.horizontalFadeout
          )}
        >
          {tags.map((tag) => (
            <TagPill content={tag} externalStylex={previewStyels.tags} />
          ))}
        </div> */}
        <div {...stylex.props(previewStyels.evaluationBox)}>
          {memoEvaluationSelector(evaluation, 28, 28, previewStyels.evaluation)}
        </div>
      </div>
    </>
  );
};

const previewStyels = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // gap: '12px',
    gap: '4px',
  },
  dateBox: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  date: {
    color: colors.textWeek,
    fontSize: '12px',
  },
  title: {
    color: colors.textStrong,
    fontWeight: '800',
    // fontSize: '20px',
    fontSize: '16px',
  },
  importance: {
    // padding: '4px',
    paddingRight: '12px',
    // backgroundColor: 'none',
  },
  contentArea: {
    width: '100%',
    height: '100px',
    boxShadow: `0 0 0 1px ${colors.bgNormal}`,
    // width: '100%',
    borderRadius: '8px ',
    overflow: 'hidden',
    padding: '8px',
    boxSizing: 'border-box',
  },
  content: {
    whiteSpace: 'pre-wrap',
    color: colors.textNormal,
    // boxShadow: `0 0 0 1px ${colors.bgNormal}`,
    width: '100%',
    // borderRadius: '8px ',
    height: 'auto',
    margin: 0,
  },
  tagsBox: {
    display: 'flex',
    gap: '8px',
    width: '100%',
  },
  tags: {
    whiteSpace: 'nowrap',
    borderRadius: '8px',
    padding: '4px 6px',
  },
  evaluationBox: {
    display: 'flex',
    width: '100%',
  },
  evaluation: {},
});
