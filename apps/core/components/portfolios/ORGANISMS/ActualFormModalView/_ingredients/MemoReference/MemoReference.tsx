import MemoPill from '@core/components/shared/ATOMS/MemoPill/MemoPill';
import TagPill from '@core/components/shared/ATOMS/TagPill/TagPill';
import { colors } from '../../../../../../tokens/colors.stylex';
import { MemoEvaluationValue, MemoImportanceValue } from '@core/types';
import { memoEvaluationSelector } from '@core/utils/renderers/iconSelector';
import { Fragment } from 'react/jsx-runtime';
import * as stylex from '@stylexjs/stylex';
import { ScrollArea } from 'radix-ui';
import Separator from '@core/components/shared/ATOMS/Separator/Separator';

interface MemoReferenceProps {
  importance: MemoImportanceValue;
  title: string;
  content: string;
  tags: string[];
  evaluation: MemoEvaluationValue;
}
const MemoReference = ({
  content,
  evaluation,
  importance,
  tags,
  title,
}: MemoReferenceProps) => {
  return (
    <>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          backgroundColor: colors.bgWeek,
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MemoPill
            type="critical"
            wrapperStylex={
              importanceStyles[
                importance === 'critical' ? 'active' : 'inactive'
              ]
            }
          />
          <MemoPill
            type="useful"
            wrapperStylex={
              importanceStyles[importance === 'useful' ? 'active' : 'inactive']
            }
          />
          <MemoPill
            type="normal"
            wrapperStylex={
              importanceStyles[importance === 'normal' ? 'active' : 'inactive']
            }
          />
        </div>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '800',
            color: colors.textStrong,
            margin: 0,
          }}
        >
          {title}
        </h2>
        <ScrollArea.Root>
          <Separator color="normal" />
          <ScrollArea.Viewport
            style={{
              height: '160px',
              padding: '8px 0',
            }}
          >
            <p
              style={{
                whiteSpace: 'pre-wrap',
                color: colors.textNormal,
                margin: 0,
              }}
            >
              {content}
            </p>
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
          <Separator color="normal" />
        </ScrollArea.Root>
        <div {...stylex.props(subAreaStyles.base)}>
          <span {...stylex.props(subTitleStyles.base)}>{'Tags'}</span>
          <div>
            {tags.map((tagContent) => (
              <TagPill content={tagContent} />
            ))}
          </div>
        </div>
        <div {...stylex.props(subAreaStyles.base)}>
          <span {...stylex.props(subTitleStyles.base)}>{'Evaluations'}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {evalutationValues.map((type) => (
              <Fragment key={type}>
                {memoEvaluationSelector(
                  type,
                  28,
                  28,
                  evaluationStyles[type === evaluation ? 'active' : 'inactive']
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default MemoReference;

const subTitleStyles = stylex.create({
  base: {
    fontSize: '16px',
    fontWeight: '800',
  },
});

const subAreaStyles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

const importanceStyles = stylex.create({
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.4,
  },
});

const evalutationValues: MemoEvaluationValue[] = [
  'better',
  'good',
  'soso',
  'bad',
  'worse',
];
const evaluationStyles = stylex.create({
  active: {
    color: colors.primary,
  },
  inactive: {
    // color: `rgb(from ${colors.primary} r g b / 0.5)`,
    color: `rgb(from ${colors.iconFilter} r g b / 0.5)`,
  },
});
