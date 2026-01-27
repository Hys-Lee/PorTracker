'use client';

import Separator from '@core/components/shared/ATOMS/Separator/Separator';
import {
  CURRENCY_MAP,
  MEMO_TYPE_VALUES,
  TRANSACTION_MAP,
} from '@core/constants';
import { colors } from '../../../../../../tokens/colors.stylex';
import { CurrencyValue, MemoTypeValue, TransactionValue } from '@core/types';
import { dateFormatter } from '@core/utils/helpers/dateFormatter';
import * as stylex from '@stylexjs/stylex';
import { ScrollArea } from 'radix-ui';
import { scrollBarStyles } from '@core/styles/scroll.stylex';
import { targetChangeIconSelector } from '@core/utils/renderers/iconSelector';

import type {
  PortfolioReferenceData,
  // TargetPortfolio,
  // TargetReferenceProps,
} from '@core/types/memos/referenceData';
import { useAtom } from 'jotai';
import { linkedPortfolioInfoAtom } from '@core/stores/memos/memoModal';
import { calcDiffValFromRatio } from '@core/utils/helpers/calcDiffValFromRatio';
import { ActualPortfolioDetail } from '@core/schemas/features/memos/memos.schema';

// type PortfolioReferenceInit =
//   | (ActualReferenceProps & { type: Extract<MemoTypeValue, 'actual'> })
//   | (TargetReferenceProps & { type: Extract<MemoTypeValue, 'target'> })
//   | { type: Extract<MemoTypeValue, 'event'> };

interface PortfolioReferenceProps {
  init?: PortfolioReferenceData;
}

const PortfolioReference = ({ init }: PortfolioReferenceProps) => {
  const [lilnkedPortfolioInfo] = useAtom(linkedPortfolioInfoAtom);

  const finalData = lilnkedPortfolioInfo ?? init;

  //test
  // console.log('init, finalDta: ', init, finalData);

  return (
    <>
      {finalData?.portfolioType === 'actual' ? (
        <AcutalReference {...finalData} />
      ) : finalData?.portfolioType === 'target' ? (
        <TargetReference targetsInfo={finalData.assetsList} />
      ) : (
        <NoReference />
      )}
    </>
  );
};

export default PortfolioReference;

const NoReference = () => {
  return (
    <>
      <div {...stylex.props(noReferenceStyles.wrapper)}>
        <span {...stylex.props(noReferenceStyles.text)}>
          연결된 포트폴리오가 없습니다
        </span>
      </div>
    </>
  );
};

const noReferenceStyles = stylex.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  text: {
    color: colors.textWeek,
    // fontSize: '20px',
  },
});

// type RawActualData = {
//   assetName: string;
//   assetType: string;
//   date: Date;
//   transactionType: TransactionValue;
//   price: number;
//   amount: number;
//   currency: CurrencyValue;
//   exchangeRate: number;
// };

// interface ActualReferenceProps extends RawActualData {
//   //   assetName: string;
//   //   assetType: string;
//   //   date: Date;
//   //   transactionType: TransactionValue;
//   //   price: number;
//   //   amount: number;
//   //   currency: CurrencyValue;
//   //   exchangeRate: number;
//   // 후처리 데이터
//   assetChangeInfo: { value: number; ratioBps: number }; // base points (bps) : 0.01%  = 1bps
//   portfolioWeightInfo: { value: number; ratioBps: number }; // base points (bps) : 0.01%  = 1bps
// }
// const AcutalReference = (props: ActualReferenceProps) => {

