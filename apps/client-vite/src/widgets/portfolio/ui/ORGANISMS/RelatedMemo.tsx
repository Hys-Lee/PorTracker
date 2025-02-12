import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/MOLECULES/Tile';

const RelatedMemo = () => {
  // 날짜만 넘겨받으면 fetch해보기.
  return (
    <>
      <Tile>
        <p>제목</p>
        <p>메모 본문</p>
        <p>태그</p>
        <p>커스텀 템플릿릿</p>
      </Tile>
    </>
  );
};
export default RelatedMemo;
