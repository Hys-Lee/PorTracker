import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { css } from '@styled-system/css';
import ActionButton from 'src/shared/ui/ATOMS/ActionButton';

const actualPortSchema = z.object({
  asset: z.string().nonempty(),
  date:
    // z.string().nonempty()
    z.date(),
  transactionType: z.enum(['allocation', 'withdrawal']),
  price: z.number().positive(),
  currency: z.enum(['dollar', 'won']),
  exchangeRate: z.number().default(1),
  shares: z.number().positive(), // 주식 수량
});
type ActualPort = z.infer<typeof actualPortSchema>;

const ActualPortTile = ({
  defaultTransactionType = 'allocation',
}: {
  defaultTransactionType: 'allocation' | 'withdrawal';
}) => {
  // 얘네들을 일단 controlled로 처리 -> react-hook-form을 통제든 비통제든 씀. 여기에 zod붙이면 더 좋을 듯.
  // mode에 따라 disabled할거 처리
  // vip 전용 기능 처리 각 잡기

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   setValue,
  //   getValues,
  //   formState: { errors },
  // } = useForm<ActualPort>({
  //   resolver: zodResolver(actualPortSchema),
  //   defaultValues: { exchangeRate: 1, price: 0, shares: 0 },
  // });
  const defaultActualForm: ActualPort = {
    asset: '',
    date: new Date(Date.now()),
    transactionType: 'allocation',
    price: 0,
    currency: 'won',
    exchangeRate: 1,
    shares: 0,
  };
  const [actualForm, setActualForm] = useState<ActualPort>(defaultActualForm);

  const [transactionType, setTransactionType] = useState<
    'allocation' | 'withdrawal'
  >(defaultTransactionType);
  const [gainCurrency, setGainCurrency] = useState<'fifo' | 'average'>(
    'average'
  );

  return (
    <>
      <Tile style={{ borderRadius: '16px', padding: '8px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'start', width: '100%' }}
        >
          <Text
            as="h2"
            textContent={'실제 포트폴리오'}
            style={{ fontWeight: 'bold' }}
          />
        </div>
        <CompoundForm
          // onSubmit={handleSubmit((data) => {
          //   console.log('제출: ', data);
          // })}
          className={css({
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label textContent="자산" />
            {/* <Controller
              name="asset"
              control={control}
              render={({ field }) => (
                <CompoundForm.Select
                  {...field}
                  defaultOptions={[{ value: 'deafult', label: '기본' }]}
                  isLoading={false}
                />
              )}
            /> */}
            <CompoundForm.Select
              onChange={(newValue) =>
                setActualForm((prev) => ({ ...prev, asset: newValue }))
              }
              defaultOptions={[
                { value: 'deafult', label: '기본' },
                { value: 'asdf', label: 'asdf' },
              ]}
              isLoading={false}
            />
          </div>
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label textContent="날짜" />
            {/* <Controller
              name="date"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CompoundForm.Date
                  onChange={(date) => {
                    onChange(date);
                  }}
                  selected={value}
                  onBlur={onBlur}
                />
              )}
            /> */}
            <CompoundForm.Date
              // className={css({
              //   border: '2px solid gray',
              //   rounded: 'md',
              // })}
              value={actualForm.date.toISOString()}
              onChange={(date) => {
                if (date) setActualForm((prev) => ({ ...prev, date }));
              }}
            />
            {/* <CompoundForm.Date selected={new Date(Date.now())} /> */}
          </div>
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label textContent={'유형'} />
            <CompoundSegmentControl style={{ flexGrow: '1' }}>
              <CompoundSegmentControl.Button
                textContent="투입"
                key={'투입'}
                type="button"
                style={{
                  background:
                    actualForm.transactionType === 'allocation'
                      ? 'white'
                      : 'inherit',
                }}
                onClick={() =>
                  setActualForm((prev) => ({
                    ...prev,
                    transactionType: 'allocation',
                  }))
                }
              />
              <CompoundSegmentControl.Button
                textContent="인출"
                key={'인출'}
                type="button"
                style={{
                  background:
                    actualForm.transactionType === 'withdrawal'
                      ? 'white'
                      : 'inherit',
                }}
                onClick={(e) => {
                  setActualForm((prev) => ({
                    ...prev,
                    transactionType: 'withdrawal',
                  }));
                }}
              />
            </CompoundSegmentControl>
          </div>
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label
              textContent={'가격'}
              style={{ width: '24px', flexGrow: 0 }}
              // style={{ width: '32px' }}
            />
            {/* <div
              style={{
                flexGrow: 1,
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}
            > */}
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
            {/* </div> */}
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
          {actualForm.transactionType === 'withdrawal' &&
            true /* 그리고 vip에게만. readonly임. */ && (
              <div className={FieldDefaultStyle}>
                <CompoundForm.Label textContent="매도 이익" />
                <div>
                  <CompoundSegmentControl>
                    <CompoundSegmentControl.Button
                      type="button"
                      textContent="선입선출"
                      key="선입선출"
                      onClick={(e) => {
                        setGainCurrency('fifo');
                      }}
                    />

                    <CompoundSegmentControl.Button
                      type="button"
                      textContent="이동평균"
                      key="이동평균"
                      onClick={(e) => {
                        setGainCurrency('average');
                      }}
                    />
                  </CompoundSegmentControl>
                  {/* <CompoundForm.Input value={'1000원'} disabled /> */}
                  <Text as="p" textContent="1000" />
                </div>
              </div>
            )}
          <CompoundForm.Button style={{ width: '100%', height: '32px' }}>
            저장
          </CompoundForm.Button>
        </CompoundForm>
      </Tile>
    </>
  );
};
export default ActualPortTile;

const FieldDefaultStyle = css({
  // width: '100%',
  '& .react-datepicker-wrapper': {
    display: 'flex !important ',
    flexGrow: 1,
    '& > div': {
      display: 'flex !important ',
      flexGrow: 1,
    },
  },
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  alignItems: 'center',
});