const AcutalReference = (props: ActualPortfolioDetail) => {
  const {
    accumulatedRatio,
    accumulatedValue,
    value: changeValue,
    changesRatio,
    ...rawData
  } = props;
  const priceString = `${rawData.price} ${CURRENCY_MAP[rawData.currency]}`;
  return (
    <>
      <div {...stylex.props(actualReferenceStyles.wrapper)}>
        <h4 {...stylex.props(actualReferenceStyles.title)}>
          {'Actual Details'}
        </h4>
        <section {...stylex.props(actualReferenceStyles.upperSection)}>
          {actualDetailInfo.map((info) => {
            const value =
              // info.type === 'totalValue'
              //   ? totalValue
              //   :
              info.type === 'price'
                ? priceString
                : info.transformer?.(rawData[info.type]) ?? rawData[info.type];
            return (
              <div {...stylex.props(actualReferenceStyles.elementArea)}>
                <span {...stylex.props(actualReferenceStyles.label)}>
                  {info.label}
                </span>
                <span {...stylex.props(actualReferenceStyles.value)}>{`${
                  typeof value === 'number' ? value.toLocaleString() : value
                }`}</span>
              </div>
            );
          })}
        </section>
        <Separator color="normal" />
        <section {...stylex.props(actualReferenceStyles.lowerSection)}>
          <div {...stylex.props(actualReferenceStyles.elementBox)}>
            <span {...stylex.props(actualReferenceStyles.label)}>
              {'Asset Change'}
            </span>
            <div {...stylex.props(actualReferenceStyles.elementBoxContent)}>
              <span
                {...stylex.props(
                  actualReferenceStyles[changesRatio >= 0 ? 'profit' : 'loss'],
                  actualReferenceStyles.boxMainText
                )}
              >{`${
                changesRatio >= 0 && '+'
              }${changeValue.toLocaleString()}`}</span>
              <span
                {...stylex.props(
                  actualReferenceStyles[changesRatio >= 0 ? 'profit' : 'loss'],
                  actualReferenceStyles.boxSubText
                )}
              >{`(${changesRatio >= 0 && '+'}${changesRatio / 100}%)`}</span>
            </div>
          </div>
          <div {...stylex.props(actualReferenceStyles.elementBox)}>
            <span {...stylex.props(actualReferenceStyles.label)}>
              {'Portfolio Weight'}
            </span>
            <div {...stylex.props(actualReferenceStyles.elementBoxContent)}>
              <span
                {...stylex.props(
                  actualReferenceStyles.boxMainText,
                  actualReferenceStyles.textStong
                )}
              >{`${accumulatedValue.toLocaleString()}`}</span>
              <span
                {...stylex.props(
                  actualReferenceStyles.textStong,
                  actualReferenceStyles.boxSubText
                )}
              >{`(${accumulatedRatio / 100}%)`}</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const actualReferenceStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.textWeek,
    margin: 0,
  },
  upperSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    gap: '20px',
  },
  elementArea: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '4px',
  },
  label: {
    color: colors.textWeek,
  },
  textStong: { color: colors.textStrong },
  value: {
    color: colors.textNormal,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  //
  lowerSection: {
    // display:'grid',
    // gridTemplateColumns:'1fr 1fr',
    // gridTemplateRows:'1fr 1fr',
    // gridColumnGap:''
    display: 'flex',
    gap: '12px',
    // flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  elementBox: {
    display: 'flex',
    // justifyContent: 'space-between',
    boxShadow: `0 0 0 1px ${colors.bgStrong}`,
    borderRadius: '8px',
    height: '80px',
    flexDirection: 'column',
    gap: '20px',
    // justifyContent: 'space-between',
    flexGrow: 1,
    minWidth: 0,
    // width: '100%',
    // width: '90%',
    padding: '12px',
  },
  elementBoxContent: {
    display: 'flex',
    flexDirection: 'column',
    // gap: '8px',
    alignItems: 'baseline',
  },
  loss: { color: colors.loss },
  profit: { color: colors.profit },
  boxMainText: {
    fontSize: '20px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  boxSubText: {
    fontSize: '12px',
  },
});

const actualDetailInfo: {
  // type: keyof RawActualData | 'totalValue';
  type: keyof Omit<
    ActualPortfolioDetail,
    'changesRatio' | 'value' | 'accumulatedValue' | 'accumulatedRatio'
  >;
  label: string;
  transformer?: (params?: any) => string | number;
}[] = [
  { type: 'assetName', label: '자산' },
  { type: 'assetType', label: '분류' },
  {
    type: 'date',
    label: '날짜',
    transformer: (data: Date) => {
      return dateFormatter(data, 'YYYY.MM.DD', '.');
    },
  },
  {
    type: 'transactionType',
    label: '거래유형',
    transformer: (data: TransactionValue) => {
      return TRANSACTION_MAP[data];
    },
  },
  {
    type: 'price',
    label: '가격',
  },
  { type: 'amount', label: '수량' },
  { type: 'exchangeRate', label: '환율' },
];

