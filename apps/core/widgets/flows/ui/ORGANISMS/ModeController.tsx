import { FlowMode, FlowModeAtom } from 'src/entities/flows/atoms/flowAtoms';
import { cva, css } from '@styled-system/css';
import { Atom, SetStateAction, useAtom } from 'jotai';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';

const ModeController = () => {
  const [selectedMode, setSelectedMode] = useAtom(FlowModeAtom);
  const flowModes: FlowMode[] = ['actual', 'preset', 'comparison'];
  const flowModeLabels = ['실제', '설정', '비교'];
  const modeInfo: Array<{
    value: FlowMode;
    selected: boolean;
    label: string;
  }> = flowModes.map((mode, idx) => ({
    value: mode,
    selected: mode === selectedMode,
    label: flowModeLabels[idx],
  }));
  return (
    <>
      <CompoundSegmentControl className={SegmentControlBodyStyle}>
        {modeInfo.map((mode) => (
          <CompoundSegmentControl.Button
            key={mode.value}
            textContent={mode.label}
            onClick={() => setSelectedMode(mode.value)}
            className={
              mode.value === selectedMode
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
