import { serverFetch } from '@core/libs/api/server-fetcher';
import FormArea from '../ActualFormModalView/_ingredients/ActualFormArea/ActualFormArea';
import MemoReference from '../ActualFormModalView/_ingredients/MemoReference/MemoReference';
import PortfolioReference from '../ActualFormModalView/_ingredients/PortfolioReference/PortfolioReference';
import ActualFormModalView, {
  tmp,
} from '../ActualFormModalView/ActualFormModalView';
import {
  getActualPortfolioById,
  getActualPortfolioRecents,
  getAllActualPortfolios,
  getAssets,
  getRelatedMemoByMemoId,
  getTransactionTypes,
  postActualForm,
  tmpAction,
} from '@core/services';
// } from '@core/services/queries/portfoliosQueries';
// } from '@core/mocks/services/queries/portfoliosQueries';
// import { tmpAction } from '@core/services/actions/tmpActions';
import { transactionIconSelector } from '@core/utils/renderers/iconSelector';
// import {} from 'overlay-kit'
import { ComponentProps, Suspense, use } from 'react';
import { TRANSACTION_MAP } from '@core/constants';
import MemoReferenceContainer from '@core/app/portfolios/_components/MemoReferenceContainer';
import Button from '@core/components/shared/ATOMS/Button/Button';

import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import StoreProvider from '@core/utils/components/StoreProvider/StoreProvider';
import FormActionButton from '@core/components/shared/MOLECULES/FormActionButton/FormActionButton';

interface ActualFormModalProps {
  transactionTypesInfo: ComponentProps<typeof FormArea>['transactionTypeInfo'];
  assetsInfo: ComponentProps<typeof FormArea>['assetsInfo'];
  portfolioId?: string;
  asClose: ComponentProps<typeof ActualFormModalView>['asClose'];
  mode: 'add' | 'modify';
}

const ActualFormModal = async ({
  transactionTypesInfo,
  assetsInfo,
  portfolioId,
  asClose,
  mode,
}: ActualFormModalProps) => {
  const [recentsRes, initFormDataRes] = await Promise.all([
    getActualPortfolioRecents(),
    getActualPortfolioById(portfolioId),
    // getRelatedMemoByActualId(portfolioId),
  ]);

  const formId = 'actual';
  const buttonName = 'submitMode';
  /** ********************************
   *
   *
   * 상황이 [추가] 인지 [수정] 인지 여기서 확인할 수 있으면 좋겠는디. rsc니까요.
   * 인자를 뚫어도 여기서 뚫어야 함. 왜냐면 form에서의 id랑 버튼이랑 연결할 수 있으니까.
   *
   *
   */

  //test
  // console.log('init: ', initFormDataRes.data?.date);

  return (
    <>
      <StoreProvider>
        <ActualFormModalView
          formArea={
            <FormArea
              id={formId}
              transactionTypeInfo={
                // transactionTypesRes.data?.map((data) => ({
                //   value: data.value,
                //   text: data.text,
                //   icon: transactionIconSelector(data.value, 32, 32),
                // })) ?? []
                transactionTypesInfo
              }
              assetsInfo={
                // assetsRes.data?.map((data) => ({
                //   text: data.name,
                //   value: data.id,
                // })) || []
                assetsInfo
              }
              initData={
                initFormDataRes?.data
                  ? {
                      amount: initFormDataRes.data?.amount || 0,
                      assetInfo: {
                        text: initFormDataRes.data?.assetInfo.name || '',
                        value: initFormDataRes.data?.assetInfo.id || '',
                      },
                      currency: {
                        text: initFormDataRes.data?.currency,
                        value: initFormDataRes.data?.currency || 'usd',
                      },
                      date: initFormDataRes.data?.date,
                      exchangeRate: initFormDataRes.data.exchangeRate,
                      price: initFormDataRes.data.price,
                      transactionType: initFormDataRes.data.transactionType,
                    }
                  : undefined
              }
              currenciesInfo={[
                { value: 'usd', text: 'usd' },
                { value: 'krw', text: 'krw' },
              ]}
              localCurrencyValue="krw"
              formAction={async (actionRes, formData) => {
                'use server';
                if (initFormDataRes && initFormDataRes.data?.id) {
                  formData.set('id', initFormDataRes.data?.id);
                }
                const res = await postActualForm(formData);
                // console.log('formActionRes: ', JSON.stringify(res));
                // res.error?.details;
                return res;
              }} //
              // formAction={tmpAction} //
            />
          }
          portfolioReference={
            <PortfolioReference
              recentsInfo={
                recentsRes.data?.map((data) => ({
                  assetId: data.assetInfo.id,
                  recents: data.recents.map((recentData) => ({
                    amount: recentData.amount,
                    date: recentData.date,
                    exchangeRateInfo: {
                      unit: recentData.currency,
                      value: recentData.exchangeRate,
                    },
                    id: recentData.id,
                    price: recentData.price,
                    transactionnTypeInfo: {
                      text: TRANSACTION_MAP[recentData.transactionType],
                      value: recentData.transactionType,
                    },
                  })),
                })) || []
              }
              // itemsInfo={
              //   initFormDataRes?.data?.recents.map((data) => ({
              //     amount: data.amount,
              //     date: data.date,
              //     exchangeRateInfo: {
              //       unit: data.currency,
              //       value: data.exchangeRate,
              //     },
              //     id: data.id,
              //     price: data.price,
              //     transactionnTypeInfo: {
              //       text: TRANSACTION_MAP[data.transactionType],
              //       value: data.transactionType,
              //     },
              //   })) ?? []
              // }
            />
          }
          memoReference={
            <Suspense fallback={<>대기중</>}>
              <MemoReferenceContainer
                memoDataPromise={getRelatedMemoByMemoId(
                  initFormDataRes?.data?.relatedMemoId || ''
                )}
              />
            </Suspense>
          }
          // onClose={tmp}
          asClose={asClose}
          actionButton={
            // mode === 'add' ? (
            //   <Button variant="solid" rounded="normal" type="submit" form="">
            //     추가
            //   </Button>
            // ) : (
            //   <div style={{ display: 'flex', gap: '8px' }}>
            //     <Button variant="solid" rounded="normal">
            //       삭제
            //     </Button>
            //     <Button variant="solid" rounded="normal">
            //       저장
            //     </Button>
            //   </div>
            // )
            <FormActionButton mode={mode} formId={formId} name={buttonName} />
          }
        />
      </StoreProvider>
    </>
  );
};

export default ActualFormModal;
