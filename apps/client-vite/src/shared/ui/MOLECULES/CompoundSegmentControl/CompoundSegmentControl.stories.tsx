import Text from '../../ATOMS/Text';
import SegmentControl from './CompoundSegmentControl';
import SegmentControlButton from './SegmentControlButton';
import SegmentControlMain from './SegmentControlMain';

export default {
  component: SegmentControl,
  title: 'CompoundSegmentControl',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => (
  <SegmentControl>
    <SegmentControlButton textContent="와우" />
    <SegmentControlButton textContent="와우" />
    <SegmentControlButton textContent="와우" />
  </SegmentControl>
);
export const Default = Template.bind({});
