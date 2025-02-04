import { useState } from 'react';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import RelatedMemoRecord from './RelatedMemoRecord';
import RelatedPortfolios from './RelatedPortfolios';

const MemoModalSubContent = () => {
  const [subContent, setSubContent] = useState<
    'relatedMemoRecords' | 'relatedPortFolio'
  >('relatedMemoRecords');
  return (
    <>
      <div>
        <CompoundSegmentControl>
          <CompoundSegmentControl.Button
            textContent="관련 메모 기록"
            type="button"
            onClick={() => setSubContent('relatedMemoRecords')}
          />
          <CompoundSegmentControl.Button
            textContent="연관 포폴"
            type="button"
            onClick={() => setSubContent('relatedPortFolio')}
          />
        </CompoundSegmentControl>
      </div>
      {subContent === 'relatedMemoRecords' ? (
        <RelatedMemoRecord />
      ) : (
        <RelatedPortfolios />
      )}
    </>
  );
};

export default MemoModalSubContent;
