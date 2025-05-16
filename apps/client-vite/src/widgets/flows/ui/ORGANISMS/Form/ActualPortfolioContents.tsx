import Text from 'src/shared/ui/ATOMS/Text';
import CompoundForm from 'src/shared/ui/MOLECULES/CompoundForm/CompoundForm';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import Tile from 'src/shared/ui/ATOMS/Tile';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { css } from '@styled-system/css';
import ActionButton from 'src/shared/ui/ATOMS/ActionButton';
import { actualPortfolioMinSchema } from 'src/shared/forms/actualPortfolioSchema';
import {
  FieldDefaultStyle,
  FormContentsDefaultStyle,
  FormControlDefaultStyle,
  LabelDefaultStyle,
} from './commonStyles';

const validateDecimal = (inputString: string) => {
  const validReg = /^\d*\.?\d*$/;
  const result = validReg.test(inputString);
  return result;
};

const ActualPortfolioContents = () => {
  // const [actualForm, setActualForm] = useState<ActualPort>(defaultActualForm);
  const { control, watch } = useFormContext();
  const currency = watch('currency');
  const price = watch('price');
  const shares = watch('shares');
  const exchangeRate = watch('exchangeRate');
  return (
    <>
      <section style={{ borderRadius: '16px', padding: '8px' }}>
        <div
          style={{ display: 'flex', justifyContent: 'start', width: '100%' }}
        >
          <Text
            as="h2"
            textContent={'실제 포트폴리오'}
            style={{ fontWeight: 'bold' }}
          />
        </div>
        <div className={FormContentsDefaultStyle}>
          <div className={FieldDefaultStyle}>
            <CompoundForm.Label
              textContent={'가격'}
              className={LabelDefaultStyle}
            />
            <div
              className={`${FormControlDefaultStyle} ${css({
                display: 'flex',
                gap: '12px',
              })}`}
            >
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <CompoundForm.Input
                    className={FormControlDefaultStyle}
                    inputMode="numeric"
                    value={value}
                    maxLength={15}
                    onChange={(e) => {
                      const inputString = e.target.value;
                      const result = validateDecimal(inputString);

                      if (!result) return;
                      onChange(inputString);
                    }}
                    placeholder="가격 대충 입력하셈"
                  />
                )}
              />
              <Controller
                control={control}
                name="currency"
                render={({ field: { value, onChange } }) => (
                  <CompoundSegmentControl
                    style={{ width: '50px', flexShrink: 0 }}
                  >
                    <CompoundSegmentControl.Button
                      textContent="$"
                      key={'$'}
                      type="button"
                      activated={value === 'dollar'}
                      onClick={() => onChange('dollar')}
                    />
                    <CompoundSegmentControl.Button
                      textContent="원"
                      key={'원'}
                      type="button"
                      activated={value === 'won'}
                      onClick={() => {
                        onChange('won');
                      }}
                    />
                  </CompoundSegmentControl>
                )}
              />
            </div>
          </div>
          {currency !== 'won' && (
            <div className={FieldDefaultStyle}>
              <CompoundForm.Label
                className={LabelDefaultStyle}
                textContent={'환율'}
              />
              <Controller
                name="exchangeRate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CompoundForm.Input
                    className={FormControlDefaultStyle}
                    placeholder="원"
                    inputMode="numeric"
                    maxLength={15}
                    value={value}
                    onChange={(e) => {
                      const inputString = e.target.value;
                      const result = validateDecimal(inputString);

                      if (!result) return;

                      onChange(inputString);
                    }}
                    // {...register('exchangeRate')}
                  />
                )}
              />
            </div>
          )}

          <div className={FieldDefaultStyle}>
            <CompoundForm.Label
              className={LabelDefaultStyle}
              textContent="수량"
            />
            <Controller
              name="shares"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CompoundForm.Input
                  className={FormControlDefaultStyle}
                  value={value}
                  inputMode="numeric"
                  maxLength={15}
                  onChange={(e) => {
                    const inputString = e.target.value;
                    const result = validateDecimal(inputString);

                    if (!result) return;

                    onChange(inputString);
                  }}
                  // {...register('shares')}
                />
              )}
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
              price * shares * (currency === 'won' ? 1 : exchangeRate)
            } 원`}</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default ActualPortfolioContents;
