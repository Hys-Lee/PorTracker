import ActualFormModal from '@core/components/portfolios/ORGANISMS/ActualFormModal/ActualFormModal';
import { colors } from '../../../../tokens/colors.stylex';

import { PlusIcon } from '@radix-ui/react-icons';

import * as stylex from '@stylexjs/stylex';
import {
  getAllActualPortfolios,
  getTransactionTypes,
  getAssets,
} from '@core/services/server';
import Link from 'next/link';
import ActualTable from '@core/components/portfolios/ORGANISMS/ActualTable/ActualTable';
import { Suspense } from 'react';
import Filter from '@core/components/portfolios/ORGANISMS/Filter/Filter';
import { CURRENCY_MAP, CURRENCY_VALUES } from '@core/constants';
import { transactionIconSelector } from '@core/utils/renderers/iconSelector';
import SegmentControl from '@core/components/shared/MOLECULES/SegmentControl/SegmentControl';
import Button from '@core/components/shared/ATOMS/Button/Button';
import PortfolioTypeSwitch from '../../_components/PortfolioTypeSwitch';

// const linkedActual = [...mockDB.actuals.values()].find(
//   (data) => data.linkedMemo !== null
// );
const PortfolioPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const params = new URLSearchParams(await searchParams);

  // const getFilterParams = () => {
  //   const assets = params.get('assets');
  //   const startDate = params.get('startDate');
  //   const endDate = params.get('endDate');
  //   const transaction = params.get('transaction');
  //   const currency = params.get('currency');

  //   //test
  //   console.log('rsc에서 transaction: ', transaction);

  //   return { assets, startDate, endDate, transaction, currency };
  // };

  const [transactionTypesRes, assetsRes, actualsRes] = await Promise.all([
    getTransactionTypes(),
    getAssets(),
    getAllActualPortfolios(params.toString()),
  ]);

  /** URL SearchParams Handling */

  const modalParam = 'portfolioTarget';
  const portfolioTarget = params.get(modalParam);
  const modalCase = portfolioTarget === 'new' ? 'add' : 'modify';
  const portfolioTargetId =
    portfolioTarget && portfolioTarget !== 'new' ? portfolioTarget : undefined;

  const makeHref = (keyValueArr: { key: string; value: string }[]) => {
    keyValueArr.forEach(({ key, value }) => {
      params.set(key, value);
    });

    return `?${params.toString()}`;
  };

  const makeModalCloseHref = () => {
    params.delete(modalParam);
    // params.delete('modalCase');
    return `?${params.toString()}`;
  };

  return (
    <>
      {/* <div {...stylex.props(pageStyles.wrapper)}>
        <PortfolioTypeSwitch /> */}
      <section {...stylex.props(pageStyles.contents)}>
        <div {...stylex.props(pageStyles.filterLine)}>
          <Suspense>
            <Filter // 이거 fetch로 받아올지 이렇게 할지 고민 중..
              init={{
                assets: params.get('assets') || '',
                currency: params.get('currency') || '',
                startDate: params.get('startDate') || '',
                endDate: params.get('endDate') || '',
                transaction: params.get('transaction') || '',
              }}
              currencyInfo={[
                {
                  name: CURRENCY_MAP[CURRENCY_VALUES[0]],
                  value: CURRENCY_VALUES[0],
                },
                {
                  name: CURRENCY_MAP[CURRENCY_VALUES[1]],
                  value: CURRENCY_VALUES[1],
                },
              ]}
              assetInfo={
                assetsRes.data?.map((data) => ({
                  name: data.name,
                  value: data.id,
                })) || []
              }
              transactionInfo={
                transactionTypesRes.data?.map((data) => ({
                  name: data.text,
                  value: data.value,
                })) || []
              }
            />
            <Link
              href={makeHref([{ key: modalParam, value: 'new' }])}
              {...stylex.props(pageStyles.addLink)}
            >
              <Button
                variant="solid"
                // variant="outlined"
                rounded="normal"
                buttonStylex={pageStyles.addBtn}
              >
                {'+'}
                {/* <PlusIcon width={16} height={16} /> */}
                {/* {'추가하기'} */}
              </Button>
            </Link>
          </Suspense>
        </div>
        <Suspense>
          <ActualTable
            modalParam={modalParam}
            actualData={
              actualsRes.data?.map((data) => ({
                assetInfo: {
                  description: data.assetDescription || '',
                  name: data.assetName,
                },
                categoryInfo: { color: 1, name: data.assetType },
                changeInfo: {
                  acc: data.accumulatedRatio,
                  changes: data.changesRatio,
                },
                currency: data.currency,
                date: data.date,
                id: data.id,
                transactionType: data.transactionType,
                value: data.value,
              })) ?? []
            }
          />
        </Suspense>
      </section>
      {/* </div> */}
      {portfolioTarget && (
        <ActualFormModal
          assetsInfo={
            assetsRes.data?.map((data) => ({
              text: data.name,
              value: data.id,
            })) || []
          }
          transactionTypesInfo={
            transactionTypesRes.data?.map((data) => ({
              icon: transactionIconSelector(data.value, 24, 24),
              text: data.text,
              value: data.value,
            })) || []
          }
          mode={modalCase}
          portfolioId={portfolioTargetId}
          asClose={<Link href={makeModalCloseHref()} scroll={false} replace />}
        />
      )}
    </>
  );
};

const pageStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  filterLine: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    minWidth: '1024px',
  },
  addBtn: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    gap: '8px',
    right: '8px',
    fontSize: '24px',
    padding: '4px',
    width: '40px',
    height: '40px',
    // width: '100px',
    fontWeight: '500',
    // color: colors.textPrimary,
  },
  addLink: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    width: '100%',
  },
});

export default PortfolioPage;
