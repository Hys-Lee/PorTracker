import { useRef } from 'react';
import ChartAnnotation from './ChartAnnotation';

export default {
  component: ChartAnnotation,
  title: 'ChartAnnotation',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => {
  const constraintsRef = useRef(null);
  return (
    <div ref={constraintsRef}>
      <ChartAnnotation
        positionData={{ constraintsRef, y: 0, x: 0 }}
        contentsData={{
          asset: '',
          date: '',
          exchageRate: 1,
          idx: 1,
          type: '',
          value: 123,
        }}
      />
    </div>
  );
};
export const Default = Template.bind({});
