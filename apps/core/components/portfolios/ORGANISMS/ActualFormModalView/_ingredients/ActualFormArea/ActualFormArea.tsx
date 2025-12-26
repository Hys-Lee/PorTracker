'use client';

import { ComponentProps, ReactNode, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { inputBase } from '@core/styles/input.stylex';
import Dropdown from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import NumericInput from '@core/components/shared/_prototypes/NumericInput/NumericInput';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import { colors } from '../../../../../../tokens/colors.stylex';
import IconSelect from '@core/components/shared/MOLECULES/IconSelect/IconSelect';
import Switch from '@core/components/shared/MOLECULES/Switch/Switch';
import Tips from '@core/components/shared/ATOMS/Tips/Tips';
import { TransactionValue, CurrencyValue } from '@core/types';

interface FormAreaProp {
  initData?: {
    assetInfo: ComponentProps<typeof Dropdown>['items'];
    date: Date;
    transactionType: TransactionValue;
    price: number;
    currency: { value: CurrencyValue; text: ReactNode };
    exchangeRate: number;
    amount: number;
  };
  assetsInfo: ComponentProps<typeof Dropdown>['items'];
  currenciesInfo: ComponentProps<typeof Switch>['items'];
  localCurrencyValue: ComponentProps<typeof Switch>['items'][number]['value'];
  formAction: (formData: FormData) => void;
}
const FormArea = ({
  initData,
  assetsInfo,
  currenciesInfo,
  localCurrencyValue,
  formAction,
}: FormAreaProp) => {
  // const totalValueRef = useRef<HTMLParagraphElement>(null);
  // const exchangeRateRef = useRef<HTMLDivElement>(null);
  const [numericValues, setNumericValues] = useState({
    price: initData?.price || 0,
    amount: initData?.amount || 0,
    exchangeRate: initData?.exchangeRate || 1,
  });
  const totalValue =
    numericValues.amount * numericValues.price * numericValues.exchangeRate;
  // const [exchangeVisible, setExchangeVisible] = useState(false); // 초기 로직은 외부로 뽑자 그냥
  const [currency, setCurrency] = useState(currenciesInfo[0]);
  const exchangeVisible = currency.value !== localCurrencyValue;

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        color: colors.textNormal,
        width: '100%',
      }}
      action={(formData) => {
        formData.set('currency', currency.value);
        formData.set('price', String(numericValues.price));
        formData.set('amount', String(numericValues.amount));
        formData.set('exchangeRate', String(numericValues.exchangeRate));
        formAction(formData);
      }}
      // onInput={(e) => {
      //   const form = e.currentTarget;

      //   const price =
      //     Number(
      //       (form.elements.namedItem('price') as HTMLInputElement)?.value
      //     ) || 0;
      //   const amount =
      //     Number(
      //       (form.elements.namedItem('amount') as HTMLInputElement)?.value
      //     ) || 0;
      //   const exchangeRate =
      //     Number(
      //       (form.elements.namedItem('exchangeRate') as HTMLInputElement)?.value
      //     ) || 1;

      //   const totalValueElement = totalValueRef.current;
      //   if (totalValueElement) {
      //     totalValueElement.innerText = `총 가치: ${(
      //       price *
      //       amount *
      //       exchangeRate
      //     ).toLocaleString()}`;
      //   }

      //   // 환율 영역 visibility

      //   const currency = (
      //     form.elements.namedItem('currency') as HTMLInputElement
      //   ).value as CurrencyValue;
      //   const defaultCurrency = (
      //     form.elements.namedItem('currency') as HTMLInputElement
      //   ).dataset.default;

      //   if (exchangeRateRef.current) {
      //     exchangeRateRef.current.style.visibility =
      //       currency === defaultCurrency ? 'hidden' : 'visible';
      //   }
      // }}
    >
      <div {...stylex.props(inputWrapperStyles.base)}>
        <label {...stylex.props(labelStyles.base)}>자산</label>
        {/* <input
          type="text"
          {...stylex.props(
            inputBase.base,
            inputStyles.base,
            stylex.create({ base: { flexGrow: 1 } }).base
          )}
        /> */}
        <Dropdown
          items={assetsInfo || []}
          form=""
          multi={false}
          triggerStylex={assetTypeStyles.base}
          icon
          defaultValue={initData ? initData.assetInfo : undefined}
        />
      </div>
      {/* <div
        {...stylex.props(
          inputWrapperStyles.base,
          stylex.create({
            base: {
              display: 'flex',
              justifyContent: 'space-between',
              gap: '28px',
            },
          }).base
        )}
      > */}
      <div
        {...stylex.props(
          inputWrapperStyles.base,
          stylex.create({ base: { flexGrow: 1 } }).base
        )}
      >
        <label {...stylex.props(labelStyles.base)}>날짜</label>
        <DatePicker
          range={false}
          rootStyleX={datePickerStyles.base}
          defaultValue={initData?.date}
        />
      </div>
      <div {...stylex.props(inputWrapperStyles.base)}>
        <label {...stylex.props(labelStyles.base)}>거래유형</label>
        <IconSelect
          items={[]}
          triggerStylex={iconSelectStyles.base}
          defaultValue={initData?.transactionType}
        />
      </div>
      {/* </div> */}
      {/* <div
        {...stylex.props(
          inputWrapperStyles.base,
          stylex.create({ base: { justifyContent: 'end' } }).base
        )}
      > */}
      <div {...stylex.props(inputWrapperStyles.base)}>
        <label {...stylex.props(labelStyles.base)}>가격</label>
        <NumericInput
          {...stylex.props(inputBase.base, inputStyles.base, priceStyles.base)}
          name="price"
          value={numericValues.price.toLocaleString()}
          onChange={(e) => {
            setNumericValues((prev) => ({
              ...prev,
              price: Number(e.target.value),
            }));
          }}
        />
        <Switch
          name="currency"
          items={currenciesInfo}
          defaultSelected={initData?.currency}
          onChange={(selected) => {
            setCurrency(selected);
            if (!exchangeVisible)
              setNumericValues((prev) => ({ ...prev, exchangeRate: 1 }));
            //   const isVisible = selected.value === exchangeVisibleTarget;
            //   setExchangeVisible(isVisible);
            //   if (!isVisible)
            //     setNumericValues((prev) => ({ ...prev, exchangeRate: 1 }));
          }}
        />
      </div>
      <div
        {...stylex.props(
          inputWrapperStyles.base,
          stylex.create({ base: { flexGrow: 1, justifyContent: 'start' } }).base
        )}
      >
        <label
          {...stylex.props(
            labelStyles.base
            // stylex.create({ base: { width: '40px' } }).base
          )}
        >
          수량
        </label>
        <NumericInput
          {...stylex.props(inputBase.base, inputStyles.base, amountStyles.base)}
          name="amount"
          value={numericValues.amount.toLocaleString()}
          onChange={(e) => {
            setNumericValues((prev) => ({
              ...prev,
              amount: Number(e.target.value),
            }));
          }}
        />
      </div>
      {/* </div> */}
      <div
        {...stylex.props(
          inputWrapperStyles.base,
          stylex.create({
            base: {
              justifyContent: 'space-between',
              // height: 'auto',
            },
          }).base
        )}
      >
        <div
          // ref={exchangeRateRef}
          {...stylex.props(
            inputWrapperStyles.base,
            exchangeWrapperStyles[exchangeVisible ? 'visible' : 'hidden']
          )}
        >
          <label {...stylex.props(labelStyles.base)}>
            환율
            <Tips
              content={
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h4>{'Dollar Based'}</h4>
                  <p>{'정수만 사용됩니다'}</p>
                </div>
              }
            />
          </label>
          <NumericInput
            value={numericValues.exchangeRate.toLocaleString()}
            onChange={(e) =>
              setNumericValues((prev) => ({
                ...prev,
                exchangeRate: Number(e.target.value),
              }))
            }
            {...stylex.props(
              inputBase.base,
              inputStyles.base,
              exchangeRateStyles.base
            )}
            name="exchangeRate"
          />
        </div>
        <div {...stylex.props(inputWrapperStyles.base)}>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px',
              margin: 0,
            }}
            // ref={totalValueRef}
            // >{`총 가치: 0`}</p>
          >{`총 가치: ${totalValue.toLocaleString()} 원`}</p>
        </div>
      </div>
    </form>
  );
};
export default FormArea;

