import RelatedPresetPortfolio from './RelatedPresetPortfolio';
import RelatedActualPortfolio from './RelatedActualPortfolio';

const RelatedPortfolios = () => {
  // 현재 날짜에 맞는 실제 포트폴리오가 있다면 데이터 가져와서 보여주기
  // 현재 날짜 이전을 뒤지다 제일 처음 발견하는 설정포트폴리오를 가져오기.
  return (
    <>
      <div>
        <RelatedActualPortfolio />
        <RelatedPresetPortfolio />
      </div>
    </>
  );
};

export default RelatedPortfolios;
