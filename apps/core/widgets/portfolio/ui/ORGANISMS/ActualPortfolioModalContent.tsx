import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Text from 'src/shared/ui/ATOMS/Text';
import { useEffect, useState } from 'react';
import ActualPortfolioModalSubContent from './ActualPortfolioModalSubContent';
import getActual from 'src/features/tmpFuncs/getActualPort';
import {
  relatedActualAtom,
  relatedAtomField,
  relatedActualAtomKeys,
} from 'src/entities/tmpAtoms/relatedActualAtom';
import { useAtomValue } from 'jotai';

const actualPortfolioSchema = z.object({
  asset: z.string().nonempty(),
  date: z.date(),
  transactionType: z.enum(['allocation', 'withdrawal']).optional(),
  price: z.number(),
  currency: z.enum(['won', 'dollar']),
  exchangeRate: z.number().default(1),
  shares: z.number().positive(),
  profitType: z.enum(['fifo', 'average']),
});
type ActualPortfolioField = z.infer<typeof actualPortfolioSchema>;

const ActualPortfolioModalContent = ({ id }: { id?: number }) => {
  // 데이터 fetch하기 모달 id가 있다면 default값을 가져오고, 아니면 빈거로.
  const actuaPort = getActual();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ActualPortfolioField>({
    resolver: zodResolver(actualPortfolioSchema),
    defaultValues: actuaPort,
  });
  const changingFormContent = useAtomValue(relatedActualAtom);
  useEffect(() => {
    type asdf = keyof typeof changingFormContent;
    const aaa: [asdf, any][] = Object.entries(changingFormContent).map(
      ([key, value]) => [key as asdf, value]
    );
    aaa.forEach(([key, value]) => setValue(key as asdf, value));
  }, [changingFormContent]);
  const [gainCurrency, setGainCurrency] = useState('won');
  return (
    <>
      <div>
        <h3>실제 포트폴리오</h3>
        <CompoundForm>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <div>
                <CompoundForm.Label textContent="자산" />
                <CompoundForm.Input
                  placeholder="자산입력좀"
                  {...register('asset')}
                />
              </div>
              <div>
                <CompoundForm.Label textContent="날짜" />
                <Controller
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
                />

                {/* <CompoundForm.Date selected={new Date(Date.now())} /> */}
              </div>
              <div>
                <CompoundForm.Label textContent="유형" />
                <CompoundSegmentControl>
                  <CompoundSegmentControl.Button
                    textContent="투입"
                    key={'투입'}
                    type="button"
                  />
                  <CompoundSegmentControl.Button
                    textContent="인출"
                    key={'인출'}
                    type="button"
                  />
                </CompoundSegmentControl>
              </div>
              <div>
                <CompoundForm.Label textContent="가격" />
                <CompoundForm.Input
                  placeholder="가격입력좀"
                  {...register('price')}
                />
                <CompoundSegmentControl>
                  <CompoundSegmentControl.Button
                    textContent="원"
                    key={'원'}
                    type="button"
                  />
                  <CompoundSegmentControl.Button
                    textContent="$"
                    key={'$'}
                    type="button"
                  />
                </CompoundSegmentControl>
              </div>

              {/******* */}
              {getValues('currency') !== 'won' && (
                <div>
                  <CompoundForm.Label textContent={'환율'} />
                  <div>
                    <CompoundForm.Input
                      placeholder="원"
                      {...register('exchangeRate')}
                    />
                  </div>
                </div>
              )}

              <div>
                <CompoundForm.Label textContent="수량" />
                <CompoundForm.Input type="number" {...register('shares')} />
              </div>
              <div>
                <p>{`금액: ${
                  getValues('price') *
                  getValues('shares') *
                  getValues('exchangeRate') // 환율 없으면 1임
                }`}</p>
              </div>
              {getValues('transactionType') === 'withdrawal' &&
                true /* 그리고 vip에게만. readonly임. */ && (
                  <div>
                    <CompoundForm.Label textContent="매도 이익" />
                    <div>
                      <CompoundSegmentControl>
                        <CompoundSegmentControl.Button
                          type="button"
                          textContent="$"
                          key="$"
                          onClick={(e) => {
                            setGainCurrency('dollar');
                          }}
                        />

                        <CompoundSegmentControl.Button
                          type="button"
                          textContent="원"
                          key="원"
                          onClick={(e) => {
                            setGainCurrency('won');
                          }}
                        />
                      </CompoundSegmentControl>
                      {/* <CompoundForm.Input value={'1000원'} disabled /> */}
                      <Text as="p" textContent="1000" />
                    </div>
                  </div>
                )}
            </div>
            <div>
              <ActualPortfolioModalSubContent />
            </div>
          </div>
          <CompoundForm.Button style={{ width: '100%' }}>
            저장
          </CompoundForm.Button>
        </CompoundForm>
      </div>
    </>
  );
};
export default ActualPortfolioModalContent;
