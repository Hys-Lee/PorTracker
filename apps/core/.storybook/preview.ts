import type { Preview } from '@storybook/react/dist';

const preview: Preview = {
  parameters: {
    // 액션 탭 설정 (클릭 이벤트 등 감지)
    actions: { argTypesRegex: '^on[A-Z].*' },

    // 색상 선택기 등 컨트롤 설정
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Next.js 라우터 모킹 설정 (App Router 사용 시)
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
