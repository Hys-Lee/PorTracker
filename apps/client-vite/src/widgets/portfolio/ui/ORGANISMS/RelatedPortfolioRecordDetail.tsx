import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';

const RelatedMemoRecordDetail = () => {
  // 상태관리 사용해서 MemoModal에 setValue시키기
  return (
    <>
      <div>
        <button>{`<-참조하기`}</button>
      </div>
      <div>
        <div>
          <p>날짜</p>
          <p>대충 날짜</p>
        </div>
        <div>
          <p>유형</p>
          <p>대충 유형 - 투입</p>
        </div>
        <div>
          <p>가격</p>
          <p>대충 가격</p>
          <CompoundSegmentControl>
            <CompoundSegmentControl.Button textContent="원" />
            <CompoundSegmentControl.Button textContent="$" />
          </CompoundSegmentControl>
        </div>
        <div>
          <p>환율</p>
          <p>대충 환율</p>
        </div>
        <div>
          <p>수량</p>
          <p>대충수량</p>
        </div>
        <div>
          <p>금액</p>
          <p>대충 금액</p>
        </div>
      </div>
    </>
  );
};
export default RelatedMemoRecordDetail;
