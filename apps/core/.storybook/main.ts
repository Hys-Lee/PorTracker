import type { StorybookConfig } from '@storybook/nextjs/dist';
import { dirname, join } from 'path';
import { createRequire } from 'module'; // 1. createRequire 불러오기

// 2. ESM 환경에서 require 기능을 사용하기 위해 생성
const require = createRequire(import.meta.url);

/**
 * 이 함수는 패키지 이름을 절대 경로로 변환합니다.
 * Windows + pnpm 환경 호환을 위해 템플릿 리터럴(`${value}/package.json`)을 사용합니다.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(`${value}/package.json`));
}

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // getAbsolutePath('@storybook/addon-essentials'),
    // getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};

export default config;
