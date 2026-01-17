import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ActualFormModal from './ActualFormModal';
import { mockDB } from '@core/mocks/db/portfoliosDB';
import { Suspense } from 'react';
import { transactionIconSelector } from '@core/utils/renderers/iconSelector';

const meta: Meta<typeof ActualFormModal> = {
  component: ActualFormModal,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/ActualFormModal',
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

const target = [...mockDB.actuals.values()].filter(
  (data) => data.linkedMemo !== null
)[0].id;

const assetInfo = [...mockDB.assets.values()].map((data) => ({
  text: data.name,
  value: data.id,
}));

const transactionTypeInfo = [...mockDB.transactionTypes.values()].map(
  (data) => ({
    icon: transactionIconSelector(data.value, 24, 24),
    text: data.text,
    value: data.value,
  })
);

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
    console.log('TARGETID: ', target);

    return (
      <ActualFormModal
        mode={args.mode}
        portfolioId={target}
        asClose={CloseEle}
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
