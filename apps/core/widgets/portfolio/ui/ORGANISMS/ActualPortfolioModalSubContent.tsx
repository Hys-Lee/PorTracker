import { useState } from 'react';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import RelatedActualPortfolioRecord from './RelatedActualPortfolioRecord';
import RelatedMemo from './RelatedMemo';

const ActualPortfolioModalSubContent = () => {
  const [subContent, setSubContent] = useState<
    'relatedActualPortfolioRecords' | 'relatedMemo'
  >('relatedActualPortfolioRecords');
  return (
    <>
      <div>
        <CompoundSegmentControl>
          <CompoundSegmentControl.Button
            textContent="관련 포폴 기록"
            type="button"
            onClick={() => setSubContent('relatedActualPortfolioRecords')}
          />
          <CompoundSegmentControl.Button
            textContent="연관 메모모"
            type="button"
            onClick={() => setSubContent('relatedMemo')}
          />
        </CompoundSegmentControl>
      </div>
      {subContent === 'relatedActualPortfolioRecords' ? (
        // <RelatedMemoRecord />
        <RelatedActualPortfolioRecord />
      ) : (
        // <RelatedPortfolios />
        <RelatedMemo />
      )}
    </>
  );
};

export default ActualPortfolioModalSubContent;
