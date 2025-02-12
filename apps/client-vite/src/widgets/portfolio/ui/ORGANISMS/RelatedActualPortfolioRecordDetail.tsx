import { useSetAtom } from 'jotai';
import { relatedActualAtom } from 'src/entities/tmpAtoms/relatedActualAtom';
import getActual from 'src/features/tmpFuncs/getActualPort';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';

const RelatedActualPortfolioRecordDetail = () => {
  // 상태관리 사용해서 MemoModal에 setValue시키기
  const {
    asset,
    currency,
    date,
    exchangeRate,
    price,
    profitType,
    shares,
    transactionType,
  } = getActual();
  const setActuals = useSetAtom(relatedActualAtom);
  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            setActuals({
              date,
              exchangeRate,
              price,
              shares,
              transactionType,
            });
          }}
        >{`<-참조하기`}</button>
      </div>
      <div>
        <div>
          <p>날짜</p>
          <p>{date.toISOString()}</p>
        </div>
        <div>
          <p>유형</p>
          <p>{transactionType}</p>
        </div>
        <div>
          <p>가격</p>
          <p>{price}</p>
          <CompoundSegmentControl>
            <CompoundSegmentControl.Button textContent="원" />
            <CompoundSegmentControl.Button textContent="$" />
          </CompoundSegmentControl>
        </div>
        <div>
          <p>환율</p>
          <p>{exchangeRate}</p>
        </div>
        <div>
          <p>수량</p>
          <p>{shares}</p>
        </div>
        <div>
          <p>금액</p>
          <p>{price * shares}</p>
        </div>
      </div>
    </>
  );
};
export default RelatedActualPortfolioRecordDetail;