interface TargetReferenceProps {
  targetsInfo: {
    assetName: string;
    assetType: string;
    currentRatioBps: number;
    ratioDeltaBps: number;
  }[];
}

const TargetReference = ({ targetsInfo }: TargetReferenceProps) => {
  const targetsInfoDetail = targetsInfo.map((data) => {
    const prevRatio = data.currentRatioBps - data.ratioDeltaBps;
    const changeType: TargetChangeType =
      data.currentRatioBps === 0
        ? 'delete'
        : prevRatio === 0
        ? 'add'
        : 'normal';
    return { ...data, changeType };
  });

  const changeTypeInfo = targetsInfoDetail.reduce(
    (acc, cur) => {
      return { ...acc, [cur.changeType]: (acc[cur.changeType] += 1) };
    },
    { add: 0, delete: 0, normal: 0 } as {
      [changeType in TargetChangeType]: number;
    }
  );

  return (
    <>
      <div {...stylex.props(targetReferenceStyles.wrapper)}>
        <h4 {...stylex.props(targetReferenceStyles.title)}>
          {'Target Details'}
        </h4>
        <ScrollArea.Root {...stylex.props(targetReferenceStyles.detailArea)}>
          <ScrollArea.Viewport>
            <section {...stylex.props(targetReferenceStyles.detailList)}>
              {targetsInfoDetail.map((data) => {
                return <TargetInfoBox {...data} />;
              })}
            </section>
          </ScrollArea.Viewport>
          <ScrollArea.ScrollAreaScrollbar
            {...stylex.props(scrollBarStyles.verticalBox)}
          >
            <ScrollArea.Thumb
              {...stylex.props(scrollBarStyles.verticalThumb)}
            />
          </ScrollArea.ScrollAreaScrollbar>
        </ScrollArea.Root>
        <Separator color="normal" />
        <section {...stylex.props(targetReferenceStyles.summaryArea)}>
          <h5 {...stylex.props(targetReferenceStyles.summaryTitle)}>Summary</h5>
          <div {...stylex.props(targetReferenceStyles.summaryItemArea)}>
            <div {...stylex.props(targetReferenceStyles.summaryItem)}>
              {targetChangeIconSelector(
                'normal',
                28,
                28,
                targetReferenceStyles.summaryIcon
              )}
              <span {...stylex.props(targetReferenceStyles.summaryTextStrong)}>
                {'Inherited'}
              </span>
              <span {...stylex.props(targetReferenceStyles.summaryText)}>
                {changeTypeInfo.normal}
              </span>
            </div>
            <div {...stylex.props(targetReferenceStyles.summaryItem)}>
              {targetChangeIconSelector(
                'add',
                28,
                28,
                targetReferenceStyles.summaryIcon
              )}
              <span {...stylex.props(targetReferenceStyles.summaryTextStrong)}>
                {'Added'}
              </span>
              <span {...stylex.props(targetReferenceStyles.summaryText)}>
                {changeTypeInfo.add}
              </span>
            </div>
            <div {...stylex.props(targetReferenceStyles.summaryItem)}>
              {targetChangeIconSelector(
                'delete',
                28,
                28,
                targetReferenceStyles.summaryIcon
              )}
              <span {...stylex.props(targetReferenceStyles.summaryTextStrong)}>
                {'Deleted'}
              </span>
              <span {...stylex.props(targetReferenceStyles.summaryText)}>
                {changeTypeInfo.delete}
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const targetReferenceStyles = stylex.create({
  wrapper: { display: 'flex', flexDirection: 'column', gap: '20px' },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: colors.textWeek,
    margin: 0,
  },
  detailArea: { overflow: 'hidden' },
  detailList: { display: 'flex', flexDirection: 'column', gap: '4px' },
  summaryArea: { display: 'flex', flexDirection: 'column', gap: '12px' },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.textStrong,
    margin: 0,
  },
  summaryItemArea: {
    display: 'flex',
    gap: '12px',
  },
  summaryItem: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: `0 0 0 1px ${colors.bgStrong}`,
    padding: '16px',
    gap: '12px',
  },
  summaryIcon: {},
  summaryText: {
    color: colors.textNormal,
  },
  summaryTextStrong: {
    color: colors.textStrong,
    fontWeight: '500',
  },
});

