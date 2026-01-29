import Filter from '@core/components/memos/ORGANISMS/Filter/Filter';
import MemoTable from '@core/components/memos/ORGANISMS/MemoTable/MemoTable';
import Button from '@core/components/shared/ATOMS/Button/Button';
import {
  getAssets,
  getMemos,
  getTransactionTypes,
} from '@core/services/server';
import Link from 'next/link';
import { ComponentProps, Suspense } from 'react';
import * as stylex from '@stylexjs/stylex';
import MemoFormModal from '@core/components/memos/ORGANISMS/MemoFormModal/MemoFormModal';

const MemosPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const params = new URLSearchParams(await searchParams);
  const [
    // assetsRes,
    memosRes,
  ] = await Promise.all([
    // getAssets(),
    getMemos(params.toString()),
  ]);

  //test
  console.log('memoREs: ', memosRes);

  const currencyInfo: ComponentProps<typeof Filter>['currencyInfo'] = [
    { value: 'usd', text: 'USD' },
    { value: 'krw', text: 'KRW' },
  ];

  const modalParam = 'memoModalTarget';
  const memoModalTarget = params.get(modalParam);
  const modalCase = memoModalTarget === 'new' ? 'add' : 'modify';
  const memoModalTargetId =
    memoModalTarget && memoModalTarget !== 'new' ? memoModalTarget : undefined;
  /** searchParams로 filter초기 데이터 처리 */

  //tset
  console.log(
    'moempage modal info: ',
    memoModalTarget,
    modalCase,
    memoModalTargetId
  );

  const makeModalCloseHref = () => {
    params.delete(modalParam);
    // params.delete('modalCase');
    return `?${params.toString()}`;
  };
  return (
    <>
      <section {...stylex.props(pageStyles.wrapper)}>
        <div {...stylex.props(pageStyles.filterLine)}>
          <Suspense>
            <Filter
              // assetInfo={
              //   assetsRes.data?.map((data) => ({
              //     text: data.name,
              //     value: data.id,
              //   })) ?? []
              // }
              currencyInfo={currencyInfo}
              memoTypeInfo={[
                { text: 'Actual', value: 'actual' },
                { text: 'Target', value: 'target' },
                { text: 'Event', value: 'event' },
              ]}
              //   init={}
            />
          </Suspense>
        </div>
        <Suspense>
          <MemoTable
            modalParam={modalParam}
            memoData={
              memosRes.data?.map((data) => ({
                content: data.content,
                date: data.date,
                importance: data.importance,
                memoId: data.id,
                tags: data.tags,
                title: data.title,
                type: data.memoType,
              })) ?? []
            }
          />
        </Suspense>
      </section>
      {memoModalTarget && (
        <MemoFormModal
          mode={modalCase}
          memoId={memoModalTargetId}
          asClose={<Link href={makeModalCloseHref()} scroll={false} replace />}
        />
      )}
    </>
  );
};

export default MemosPage;

const pageStyles = stylex.create({
  wrapper: {
    width: '100%',
    paddingTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
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
  contents: {},
});
