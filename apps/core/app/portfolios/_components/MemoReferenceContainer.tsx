import MemoReference from '@core/components/portfolios/ORGANISMS/ActualFormModalView/_ingredients/MemoReference/MemoReference';
import { RelatedMemo } from '@core/schemas/features/portfolios/portfolios.schema';
import { getRelatedMemoByMemoId } from '@core/services/server/queries/portfoliosQueries';
import { colors } from '@core/tokens/colors.stylex';
import { Suspense, use } from 'react';

interface MemoReferenceContainerProps {
  memoDataPromise: ReturnType<typeof getRelatedMemoByMemoId>;
}

const MemoReferenceContainer = ({
  memoDataPromise,
}: MemoReferenceContainerProps) => {
  const memoDataRes = use(memoDataPromise);

  return (
    <>
      {memoDataRes.success ? (
        <MemoReference
          content={memoDataRes.data?.content || ''}
          evaluation={memoDataRes.data?.evaluation || 'soso'}
          importance={memoDataRes.data?.importance || 'normal'}
          tags={memoDataRes.data?.tags || []}
          title={memoDataRes.data?.title || ''}
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