const inputStyles = stylex.create({
  base: {
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 1px ${colors.primary}`,
      ':hover': `0 0 0 1px ${colors.primary}`,
    },
    height: '40px',
    fontWeight: '500',
    lineHeight: 1,
    width: '200px',
  },
});
const priceStyles = stylex.create({
  base: {
    // width: '100px',
    flexGrow: 1,
  },
});
const exchangeRateStyles = stylex.create({
  base: {
    // width: '60px',
  },
});

const exchangeWrapperStyles = stylex.create({
  hidden: {
    visibility: 'hidden',
  },
  visible: {
    visibility: 'visible',
  },
});

const amountStyles = stylex.create({
  base: {
    // width: '40px',
    // flexGrow: 1,
    // width: '50px',
    // minWidth: '40px',
    flexGrow: 1,
  },
});

const labelStyles = stylex.create({
  base: {
    display: 'flex',
    width: '60px',
    gap: '8px',
    alignItems: 'center',
  },
});
const inputWrapperStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
});

const assetTypeStyles = stylex.create({
  base: {
    // color: 'white',
    position: 'relative',
    width: 'auto',
    flexGrow: 1,
    backgroundColor: colors.bgNormal,
    boxShadow: {
      default: 'none',
      ':focus': `0 0 0 1px ${colors.primary}`,
      ':hover': `0 0 0 1px ${colors.primary}`,
    },
    display: 'flex',
    justifyContent: 'start',
    height: '44px',

    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
});

const datePickerStyles = stylex.create({
  base: {
    height: '40px',
    // width: '160px',
    flexGrow: 1,
    boxShadow: {
      default: `0 0 0 1px rgb(from ${colors.primary} r g b / 0) !important`,
      ':focus': `0 0 0 2px ${colors.primary} !important`,
      ':hover': `0 0 0 1px ${colors.primary} !important`,
    },
  },
});

const iconSelectStyles = stylex.create({
  base: {
    width: '40px',
    height: '40px',
    boxShadow: {
      default: `0 0 0 1px rgb(from ${colors.primary} r g b / 0) `,
      ':focus': `0 0 0 2px ${colors.primary} `,
      ':hover': `0 0 0 1px ${colors.primary} `,
    },
  },
});
