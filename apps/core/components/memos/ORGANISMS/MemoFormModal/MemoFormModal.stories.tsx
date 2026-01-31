import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoFormModal from './MemoFormModal';
import StoreProvider from '@core/utils/components/StoreProvider/StoreProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { memoKeys } from '@core/services/keys/memoKeys';
import { mockDB } from '@core/mocks/db/memoDB';

const meta: Meta<typeof MemoFormModal> = {
  component: MemoFormModal,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Memos/MemoFormModal',
  parameters: {
    api: {
      // msw vs. Mock Services 직접 사용
      directMock: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MemoFormModal>;
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
});
export const Primary: Story = {
  args: {},
  render: (args) => {
    queryClient.setQueryData(memoKeys.recents(), []);
    return (
      <QueryClientProvider client={queryClient}>
        <MemoFormModal mode="add" modalCloseHref="/" />
      </QueryClientProvider>
    );
  },
};

export const ModifyVersion: Story = {
  args: {},
  render: (args) => {
    queryClient.setQueryData(memoKeys.recents(), []);

    const memoIds = Array.from(mockDB.memo.keys());

    return (
      <QueryClientProvider client={queryClient}>
        <MemoFormModal modalCloseHref="/" mode="modify" memoId={memoIds[0]} />
      </QueryClientProvider>
    );
  },
};
