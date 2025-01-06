import SegmentControl from './SegmentControlWithButton';

export default {
  component: SegmentControl,
  title: 'SegmentControl',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

export const FirstSelection = {
  args: {
    elementsInfo: ['a', 'b', 'c'],
  },
};
