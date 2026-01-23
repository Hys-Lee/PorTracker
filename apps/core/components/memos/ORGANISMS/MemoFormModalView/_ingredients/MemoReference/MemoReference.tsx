import { MemoEvaluationValue, MemoImportanceValue } from '@core/types';
import { colors } from '../../../../../../tokens/colors.stylex';
import * as stylex from '@stylexjs/stylex';
import { ScrollArea } from 'radix-ui';
import TagPill from '@core/components/shared/ATOMS/TagPill/TagPill';
import MemoPill from '@core/components/shared/ATOMS/MemoPill/MemoPill';
import { dateFormatter } from '@core/utils/helpers/dateFormatter';
import { useQuery } from '@tanstack/react-query';
// import { memoKeys } from '@core/services/keys/memoKeys';
import { getMemoRecents, memoKeys } from '@core/services';
import { memoEvaluationSelector } from '@core/utils/renderers/iconSelector';
import Separator from '@core/components/shared/ATOMS/Separator/Separator';
import {
  nonScorlledOverflowStyles,
  scrollBarStyles,
} from '@core/styles/scroll.stylex';
import { useState } from 'react';

export type MemoRecents = PreviewProps & { id: string };

const MemoReference = () => {
  const linkedId = undefined; // actual에서 자산 id, target에선 target id 혹은 undefined
  const { data: recents } = useQuery({
    queryKey: memoKeys.recents(linkedId),
    queryFn: () => {
      return getMemoRecents(linkedId);
    },
  }); // useSuspenseQuery로 바꿀거임.

  //test

  const [selectedRecent, setSelectedRecent] = useState<
    MemoRecents | undefined
  >();

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
              fontSize: '16px',
            }}
          >
            Recent History
          </p>
          {/* <div style={{ height: '200px', overflowY: 'auto' }}> */}

          <ScrollArea.Root style={{}}>
            <ScrollArea.Viewport
              style={{
                height: '80px',
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
                  // height: 'auto',
                  // flexGrow: 1,
                }}
              >
                {(recents as MemoRecents[]).map((recentData) => {
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
                })}
                {/* <MemoHistoryRow
                  date={new Date()}
                  firstTag="tag1"
                  importance="normal"
                  title="타이틀"
                />
                <MemoHistoryRow
                  date={new Date()}
                  firstTag="tag3가 너무 길어서 넘겨버리면"
                  importance="critical"
                  title="타이틀두번째"
                /> */}
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
        <div
          style={{
            position: 'relative',
            width: '100%',
            flexGrow: 1,
            height: '200px',
          }}
        >
          {selectedRecent ? (
            <Preview {...selectedRecent} />
          ) : (
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              기록 선택 시 상세 화면이 보입니다.
            </div>
          )}
          {/* <Preview
            content={`ㅁㄴㅇㄹ\nasdfasdfasdf\n1\n1\n1\n1\n1\n1\n1\n1`}
            date={new Date()}
            evaluation="soso"
            importance="useful"
            tags={['tag1', 'tag2']}
            title="타이타이틀"
          /> */}
        </div>
      </div>
    </>
  );
};
export default MemoReference;

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

interface PreviewProps {
  date: Date;
  title: string;
  importance: MemoImportanceValue;
  content: string;
  tags: string[];
  evaluation: MemoEvaluationValue;
}
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
    gap: '12px',
  },
  dateBox: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
  },
  date: {
    color: colors.textWeek,
    fontSize: '12px',
  },
  title: {
    color: colors.textStrong,
    fontWeight: '800',
    fontSize: '20px',
  },
  importance: {
    // padding: '4px',
    paddingRight: '12px',
    // backgroundColor: 'none',
  },
  contentArea: {
    width: '100%',
    height: '160px',
    boxShadow: `0 0 0 1px ${colors.bgNormal}`,
    // width: '100%',
    borderRadius: '8px ',
    overflow: 'hidden',
    padding: '8px',
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
  },
  evaluationBox: {
    display: 'flex',
    width: '100%',
  },
  evaluation: {},
});
