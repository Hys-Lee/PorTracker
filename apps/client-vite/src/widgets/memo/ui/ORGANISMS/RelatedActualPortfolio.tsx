import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/MOLECULES/Tile';

const RelatedActualPortfolio = () => {
  // 날짜만 넘겨받으면 fetch해보기.
  const noActual = true; // 임시
  const isVip = true; // 임시
  return (
    <>
      <Tile>
        {noActual /*날짜에 데이터가 없다면*/ ? (
          <p>해당 날짜에 실제 포트폴리오가 없어요</p>
        ) : (
          <>
            <p>실제 포트폴리오</p>
            <div>
              <p>가격</p>
              <p>대충가격</p>
              <CompoundSegmentControl>
                <CompoundSegmentControl.Button textContent="원" />
                <CompoundSegmentControl.Button textContent="$" />
              </CompoundSegmentControl>
            </div>
            <div>
              <p>환율</p>
              <div>도움말</div>
              <p>대충 환율</p>
            </div>
            <div>
              <p>수량</p>
              <p>대충 수량</p>
            </div>
            <div>
              <p>금액</p>
              <p>대충 금액</p>
            </div>
            {isVip && (
              /*vip여야 함*/ <div>
                <p>이익</p>
                <div>
                  <CompoundSegmentControl>
                    <CompoundSegmentControl.Button textContent="선입선출" />
                    <CompoundSegmentControl.Button textContent="이동평균" />
                  </CompoundSegmentControl>
                  <p>대충이익</p>
                </div>
              </div>
            )}
          </>
        )}
      </Tile>
    </>
  );
};
export default RelatedActualPortfolio;