type TargetChangeType = 'add' | 'delete' | 'normal';
type TargetInfoBoxProps = TargetReferenceProps['targetsInfo'][number] & {
  changeType: TargetChangeType;
};

const TargetInfoBox = ({
  assetName,
  assetType,
  currentRatioBps,
  ratioDeltaBps,
  changeType,
}: TargetInfoBoxProps) => {
  const wrapperAdditionalStyleName =
    changeType === 'add'
      ? 'wrapperAdded'
      : changeType === 'delete'
      ? 'wrapperDeleted'
      : ratioDeltaBps !== 0
      ? 'wrapperNormalChanged'
      : 'wrapper';
  return (
    <div
      {...stylex.props(
        targetInfoBoxStyles.wrapper,
        targetInfoBoxStyles[wrapperAdditionalStyleName]
      )}
    >
      <div {...stylex.props(targetInfoBoxStyles.iconArea)}>
        {targetChangeIconSelector(changeType, 20, 20, targetInfoBoxStyles.icon)}
      </div>
      <div {...stylex.props(targetInfoBoxStyles.textArea)}>
        <span {...stylex.props(targetInfoBoxStyles.mainText)}>{assetName}</span>
        <div {...stylex.props(targetInfoBoxStyles.subText)}>
          <span>{assetType}</span>
          {/* <span>{`/ 자산설명`}</span> */}
        </div>
      </div>
      <div {...stylex.props(targetInfoBoxStyles.infoArea)}>
        <span
          {...stylex.props(
            targetInfoBoxStyles.mainText,
            targetInfoBoxStyles[
              ratioDeltaBps > 0
                ? 'increseText'
                : ratioDeltaBps < 0
                ? 'decreseText'
                : 'sameText'
            ]
          )}
        >{`${currentRatioBps / 100}%`}</span>
        <span
          {...stylex.props(
            targetInfoBoxStyles.subText,
            targetInfoBoxStyles[
              // changeType === 'add'
              //   ? 'increseText'
              //   : changeType === 'delete'
              //   ? 'decreseText'
              //   : 'subText'
              ratioDeltaBps > 0
                ? 'increseText'
                : ratioDeltaBps < 0
                ? 'decreseText'
                : 'sameText'
            ]
          )}
        >
          {changeType === 'add'
            ? 'Added'
            : changeType === 'delete'
            ? 'Deleted'
            : ratioDeltaBps == 0
            ? `-`
            : `${ratioDeltaBps > 0 && '+'}${ratioDeltaBps / 100}%`}
        </span>
      </div>
    </div>
  );
};

const targetInfoBoxStyles = stylex.create({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '40px auto 3fr',
    borderRadius: '12px',
    padding: '8px',
  },
  wrapperAdded: { backgroundColor: `rgb(from ${colors.profit} r g b / 0.1)` },
  wrapperDeleted: { backgroundColor: `rgb(from ${colors.loss} r g b / 0.1)` },
  wrapperNormalChanged: {
    backgroundColor: `rgb(from ${colors.iconFilter} r g b / 0.1)`,
  },
  iconArea: {},
  icon: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAdded: {},
  iconDeleted: {},
  iconNormal: {},
  textArea: {},
  infoArea: { display: 'flex', flexDirection: 'column', alignItems: 'end' },
  subText: { color: colors.textNormal, fontSize: '12px' },
  mainText: { color: colors.textStrong, fontWeight: '600' },
  increseText: { color: colors.profit },
  decreseText: { color: colors.loss },
  sameText: { color: colors.textNormal },
});
