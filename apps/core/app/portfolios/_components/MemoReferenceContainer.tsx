'use client';

import MemoReference from '@core/components/portfolios/ORGANISMS/ActualFormModalView/_ingredients/MemoReference/MemoReference';
import { RelatedMemo } from '@core/schemas/features/portfolios/portfolios.schema';
import { getRelatedMemoByMemoId } from '@core/services/server/queries/portfoliosQueries';
import { linkedMemoInfoAtom } from '@core/stores/portfolios/actualModalStore';
import { colors } from '@core/tokens/colors.stylex';
import { useAtomValue } from 'jotai';
import { Suspense, use } from 'react';

interface MemoReferenceContainerProps {
  // memoDataPromise: ReturnType<typeof getRelatedMemoByMemoId>;
  initPromise?: ReturnType<typeof getRelatedMemoByMemoId>;
}

const MemoReferenceContainer = ({
  initPromise,
}: // memoDataPromise,
MemoReferenceContainerProps) => {
  // const memoDataRes = use(memoDataPromise);

  const linkedMemoInfo = useAtomValue(linkedMemoInfoAtom);
  const finalInkedMemoInfo =
    linkedMemoInfo !== undefined
      ? linkedMemoInfo
      : initPromise !== undefined
      ? use(initPromise).data
      : undefined;
  return (
    <>
      {/* {memoDataRes.success ? (
        <MemoReference
          content={memoDataRes.data?.content || ''}
          evaluation={memoDataRes.data?.evaluation || 'soso'}
          importance={memoDataRes.data?.importance || 'normal'}
          tags={memoDataRes.data?.tags || []}
          title={memoDataRes.data?.title || ''}
        />
      ) : ( */}
      {finalInkedMemoInfo ? (
        <MemoReference
          content={finalInkedMemoInfo?.content || ''}
          evaluation={finalInkedMemoInfo?.evaluation || 'soso'}
          importance={finalInkedMemoInfo?.importance || 'normal'}
          tags={finalInkedMemoInfo?.tags || []}
          title={finalInkedMemoInfo?.title || ''}
        />
      ) : (
        // <>여기 만들어야 함</>
        <NoLinkedMemo />
      )}
    </>
  );
};

export default MemoReferenceContainer;

const NoLinkedMemo = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          // height: '100%',
          // height: '100%',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: colors.textWeek,
        }}
      >
        메모 연결 시 상세화면이 보입니다
      </div>
    </>
  );
};
