import Text from '../../ATOMS/Text';
import SegmentControlButton from './SegmentControlButton';
import SegmentControlMain from './SegmentControlMain';

const CompoundSegmentControl = Object.assign(SegmentControlMain, {
  Button: SegmentControlButton,
});

export default CompoundSegmentControl;
