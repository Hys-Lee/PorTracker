import { useState } from 'react';
import CompoundSegmentControl from '../../../../../shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import { motion } from 'motion/react';
import { css } from '@styled-system/css';

interface FlowAnnotationProps {
  positionData: {
    constraintsRef?: React.MutableRefObject<null>; // framer-motino에선 필요함
    x: number;
    y: number;
  };
  contentsData: {
    idx: number;
    type: string;
    date: string;
    asset: string;
    value: number;
    exchageRate: number; // 전달 받는거로 하자 그냥. 그래프 만들 때 필요하니까 애초에.. // 기본은 해당 국가 통화로. 따라서 원화로 바꾸려면 exchangeRate를 곱하도록.. (원과 자산은 rate를 1로 하면 되자너..)
  };
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ChartAnnotation = ({
  positionData: { constraintsRef, y, x },
  contentsData: { idx, type, date, asset, value, exchageRate },
  onClick,
}: FlowAnnotationProps) => {
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  // date, asset을 가지고 데이터를 가져와야 할 듯. type에 따라 어떤 데이터를 가져올지는 달라지고.
  // 밑의 데이터를 fetch등을 통해 가져와야 함.
  let price;
  let tradeType;
  let memoTitle;
  let memoParagraph;
  // compoundSegmentControl로는 exchangeRate를 통해 환율 적용 처리
  return (
    <>
      <motion.div
        onClick={onClick}
        dragConstraints={constraintsRef}
        drag
        style={{
          width: '120px',
          position: 'absolute',
          top: '0',
          // border: '1px solid black',
        }}
        className={css({
          border: '1px solid gray',
          bg: 'neutral.200',
          rounded: 'lg',
          padding: '4px',
          fontSize: 'xs',
          '& p': {
            fontSize: 'xs',
          },
        })}
        initial={{
          y: y,
          x: x,
        }}
        dragTransition={{ power: 0.5 }}
      >
        <div>
          <p>{date}</p>
          <p>{idx}</p>
        </div>
        <div>
          <p>{asset}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>평가금</p>
            <p>{value}</p>
            <CompoundSegmentControl style={{ width: '40px' }}>
              <CompoundSegmentControl.Button textContent="원" />
              <CompoundSegmentControl.Button textContent="$" />
            </CompoundSegmentControl>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>{tradeType === 'buy' ? '매수' : '매도'}</p>
            <p>{price}</p>
            <CompoundSegmentControl style={{ width: '40px' }}>
              <CompoundSegmentControl.Button textContent="원" />
              <CompoundSegmentControl.Button textContent="$" />
            </CompoundSegmentControl>
          </div>
        </div>
        {type && isMemoOpen && (
          <div>
            <div>구분선</div>
            <p>{memoTitle}</p>
            <p>{memoParagraph}</p>
          </div>
        )}
        {type && (
          <button onClick={() => setIsMemoOpen(!isMemoOpen)}>
            {isMemoOpen ? '축소 버튼' : '확장 버튼'}
          </button>
        )}
      </motion.div>
    </>
  );
};
export default ChartAnnotation;
