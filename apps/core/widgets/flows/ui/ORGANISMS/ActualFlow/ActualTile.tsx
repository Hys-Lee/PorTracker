import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import { z } from 'zod';
import { css } from '@styled-system/css';
import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { ActualFlowFocusInfoAtom } from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import { putTradeData } from 'src/shared/ui/MOLECULES/chartDataHandler';
import DividingLine from 'src/shared/ui/ATOMS/DividingLine';
import ActualPortfolioContents from '../Form/ActualPortfolioContents';
import MemoContents from '../Form/MemoContents';
import { actualPortfolioMinSchema } from 'src/shared/forms/actualPortfolioSchema';
import { memoMinSchema } from 'src/shared/forms/memoSchema';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import queryFactory from 'src/features/hooks/queries/flows/queryFactory';

const acutalFlowSchema = z
  .object({})
  .merge(actualPortfolioMinSchema)
  .merge(memoMinSchema);

type ActualFlowForm = z.infer<typeof acutalFlowSchema>;
const defaultActualFlowForm: ActualFlowForm = {
  price: 0,
  currency: 'won',
  exchangeRate: 1,
  shares: 0,
  title: '',
  content: '',
  tags: [''],
  customTemplate: 0,
  transactionType: 'allocation',
};

const ActualTile = () => {
  const [focusInfo, setFocusInfo] = useAtom(ActualFlowFocusInfoAtom);
  const commonDate = focusInfo?.date ? new Date(focusInfo.date) : undefined;
  const commonDateString = commonDate
    ? `${commonDate.getFullYear()}-${String(commonDate.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(commonDate.getDate()).padStart(2, '0')}`
    : '';
  const commonAssetId = focusInfo?.assetId;
  // const tmpGlobalState: {
  //   date?: Date;
  //   assetId?: number;
  //   transactionType?: 'allocation' | 'withdrawal';
  // } = {
  //   date: undefined,
  //   assetId: undefined,
  //   transactionType: undefined,
  // };
  // const commonDate = tmpGlobalState.date;
  // const commonDateString = 'datestring';
  // const commonAssetId = tmpGlobalState.assetId;

  const { data, isError, isFetching } = useQuery({
    ...queryFactory.combinedByDateAsset(commonDate, commonAssetId),
    enabled: focusInfo ? true : false,
    staleTime: 1000 * 60, //1분
  });

  console.log('focusInfo,data:', !!focusInfo, data);
  const [formPage, setFormPage] = useState(0);
  const maxFormPageIndex = data?.data?.length ? data?.data?.length - 1 : 0;

  const methods = useForm<ActualFlowForm>({
    defaultValues: defaultActualFlowForm,
  });
  // const [actualForm, setActualForm] =
  //   useState<ActualFlowForm>(defaultActualForm);
  const { handleSubmit, reset, watch } = methods;
  const transactionType = watch('transactionType');

  //test
  console.log('fetchdata: ', data);

  useEffect(() => {
    if (formPage > maxFormPageIndex || !data) return;

    console.log('언제 실행되는가');
    const formContents: ActualFlowForm[] = data.data?.map(
      (dataOnTransaction) => ({
        content: dataOnTransaction.linkedMemo.content,
        currency: dataOnTransaction.currency,
        exchangeRate: dataOnTransaction.exchange_rate,
        price: dataOnTransaction.price,
        shares: dataOnTransaction.shares,
        transactionType: dataOnTransaction.transaction_type,
        tags: dataOnTransaction.linkedMemo.tags,
        title: dataOnTransaction.linkedMemo.title,
        customTemplate:
          dataOnTransaction.linkedMemo.custom_template_value ?? undefined,
      })
    ) ?? [defaultActualFlowForm];
    // test
    console.log('리셋에 사용되는 놈: ', formContents[formPage]);

    reset(formContents[formPage]);
  }, [formPage, maxFormPageIndex, data, reset]);

  const transactionTypeLabel = {
    // 언젠가 다른 곳으로 이동시켜야 함. 상수니까.
    allocation: '투입',
    withdrawal: '인출',
  };
  if (isFetching) return <div>로딩중</div>;
  return (
    <>
      <Tile style={{ width: '300px', borderRadius: '16px', padding: '8px' }}>
        <FormProvider {...methods}>
          <CompoundForm
            onSubmit={(e) => {
              e.preventDefault();
              // putTradeData(actualForm);
              // handleSubmit()

              //test
              // console.log(e);
            }}
            className={css({
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <section
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <p>{commonDateString}</p>
                <button>
                  {transactionType ? transactionTypeLabel[transactionType] : ''}
                </button>
              </div>
              <h4>
                {data?.data?.[formPage]?.asset?.name ?? // 일단 임시로 이렇게
                  (commonAssetId || '재산 미선택')}
              </h4>
            </section>

            <DividingLine />

            {/* <section
            className={SectionStyle}
            // style={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   gap: '12px',
            // }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                width: '100%',
              }}
            >
              <Text
                as="h2"
                textContent={'실제 포트폴리오'}
                style={{ fontWeight: 'bold' }}
              />
            </div>
            <div className={FieldDefaultStyle}>
              <CompoundForm.Label
                textContent={'가격'}
                style={{ flexGrow: 0 }}
                // style={{ width: '32px' }}
              />

              <CompoundForm.Input
                // {...register('price')}
                ///
                style={{ flexGrow: 1 }}
                inputMode="numeric"
                value={actualForm.price}
                maxLength={15}
                onChange={(e) => {
                  let result = parseInt(e.target.value);
                  if (Number.isNaN(result)) result = 0;
                  setActualForm((prev) => ({
                    ...prev,
                    price: result,
                  }));
                }}
                placeholder="가격 대충 입력하셈"
              />
              <CompoundSegmentControl style={{ width: '50px' }}>
                <CompoundSegmentControl.Button
                  textContent="$"
                  key={'$'}
                  type="button"
                  style={{
                    background:
                      actualForm.currency === 'dollar' ? 'white' : 'inherit',
                  }}
                  onClick={() =>
                    setActualForm((prev) => ({ ...prev, currency: 'dollar' }))
                  }
                />
                <CompoundSegmentControl.Button
                  textContent="원"
                  key={'원'}
                  type="button"
                  style={{
                    background:
                      actualForm.currency === 'won' ? 'white' : 'inherit',
                  }}
                  onClick={(e) => {
                    setActualForm((prev) => ({ ...prev, currency: 'won' }));
                  }}
                />
              </CompoundSegmentControl>
            </div>
            {actualForm.currency !== 'won' && (
              <div className={FieldDefaultStyle}>
                <CompoundForm.Label textContent={'환율'} />
                <CompoundForm.Input
                  style={{ flexGrow: 1 }}
                  placeholder="원"
                  inputMode="numeric"
                  maxLength={15}
                  value={actualForm.exchangeRate}
                  onChange={(e) => {
                    let result = parseInt(e.target.value);
                    if (Number.isNaN(result)) result = 0;
                    setActualForm((prev) => ({
                      ...prev,
                      exchangeRate: result,
                    }));
                  }}
                  // {...register('exchangeRate')}
                />
              </div>
            )}

            <div className={FieldDefaultStyle}>
              <CompoundForm.Label textContent="수량" />
              <CompoundForm.Input
                style={{ flexGrow: '1' }}
                value={actualForm.shares}
                inputMode="numeric"
                maxLength={15}
                onChange={(e) => {
                  let result = parseInt(e.target.value);
                  if (Number.isNaN(result)) result = 0;
                  setActualForm((prev) => ({
                    ...prev,
                    shares: result,
                  }));
                }}
                // {...register('shares')}
              />
            </div>
            <div
              style={{
                fontSize: '10px',
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <p>{`금액: ${
                actualForm.price *
                actualForm.shares *
                (actualForm.currency === 'won' ? 1 : actualForm.exchangeRate)
              } 원`}</p>
            </div>
          </section> */}
            <ActualPortfolioContents />
            <DividingLine />
            <MemoContents />
            {/* <section className={SectionStyle}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                width: '100%',
              }}
            >
              <Text
                as="h2"
                textContent={'메모'}
                style={{ fontWeight: 'bold' }}
              />
            </div>
            <CompoundForm.Input
              placeholder="제목"
              style={{
                outline: 'none',
                borderBottom: '1px solid gray',
                borderRadius: '0',
              }}
            />

            <CompoundForm.InputArea defaultValue="" placeholder="본문" />
            <CompoundForm.Tags isLoading={false} />
          </section> */}
            <DividingLine />
            <section>
              <CompoundForm.Button
                style={{ width: '100%', height: '32px' }}
                type="submit"
              >
                저장
              </CompoundForm.Button>
            </section>
          </CompoundForm>
        </FormProvider>
        {maxFormPageIndex >= 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <button
              onClick={() => setFormPage((prev) => prev - 1)}
              disabled={formPage === 0}
            >{`<-`}</button>
            <button
              onClick={() => setFormPage((prev) => prev + 1)}
              disabled={formPage === maxFormPageIndex}
            >{`->`}</button>
          </div>
        ) : (
          <div>빈공간</div>
        )}
      </Tile>
    </>
  );
};
export default ActualTile;

const SectionStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

///////////
