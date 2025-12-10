import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';
import stylex from '@stylexjs/unplugin';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, '../');

const config: StorybookConfig = {
  stories: [
    path.resolve(currentDir, '..', 'components') + '/**/*.mdx',
    path.resolve(currentDir, '..', 'components') +
      '/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@nx/storybook/preset'],

  framework: { name: '@storybook/nextjs-vite', options: {} },

  docs: {
    defaultName: 'Documentation',
  },
  staticDirs: ['../public'],

  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        // StyleX 플러그인 추가 (설정 끝)
        stylex.vite({
          dev: process.env.NODE_ENV === 'development',
          useCSSLayers: true,
          // ... other StyleX configuration options
          unstable_moduleResolution: {
            type: 'commonJS',
            rootDir: path.resolve(rootDir, '../../../'),
          },
          aliases: {
            '@core': rootDir,
          },
        }),
      ],
      resolve: {
        alias: {
          // Next.js의 @/ 경로를 apps/core 폴더로 연결
          '@core': rootDir,
          // '@core': path.resolve(rootDir, 'apps/core'),
        },
      },
    });
  },
};

export default config;
