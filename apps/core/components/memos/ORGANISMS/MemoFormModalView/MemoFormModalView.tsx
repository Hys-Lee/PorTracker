'use client';

import FormModalFrame from '@core/components/shared/ATOMS/FormModalFrame/FormModalFrame';
import {
  cloneElement,
  ComponentProps,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import * as stylex from '@stylexjs/stylex';

import SegmentControl from '@core/components/shared/MOLECULES/SegmentControl/SegmentControl';
import { useAtom, useAtomValue } from 'jotai';
import {
  copiedMemoFormDataAtom,
  linkedPortfolioInfoAtom,
} from '@core/stores/memos/memoModalStore';

interface ActualFormModalViewProps {
  asClose?: ComponentProps<typeof FormModalFrame>['asClose'];
  actionButton?: ReactNode;
  formArea: ReactNode;
  portfolioReference: ReactNode;
  memoReference: ReactNode;
}
const MemoFormModalView = ({
  asClose,
  actionButton,
  formArea,
  memoReference,
  portfolioReference,
}: ActualFormModalViewProps) => {
  const [referMode, setReferMode] = useState<
    'portfolioReference' | 'memoReference'
  >('memoReference');
  const linkedPortfolioData = useAtomValue(linkedPortfolioInfoAtom); // 선택 안하면 undefined
  return (
    <FormModalFrame
      open={true}
      asClose={asClose}
      frameStylex={modalStyles.frame}
    >
      <div
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   gap: '24px',
        //   // justifyContent: 'space-between',
        // }}
        {...stylex.props(modalStyles.container)}
      >
        <div
          // style={{ display: 'flex', justifyContent: 'center' }}
          {...stylex.props(modalStyles.header)}
        >
          <h2
            //   style={{ margin: '10px' }}
            {...stylex.props(modalStyles.title)}
          >
            {'Memos'}
          </h2>
        </div>
        <section
          //   style={{
          //     display: 'grid',
          //     gridTemplateColumns: '1fr 1fr',
          //     gap: '44px',
          //     height: '440px',
          //   }}
          {...stylex.props(modalStyles.content)}
        >
          {/* <FormArea /> */}
          <div style={{ width: '100%' }}>
            {
              formArea

              // cloneElement(formArea as ReactElement, {
              //   key: copiedFormData?.id,
              // })
            }
          </div>
          <div
            // style={{
            //   width: '100%',
            //   display: 'flex',
            //   gap: '8px',
            //   flexDirection: 'column',
            //   justifyContent: 'start',
            // }}
            {...stylex.props(modalStyles.referenceArea)}
          >
            <SegmentControl
              items={referModes}
              defaultSelected={referModes[0]}
              onChange={(selected) => {
                setReferMode(selected.value as typeof referMode);
              }}
              selected={referModes.find(({ value }) => value === referMode)}
            />
            {referMode === 'portfolioReference'
              ? portfolioReference
              : // : memoReference}
                cloneElement(memoReference as ReactElement, {
                  key: linkedPortfolioData?.id,
                })}
          </div>
        </section>
        {actionButton}
      </div>
    </FormModalFrame>
  );
};

export default MemoFormModalView;

const referModes = [
  { value: 'memoReference', text: 'Memo Histories' },
  { value: 'portfolioReference', text: 'Linked Portfolio' },
];

const modalStyles = stylex.create({
  frame: {
    backgroundColor: 'white',
    // height: 'auto',
    height: '600px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    margin: '10px',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '44px',
    height: '440px',
    // height: '500px',
  },
  referenceArea: {
    width: '100%',
    minWidth: '0%',
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    justifyContent: 'start',
  },
});
