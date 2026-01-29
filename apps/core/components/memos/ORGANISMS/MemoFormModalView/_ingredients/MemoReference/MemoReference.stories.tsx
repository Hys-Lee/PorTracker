import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MemoReference from './MemoReference';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoRecent } from '@core/schemas/features/memos/memos.schema';
import { memoKeys } from '@core/services/keys/memoKeys';

const meta: Meta<typeof MemoReference> = {
  component: MemoReference,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/MemoReference',
  parameters: {
    api: {
      // msw vs. Mock Services 직접 사용
      directMock: false,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MemoReference>;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
});

export const Primary: Story = {
  args: {},
  render: () => {
    queryClient.setQueryData(memoKeys.recents(), [
      {
        content: `콘텐츠라고 함 만약에 길게 한줄로 쓴다면 어느정도 어떻게 나올 수 있을지는 잘 모르겠지만 대충 이정도 쓰면 한줄은 넘어가지 않을까 싶음.\n그래서\n다음\n줄에\n대해서는\n이렇게\n한\n줄\n씩\n띄워\n봄`,
        date: new Date('2026-01-22'),
        evaluation: 'bad',
        importance: 'critical',
        tags: [
          '태그2인데 엄청나게 길어버리면 preview에서는 어떻게 보이고, 이걸 또 어케 처리해야 할지가 참.',
          '태그1',
          '태그 3도 어느정도 길이가 나온다면',
        ],
        title: '타이틀입니다',
        id: '1',
      } as MemoRecent,
      {
        content: `콘텐츠라고 함 만약에 길게 한줄로 쓴다면 어느정도 어떻게 나올 수 있을지는 잘 모르겠지만 대충 이정도 쓰면 한줄은 넘어가지 않을까 싶음.\n그래서\n다음\n줄에\n대해서는\n이렇게\n한\n줄\n씩\n띄워\n봄`,
        date: new Date('2026-01-22'),
        evaluation: 'worse',
        importance: 'normal',
        tags: [
          '태그1',
          '태그2인데 엄청나게 길어버리면 preview에서는 어떻게 보이고, 이걸 또 어케 처리해야 할지가 참.',
          '태그 3도 어느정도 길이가 나온다면',
        ],
        title: '타이틀입니다2222',
        id: '2',
      } as MemoRecent,
      {
        content: `콘텐츠라고 함 만약에 길게 한줄로 쓴다면 어느정도 어떻게 나올 수 있을지는 잘 모르겠지만 대충 이정도 쓰면 한줄은 넘어가지 않을까 싶음.\n그래서\n다음\n줄에\n대해서는\n이렇게\n한\n줄\n씩\n띄워\n봄`,
        date: new Date('2026-01-22'),
        evaluation: 'soso',
        importance: 'useful',
        tags: [
          '태그1',
          '태그2인데 엄청나게 길어버리면 preview에서는 어떻게 보이고, 이걸 또 어케 처리해야 할지가 참.',
          '태그 3도 어느정도 길이가 나온다면',
        ],
        title:
          '타이틀입니다33333.아니 타이틀이 만약에 엄청나게 길어버린다면 도대체 ui상으로는 어떻게 뜰지',
        id: '3',
      } as MemoRecent,
    ]);

    return (
      <>
        <QueryClientProvider client={queryClient}>
          <MemoReference />
        </QueryClientProvider>
      </>
    );
  },
};
