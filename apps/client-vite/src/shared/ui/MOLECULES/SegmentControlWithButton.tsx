import { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';
import Text from '../ATOMS/Text';
import { RecipeConfig, RecipeVariantRecord } from '@pandacss/dev';
import { RecipeRuntimeFn } from '@styled-system/types';
import { segmentControlButton } from 'src/widgets/flows/ui/ORGANISMS/ModeContoller';

// 모드 변환하는 박스 같은거.

interface SegmentControlProps<T extends { content: string; selected: boolean }>
  extends HTMLAttributes<HTMLDivElement> {
  // ButtonHTMLAttributes<HTMLButtonElement>
  elementsInfo: T[];
  onButtonClick: (ButtonIdx: number) => void;
  stylingClassName: {
    body: string;
    button: { selected: string; unselected: string };
  };
}

const SegmentControl = <T extends { content: string; selected: boolean }>({
  elementsInfo,
  onButtonClick,
  stylingClassName,
  ...props
}: SegmentControlProps<T>) => {
  return (
    <div {...props} className={stylingClassName.body}>
      {elementsInfo.map((eleInfo, idx) => (
        <button
          // style={{
          //   backgroundColor: ele === selectedEle ? 'skyblue' : 'grey',
          //   flexGrow: 1,
          // }}

          onClick={() => {
            onButtonClick(idx);
          }}
          className={
            eleInfo.selected
              ? stylingClassName.button.selected
              : stylingClassName.button.unselected
          }
        >
          <Text as={'p'} textContent={eleInfo.content} key={eleInfo.content} />
        </button>
      ))}
    </div>
  );
};

export default SegmentControl;
