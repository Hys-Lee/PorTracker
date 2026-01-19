'use client';

import {
  ComponentProps,
  ReactNode,
  useActionState,
  useEffect,
  useState,
} from 'react';
import * as stylex from '@stylexjs/stylex';
import { inputBase } from '@core/styles/input.stylex';
import Dropdown, {
  DropdownItem,
} from '@core/components/shared/MOLECULES/Dropdown/Dropdown';
import NumericInput from '@core/components/shared/_prototypes/NumericInput/NumericInput';
import DatePicker from '@core/components/shared/MOLECULES/DatePicker/DatePicker';
import { colors } from '../../../../../../tokens/colors.stylex';
import IconSelect from '@core/components/shared/MOLECULES/IconSelect/IconSelect';
import Switch from '@core/components/shared/MOLECULES/Switch/Switch';
import Tips from '@core/components/shared/ATOMS/Tips/Tips';
import { TransactionValue, CurrencyValue } from '@core/types';

// Jotai
import { useHydrateAtoms } from 'jotai/utils';
import { useAtom } from 'jotai';
import {
  copiedFormDataAtom,
  selectedAssetAtom,
} from '@core/stores/portfolios/actualModal';
import { L } from 'node_modules/msw/lib/core/HttpResponse-Cw4ELwIN.mjs';
import { dateFormatter } from '@core/utils/helpers/dateFormatter';
import { PostActualFormRes } from '@core/services';

