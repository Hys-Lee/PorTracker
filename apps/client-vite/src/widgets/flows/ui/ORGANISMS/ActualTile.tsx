import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import { z } from 'zod';
import { css } from '@styled-system/css';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { ActualFlowFocusInfoAtom } from 'src/entities/flows/atoms/actualFlowFocusAtoms';
import { putTradeData } from 'src/shared/ui/MOLECULES/chartDataHandler';

const actualSchema = z.object({
  asset: z.string().nonempty(),
  date:
    // z.string().nonempty()
    z.date(),
  transactionType: z.enum(['allocation', 'withdrawal']),
  price: z.number().positive(),
  currency: z.enum(['dollar', 'won']),
  exchangeRate: z.number().default(1),
  shares: z.number().positive(), // 주식 수량
  title: z.string().nonempty(),
  content: z.string(),
  tags: z.array(z.string()),
  customTemplate: z.number(),
});
type Actual = z.infer<typeof actualSchema>;

const ActualTile = ({
  defaultTransactionType = 'allocation',
}: {
  defaultTransactionType: 'allocation' | 'withdrawal';
}) => {
  const defaultActualForm: Actual = {
    asset: '',
    date: new Date(Date.now()),
    transactionType: 'allocation',
    price: 0,
    currency: 'won',
    exchangeRate: 1,
    shares: 0,
    title: '',
    content: '',
    tags: [],
    customTemplate: 0,
  };

  const [actualForm, setActualForm] = useState<Actual>(defaultActualForm);

  // const [transactionType, setTransactionType] = useState<
  //   'allocation' | 'withdrawal'
  // >(defaultTransactionType);
  // const [gainCurrency, setGainCurrency] = useState<'fifo' | 'average'>(
  //   'average'
  // );
  const focusInfo = useAtomValue(ActualFlowFocusInfoAtom);
  //test
  console.log(
    '타일에서: ',
    focusInfo.date,
    typeof focusInfo.date,
    new Date(focusInfo.date),
    typeof actualForm.date
  );
  useEffect(() => {
    if (!focusInfo) return;
    setActualForm((prev) => ({
      ...prev,
      ...focusInfo,
      date: new Date(focusInfo.date),
    }));
  }, [focusInfo]);

  return (
    <>
      <Tile style={{ borderRadius: '16px', padding: '8px' }}>
        <CompoundForm
          onSubmit={(e) => {
            e.preventDefault();
            putTradeData(actualForm);
            //test
            console.log(e);
          }}
          className={css({
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          <div className={FieldDefaultStyle}>
            <CompoundForm.Date
              value={actualForm.date.toISOString()}
              onChange={(date) => {
                if (date) setActualForm((prev) => ({ ...prev, date }));
              }}
            />
          </div>
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label textContent="자산" />
            <CompoundForm.Select
              onChange={(newValue) =>
                setActualForm((prev) => ({ ...prev, asset: newValue }))
              }
              defaultOptions={[
                { value: 'deafult', label: '기본' },
                { value: 'asdf', label: 'asdf' },
              ]}
              isLoading={false}
              value={[
                {
                  value: actualForm.asset,
                  label: actualForm.asset,
                },
              ]}
            />
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
          <div
            style={{ display: 'flex', justifyContent: 'start', width: '100%' }}
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
          <div
            style={{ display: 'flex', justifyContent: 'start', width: '100%' }}
          >
            <Text as="h2" textContent={'메모'} style={{ fontWeight: 'bold' }} />
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
          <CompoundForm.Button
            style={{ width: '100%', height: '32px' }}
            type="submit"
          >
            저장
          </CompoundForm.Button>
        </CompoundForm>
      </Tile>
    </>
  );
};
export default ActualTile;

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
