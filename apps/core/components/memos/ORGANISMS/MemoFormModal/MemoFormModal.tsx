import {
  getAllActualPortfolios,
  getAllPortfolios,
  getMemoFormById,
} from '@core/services/server';
import { postMemoForm } from '@core/services/serverFunctions/memosServerFunctions';
import MemoFormArea from '../MemoFormModalView/_ingredients/MemoFormArea/MemoFormArea';
import MemoReference from '../MemoFormModalView/_ingredients/MemoReference/MemoReference';
import PortfolioReference from '../MemoFormModalView/_ingredients/PortfolioReference/PortfolioReference';
import MemoFormModalView from '../MemoFormModalView/MemoFormModalView';
import StoreProvider from '@core/utils/components/StoreProvider/StoreProvider';
import { ComponentProps, Suspense } from 'react';
import FormActionButton from '@core/components/shared/MOLECULES/FormActionButton/FormActionButton';
import { PortfolioReferenceData } from '@core/types/memos/referenceData';
import { getQueryClient } from '@core/libs/tanstack-query/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { memoKeys } from '@core/services/keys/memoKeys';
import { getMemoRecents } from '@core/services/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface MemoFormModalProps {
  // asClose: ComponentProps<typeof MemoFormModalView>['asClose'];
  mode: 'add' | 'modify';
  memoId?: string;
  modalCloseHref: string;
}
const MemoFormModal = async ({
  // asClose,
  mode,
  memoId,
  modalCloseHref,
}: MemoFormModalProps) => {
  const [tmpAllPortfoliosRes, initFormDataRes] = await Promise.all([
    getAllPortfolios(),
    getMemoFormById(memoId),
    // getRelatedMemoByActualId(portfolioId),
  ]);

  const formId = 'memo';
  const buttonName = 'submitMode';

  const queryClient = getQueryClient();

  if (
    initFormDataRes.data?.linkedPortfolioInfo?.id &&
    initFormDataRes.data?.memoType !== 'event'
  ) {
    queryClient.prefetchQuery({
      queryKey: memoKeys.recents(
        initFormDataRes.data.memoType === 'actual'
          ? initFormDataRes.data?.linkedPortfolioInfo?.assetId
          : initFormDataRes.data.linkedPortfolioInfo?.id,
        initFormDataRes.data.memoType
      ),
      queryFn: () =>
        getMemoRecents(
          initFormDataRes.data.memoType === 'actual'
            ? initFormDataRes.data?.linkedPortfolioInfo?.assetId
            : initFormDataRes.data.linkedPortfolioInfo?.id,
          initFormDataRes.data.memoType
        ),
    });
  }

  return (
    <>
      <StoreProvider>
        <MemoFormModalView
          formArea={
            <MemoFormArea
              tmpPortfoliosInfo={
                tmpAllPortfoliosRes.data?.map((data) => ({
                  ...data,
                  // portfolioType: 'actual',
                })) ?? []
              }
              id={formId}
              initData={initFormDataRes.data || undefined}
              // tagInfo={}
              formAction={async (actionRes, formData) => {
                'use server';
                if (initFormDataRes && initFormDataRes.data?.id) {
                  formData.set('id', initFormDataRes.data?.id);
                }
                const res = await postMemoForm(formData);
                console.log('formActionRes: ', JSON.stringify(res));
                // res.error?.details;

                if (res.success) {
                  redirect(modalCloseHref);
                }

                return res;
              }} //
            />
          }
          memoReference={
            <HydrationBoundary state={dehydrate(queryClient)}>
              <MemoReference
                initInfo={
                  (initFormDataRes?.data?.linkedPortfolioInfo?.assetId ||
                    initFormDataRes.data?.linkedPortfolioInfo?.id) &&
                  initFormDataRes.data?.memoType !== 'event'
                    ? {
                        targetId:
                          initFormDataRes.data.memoType === 'actual'
                            ? initFormDataRes.data.linkedPortfolioInfo.assetId
                            : initFormDataRes.data.linkedPortfolioInfo.id,

                        portfolioType: initFormDataRes.data?.memoType,
                      }
                    : undefined
                }
              />
            </HydrationBoundary>
          }
          portfolioReference={
            <PortfolioReference
              init={
                initFormDataRes.data
                  ? ({
                      ...initFormDataRes.data?.linkedPortfolioInfo,
                      portfolioType:
                        initFormDataRes.data?.memoType === 'event'
                          ? 'none'
                          : initFormDataRes.data?.memoType,
                    } as PortfolioReferenceData)
                  : undefined
              }
            />
          }
          // asClose={asClose}
          asClose={<Link href={modalCloseHref} scroll={false} replace />}
          actionButton={
            <FormActionButton mode={mode} formId={formId} name={buttonName} />
          }
        />
      </StoreProvider>
    </>
  );
};

export default MemoFormModal;