interface FormAreaProp {
  id: string;
  initData?: {
    assetInfo: ComponentProps<typeof Dropdown>['items'][number];
    date: Date;
    transactionType: TransactionValue;
    price: number;
    currency: { value: CurrencyValue; text: ReactNode };
    exchangeRate: number;
    amount: number;
  };
  transactionTypeInfo: ComponentProps<typeof IconSelect>['items'];
  assetsInfo: ComponentProps<typeof Dropdown>['items'];
  currenciesInfo: ComponentProps<typeof Switch>['items'];
  localCurrencyValue: ComponentProps<typeof Switch>['items'][number]['value'];
  formAction: (
    actionRes: PostActualFormRes,
    formData: FormData
  ) => Promise<PostActualFormRes>;
}
const FormArea = ({
  id,
  initData,
  transactionTypeInfo,
  assetsInfo,
  currenciesInfo,
  localCurrencyValue,
  formAction,
}: FormAreaProp) => {
  // FormData -> copied반영은 currency, asset, memo 빼고 다?
  const [copiedFormData] = useAtom(copiedFormDataAtom);
  const finalInitData = { ...initData, ...copiedFormData };

  // const totalValueRef = useRef<HTMLParagraphElement>(null);
  // const exchangeRateRef = useRef<HTMLDivElement>(null);
  const [numericValues, setNumericValues] = useState({
    price: finalInitData?.price || 0,
    amount: finalInitData?.amount || 0,
    exchangeRate: finalInitData?.exchangeRate || 1,
  });
  const totalValue =
    numericValues.amount * numericValues.price * numericValues.exchangeRate;
  // const [exchangeVisible, setExchangeVisible] = useState(false); // 초기 로직은 외부로 뽑자 그냥
  const [currency, setCurrency] = useState(currenciesInfo[0]);
  const exchangeVisible = currency.value !== localCurrencyValue;

  /** Jotai */

  // Asset
  const defaultAssetInfo = finalInitData?.assetInfo;
  useHydrateAtoms([[selectedAssetAtom, defaultAssetInfo]]);
  const [selectedAsset, setSelectedAsset] = useAtom(selectedAssetAtom);

  const [res, internalFormAction, isPending] = useActionState(formAction, {
    data: null,
    error: { message: '', type: 'VALIDATION_ERROR' },
    success: false,
  } as unknown as PostActualFormRes);

  //test
  // console.log('action res: ', res);
  // console.log('initDate: ', finalInitData?.date);

  return (
    <form
      id={id}
      style={{
        // display: 'flex',
        // flexDirection: 'column',
        // gap: '20px',
        display: 'grid',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
        color: colors.textNormal,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
      action={(formData) => {
        formData.set('currency', currency.value);
        formData.set('price', String(numericValues.price));
        formData.set('amount', String(numericValues.amount));
        formData.set('exchangeRate', String(numericValues.exchangeRate));
        formData.set('assetId', selectedAsset?.value ?? '');

        const dotDate = formData.get('date');
        if (dotDate) {
          const dashDate = dateFormatter(dotDate as string, 'YYYY-MM-DD', '-');
          formData.set('date', new Date(dashDate).toISOString());
        }

        // ***Asset Dropdown 값 덮어쓰기*** -> 비제어용
        // const assetRawData = formData.get('asset');
        // if (assetRawData && typeof assetRawData === 'string') {
        //   const parsedData = JSON.parse(
        //     assetRawData
        //   ) as (typeof assetsInfo)[number];

        //   const assetValue = parsedData.value;
        //   formData.set('asset', assetValue);
        // }
        // formAction(formData);

        internalFormAction(formData);
      }}
    >
      <div
        {...stylex.props(
          // inputWrapperStyles.base,
          inputWrapperStyles.wrapperWithMsg,
          inputWrapperStyles.outer
        )}
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
            name="asset"
            items={assetsInfo || []}
            // form={id}
            multi={false}
            triggerStylex={assetTypeStyles.base}
            icon
            defaultValue={defaultAssetInfo ? [defaultAssetInfo] : undefined}
            value={selectedAsset ? [selectedAsset] : undefined}
            onValueChange={(newAssetInfo) => {
              setSelectedAsset(newAssetInfo[0]); // multi가 아니니까 무조건 1개라
            }}
            // defaultValue={finalInitData ? [finalInitData.assetInfo] : undefined}
          />
        </div>
        <span {...stylex.props(inputWrapperStyles.errorMessage)}>
          {res.error?.details?.assetId?.[0]}
        </span>
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
      <div {...stylex.props(inputWrapperStyles.multi)}>
        <div {...stylex.props(inputWrapperStyles.wrapperWithMsg)}>
          <div
            {...stylex.props(
              inputWrapperStyles.base,
              // stylex.create({ base: { flexGrow: 1 } }).base
              inputWrapperStyles.multiLarge
            )}
          >
            <label {...stylex.props(labelStyles.base)}>날짜</label>
            <DatePicker
              name="date"
              form={id}
              range={false}
              rootStyleX={datePickerStyles.base}
              defaultValue={finalInitData?.date}
            />
          </div>
          <span {...stylex.props(inputWrapperStyles.errorMessage)}>
            {res.error?.details?.date?.[0]}
          </span>
        </div>
        <div {...stylex.props(inputWrapperStyles.wrapperWithMsg)}>
          <div {...stylex.props(inputWrapperStyles.base)}>
            <label {...stylex.props(labelStyles.base)}>거래유형</label>
            <IconSelect
              form={id}
              name="transactionType"
              items={transactionTypeInfo}
              triggerStylex={iconSelectStyles.base}
              defaultValue={finalInitData?.transactionType}
            />
          </div>
          <span {...stylex.props(inputWrapperStyles.errorMessage)}>
            {res.error?.details?.transactionType?.[0]}
          </span>
        </div>
      </div>
      {/* </div> */}
      {/* <div
        {...stylex.props(
          inputWrapperStyles.base,
          stylex.create({ base: { justifyContent: 'end' } }).base
        )}
      > */}
      <div {...stylex.props(inputWrapperStyles.outer)}>
        <div {...stylex.props(inputWrapperStyles.base)}>
          <label {...stylex.props(labelStyles.base)}>메모 연결</label>
          {/* <input
          type="text"
          {...stylex.props(
            inputBase.base,
            inputStyles.base,
            stylex.create({ base: { flexGrow: 1 } }).base
          )}
        /> */}
          <Dropdown
            name="linkedMemo"
            items={[]}
            form={id}
            multi={false}
            triggerStylex={assetTypeStyles.base}
            icon
            defaultValue={undefined}
          />
        </div>
      </div>
      <div {...stylex.props(inputWrapperStyles.wrapperWithMsg)}>
        <div {...stylex.props(inputWrapperStyles.base)}>
          <label {...stylex.props(labelStyles.base)}>가격</label>
          <NumericInput
            {...stylex.props(
              inputBase.base,
              inputStyles.base,
              priceStyles.base
            )}
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
            defaultSelected={finalInitData?.currency}
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
        <span {...stylex.props(inputWrapperStyles.errorMessage)}>
          {`${res.error?.details?.price?.[0] ?? ''} ${
            res.error?.details?.currency?.[0] ?? ''
          }`}
        </span>
      </div>
      <div {...stylex.props(inputWrapperStyles.wrapperWithMsg)}>
        <div
          {...stylex.props(
            inputWrapperStyles.base,
            // stylex.create({ base: { flexGrow: 1, justifyContent: 'start' } }).base
            lineStyles.start
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
            {...stylex.props(
              inputBase.base,
              inputStyles.base,
              amountStyles.base
            )}
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
        <span {...stylex.props(inputWrapperStyles.errorMessage)}>
          {res.error?.details?.amount?.[0]}
        </span>
      </div>
      {/* </div> */}

      <div
        {...stylex.props(
          inputWrapperStyles.base,
          lineStyles.between,
          inputWrapperStyles.outer
        )}
      >
        <div {...stylex.props(inputWrapperStyles.wrapperWithMsg)}>
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
          <span {...stylex.props(inputWrapperStyles.errorMessage)}>
            {res.error?.details?.exchangeRate?.[0]}
          </span>
        </div>
        <div
          {...stylex.props(inputWrapperStyles.base)}
          style={{ height: '40px', justifyContent: 'end' }}
        >
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              maxWidth: '184px',

              // height: '40px',
            }}
            // ref={totalValueRef}
            // >{`총 가치: 0`}</p>
          >{`총 가치: ${totalValue.toLocaleString()} 원`}</p>
        </div>
      </div>
      <div>적당히 이익 칸</div>
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
    width: '100px',
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
    // width: '100px',
    width: '80px',
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
    width: '68px',
    gap: '8px',
    alignItems: 'center',
  },
});
const inputWrapperStyles = stylex.create({
  outer: { display: 'flex', alignItems: 'start' },
  wrapperWithMsg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
  },
  errorMessage: {
    alignSelf: 'end',
    color: colors.loss,
    fontSize: '10px',
  },
  base: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  multi: {
    display: 'flex',
    // alignItems: 'center',
    alignItems: 'start',
    gap: '40px',
  },
  multiLarge: {
    flexGrow: 1,
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

const lineStyles = stylex.create({
  between: {
    justifyContent: 'space-between',
  },
  start: {
    // flexGrow: 1,
    justifyContent: 'start',
  },
  glow: {
    flexGrow: 1,
  },
});
