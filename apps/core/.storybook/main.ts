import type { StorybookConfig } from '@storybook/nextjs';
import { dirname } from 'path';
import { createRequire } from 'module'; // 1. createRequire 불러오기
import path from 'path';
import { fileURLToPath } from 'node:url';
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
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    // getAbsolutePath('@storybook/addon-essentials'),
    // getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    '@storybook/addon-docs',
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  docs: {
    defaultName: 'Documentation',
  },
  staticDirs: ['../public'],
  babel: async (options: any) => {
    return {
      ...options,
      // Next.js 기본 프리셋 사용
      presets: [['next/babel']],
      plugins: [
        ...(options.plugins || []),
        [
          '@stylexjs/babel-plugin',
          {
            dev: process.env.NODE_ENV === 'development',
            // 🔥 CLI로 CSS를 뽑고 있으므로 runtimeInjection은 반드시 false여야 합니다.
            runtimeInjection: false,
            genConditionalClasses: true,
            treeshakeCompensation: true,
            unstable_moduleResolution: {
              type: 'commonJS',
              // 모노레포 환경에서 루트 경로를 확실하게 잡기 위해
              // 현재 파일(.storybook/main.ts) 위치 기준으로 상위 폴더를 지정합니다.
              rootDir: path.resolve(
                dirname(fileURLToPath(import.meta.url)),
                '../'
              ),
            },
          },
        ],
      ],
    };
  },
};

export default config;
