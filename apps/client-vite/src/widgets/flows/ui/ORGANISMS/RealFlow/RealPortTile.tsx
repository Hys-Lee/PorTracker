import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/MOLECULES/Tile';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const realPortSchema = z.object({
  asset: z.string().nonempty(),
  date:
    // z.string().nonempty()
    z.date(),
  price: z.number().positive(),
  currency: z.string().nonempty(),
  exchangeRate: z.number().optional(),
  shares: z.number().positive(), // 주식 수량
});
type RealPort = z.infer<typeof realPortSchema>;

const RealPortTile = ({
  defaultType = 'allocation',
}: {
  defaultType: 'allocation' | 'withdrawal';
}) => {
  // 얘네들을 일단 controlled로 처리 -> react-hook-form을 통제든 비통제든 씀. 여기에 zod붙이면 더 좋을 듯.
  // mode에 따라 disabled할거 처리
  // vip 전용 기능 처리 각 잡기

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RealPort>({
    resolver: zodResolver(realPortSchema),
    defaultValues: {},
  });
  const [type, setType] = useState<'allocation' | 'withdrawal'>(defaultType);
  const [currency, setCurrency] = useState<'won' | 'dollar'>('won');
  const [gainCurrency, setGainCurrency] = useState<'won' | 'dollar'>('won');

  setValue('currency', currency);
  // 이 안에서 데이터 가져와야 할 듯. id같은것만 뭐 상태관리든 props든으로 가져와서
  return (
    <>
      <Tile>
        <Text as="h2" textContent={'실제 포트폴리오'} />
        <CompoundForm
          onSubmit={handleSubmit((data) => {
            console.log('제출: ', data);
          })}
        >
          <div>
            <CompoundForm.Label textContent="자산" />
            <Controller
              name="asset"
              control={control}
              render={({ field }) => (
                <CompoundForm.Select
                  {...field}
                  defaultOptions={[{ value: 'deafult', label: '기본' }]}
                  isLoading={false}
                />
              )}
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
            <CompoundForm.Label
              textContent={type === 'allocation' ? '투입' : '인출'}
            />
            <CompoundSegmentControl>
              <CompoundSegmentControl.Button
                textContent="$"
                key={'$'}
                type="button"
                onClick={() => setCurrency('dollar')}
              />
              <CompoundSegmentControl.Button
                textContent="원"
                key={'원'}
                type="button"
                onClick={(e) => {
                  setCurrency('won');
                }}
              />
            </CompoundSegmentControl>
          </div>
          <div>
            <CompoundForm.Label textContent={'가격'} />
            <div>
              <CompoundForm.Input
                {...register('price')}
                placeholder="가격 대충 입력하셈"
              />
              <CompoundSegmentControl>
                <CompoundSegmentControl.Button
                  textContent="$"
                  key={'$'}
                  type="button"
                  onClick={() => setCurrency('dollar')}
                />
                <CompoundSegmentControl.Button
                  textContent="원"
                  key={'원'}
                  type="button"
                  onClick={(e) => {
                    setCurrency('won');
                  }}
                />
              </CompoundSegmentControl>
            </div>
          </div>
          {currency !== 'won' && (
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
          {type === 'withdrawal' &&
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
          <CompoundForm.Button>저장</CompoundForm.Button>
        </CompoundForm>
      </Tile>
    </>
  );
};
export default RealPortTile;
