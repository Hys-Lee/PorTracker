import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import RelatedActualPortfolioRecordDetail from './RelatedActualPortfolioRecordDetail';
import getActual from 'src/features/tmpFuncs/getActualPort';
import getActualPorts from 'src/features/tmpFuncs/getAcutalPorts';

const RelatedActualPortfolioRecord = () => {
  // 관련 포폴 fetch
  // 이 포폴들은 무한스크롤로 제작해야 함.
  const actualPorts = getActualPorts();
  return (
    <>
      <div>
        <Tile>
          <ul style={{ height: '100px', overflowY: 'scroll' }}>
            {/* {memos.map((memoData) => ( */}
            {actualPorts.map((data) => (
              <li style={{ display: 'flex', gap: '12px' }} id={`${data.id}`}>
                <p>{data.date.toISOString()}</p>
                <p>{data.transactionType}</p>
              </li>
            ))}
            {/* ))} */}
            {/* <li style={{ display: 'flex', gap: '12px' }}>
              <p>date</p>
              <p>transactionType</p>
            </li> */}
          </ul>
        </Tile>
        <Tile>
          {/** <p>이전 기록을 참조할 수도 있어요</p> */}
          <RelatedActualPortfolioRecordDetail />
        </Tile>
      </div>
    </>
  );
};
export default RelatedActualPortfolioRecord;
