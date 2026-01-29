import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';
import stylex from '@stylexjs/unplugin';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'node:url';
import svgr from 'vite-plugin-svgr';
// import tsconfigPaths from 'vite-tsconfig-paths';

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, '../');

const config: StorybookConfig = {
  features: { experimentalRSC: true },
  stories: [
    path.resolve(currentDir, '..', 'components') + '/**/*.mdx',
    path.resolve(currentDir, '..', 'components') +
      '/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@nx/storybook/preset',
    'msw-storybook-addon',
  ],

  framework: { name: '@storybook/nextjs-vite', options: {} },

  docs: {
    defaultName: 'Documentation',
  },
  staticDirs: ['../public'],

  viteFinal: async (config) => {
    config.define = {
      ...config.define,
      'process.env.STORYBOOK': JSON.stringify(true),
    };

    if (config.optimizeDeps) {
      config.optimizeDeps.exclude = [
        ...(config.optimizeDeps.exclude || []),
        'msw',
        '@mswjs/interceptors',
      ];
    }

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
        svgr({
          include: '../**/*.svg?react',
        }),
      ],
      resolve: {
        alias: [
          {
            find: '@core/services/server',
            replacement: path.join(rootDir, './mocks/services/server'),
          },
          {
            find: '@core/services/client',
            replacement: path.join(rootDir, './mocks/services/client'),
          },
          {
            // Next.js의 @/ 경로를 apps/core 폴더로 연결
            // '@core': rootDir,
            find: '@core',
            replacement: rootDir,
          },
        ],
      },
    });
  },
};

export default config;
