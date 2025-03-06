import { FlowMode, FlowModeAtom } from 'src/entities/flows/atoms/flowAtoms';
import { cva, css } from '@styled-system/css';
import { Atom, SetStateAction, useAtom } from 'jotai';
import SegmentControl from 'src/shared/ui/MOLECULES/SegmentControlWithButton';
import { useState } from 'react';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import SegmentControlButton from 'src/shared/ui/MOLECULES/CompoundSegmentControl/SegmentControlButton';
import useAtomicInputControl from 'src/features/hooks/atomics/useAtomicInputControl';

const ModeController = () => {
  const [selectedMode, setSelectedMode] = useAtom(FlowModeAtom);
  const flowModes: FlowMode[] = ['actual', 'preset', 'comparison'];
  const modeInfo: Array<{ content: FlowMode; selected: boolean }> =
    flowModes.map((mode) => ({
      content: mode,
      selected: mode === selectedMode,
    }));
  return (
    <>
      {/* <SegmentControl
        stylingClassName={{
          body: SegmentControlBodyStyle,
          button: {
            selected: segmentControlButton({ bg: 'selected' }),
            unselected: segmentControlButton({ bg: 'unselected' }),
          },
        }}
        elementsInfo={modeInfo}
        onButtonClick={(idx: number) => {
          setSelectedMode(modeInfo[idx].content);
        }}
      /> */}
      <CompoundSegmentControl className={SegmentControlBodyStyle}>
        {modeInfo.map((mode) => (
          <CompoundSegmentControl.Button
            key={mode.content}
            textContent={mode.content}
            onClick={() => setSelectedMode(mode.content)}
            className={
              mode.content === selectedMode
                ? segmentControlButton({ bg: 'selected' })
                : segmentControlButton({ bg: 'unselected' })
            }
          />
        ))}
      </CompoundSegmentControl>
    </>
  );
};
export default ModeController;

const SegmentControlBodyStyle = css({
  backgroundColor: 'neutral.300',
  display: 'flex',
  rounded: 'lg',
  padding: '4px',
  // zIndex: 3,
  // margin: '1rem',
});
export const segmentControlButton = cva({
  base: { flexGrow: 1, padding: '4px', rounded: 'lg' },
  variants: {
    bg: {
      selected: { backgroundColor: 'white' },
      unselected: { backgroundColor: 'neutral.300' },
    },
  },
});
