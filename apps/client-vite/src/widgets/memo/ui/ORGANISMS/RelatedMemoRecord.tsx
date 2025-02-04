import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import RelatedMemoRecordDetail from './RelatedMemoRecordDetail';
import Tile from 'src/shared/ui/MOLECULES/Tile';
import getMemos from 'src/features/tmpFuncs/getMemos';

const RelatedMemoRecord = () => {
  // 관련 메모들을 전부 fetch
  const memos = getMemos();
  // 이 메모들은 무한스크롤로 제작해야 함.
  return (
    <>
      <div>
        <Tile>
          <ul style={{ height: '100px', overflowY: 'scroll' }}>
            {memos.map((memoData) => (
              <li style={{ display: 'flex', gap: '12px' }}>
                <p>{memoData.date.toISOString()}</p>
                <p>{memoData.transactionType}</p>
              </li>
            ))}
            {/* <li style={{ display: 'flex', gap: '12px' }}>
              <p>date</p>
              <p>transactionType</p>
            </li> */}
          </ul>
        </Tile>
        <Tile>
          {/** <p>이전 기록을 참조할 수도 있어요</p> */}
          <RelatedMemoRecordDetail />
        </Tile>
      </div>
    </>
  );
};
export default RelatedMemoRecord;
