import type { Preview } from '@storybook/nextjs-vite';
import { suite } from '@core/app/fonts';
import { fonts } from '../tokens/fonts.stylex';
import * as stylex from '@stylexjs/stylex';

// import './stylex_bundle.css';
import './stylex.css';
import { useEffect } from 'react';

const preview: Preview = {
  tags: ['autodocs'],
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
  decorators: (Story) => {
    return (
      <div className={suite.variable}>
        <Story />;
      </div>
    );
  },
};

export default preview;

const wrapperStyles = stylex.create({
  font: {
    fontFamily: fonts.suite,
  },
});
