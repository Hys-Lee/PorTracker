import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActualFormModal from './ActualFormModal';
// import { mockDB } from '@core/mocks/_legacy_/db/portfoliosDB';
import { mockRepositoryDB } from '@core/mocks/repositories';
import { Suspense } from 'react';
import { transactionIconSelector } from '@core/utils/renderers/iconSelector';
import { TRANSACTION_MAP, TRANSACTION_VALUES } from '@core/constants';

const meta: Meta<typeof ActualFormModal> = {
  component: ActualFormModal,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/ActualFormModal',
  tags: ['autodocs'],
  parameters: {
    api: {
      // msw안쓰고 Mock Services 직접 사용
      directMock: true,
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ActualFormModal>;
const CloseBtn = () => <div>임시닫기</div>;
const CloseEle = <CloseBtn />;

const targetId = [...mockRepositoryDB.memos.values()].find(
  (memo) => memo.actualId
)?.actualId;
// const target = mockRepositoryDB.actualPortfolios.get(targetId || '');

const assetInfo = [...mockRepositoryDB.assets.values()].map((data) => ({
  text: data.name || '',
  value: data.id || '',
}));

const transactionTypeInfo = [...TRANSACTION_VALUES].map((data) => ({
  icon: transactionIconSelector(data, 24, 24),
  text: TRANSACTION_MAP[data],
  value: data,
}));

export const Primary: Story = {
  // loaders: [
  //   async () => {
  //     const actualsRes = await (
  //       await fetch('http://localhost:6006/api/portfolios/actuals')
  //     ).json();
  //     // const actualRes = await getAllActualPortfolios();
  //     // if (!actualRes.success) {
  //     //   console.error(actualRes.error);
  //     //   return;
  //     // }
  //     // const pseudoTarget = actualRes.data[0]; // 수동 타겟.
  //     const pseudoTarget = actualsRes[0];
  //     console.log('[STORY]로드에서 가져온거:', pseudoTarget.id);
  //     return { targetId: pseudoTarget.id };
  //   },
  // ],
  render: (args, { loaded }) => {
    // console.log('linkedActuals: ', linkedActual);
    // mockDB.actuals.get(linkedActual?.id);
    console.log('TARGETID: ', targetId);

    return (
      <ActualFormModal
        mode={args.mode}
        portfolioId={targetId}
        // asClose={CloseEle}
        modalCloseHref="/"
        assetsInfo={assetInfo}
        transactionTypesInfo={transactionTypeInfo}
      />
    );
  },
  args: {
    mode: 'add',
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['add', 'modify'],
    },
  },
};
