// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   output: 'export', // Outputs a Single-Page Application (SPA).
// //   distDir: './dist', // Changes the build output directory to `./dist/`.
// // }

// // export default nextConfig

// // apps/my-app/next.config.js
// // const { composePlugins, withNx } = require('@nx/next');
// const { composePlugins, withNx } = require('@nx/next');
// // import { composePlugins, withNx } from '@nx/next';
// // require('@stylex')
// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/

// // import stylexPlugin from '@stylexswc/nextjs-plugin/turbopack';

// const path = require('path');
// const nextConfig = {
//   // 여기에 Next.js 전용 설정 (images, rewrites 등)을 넣습니다.
//   nx: {
//     // Nx 관련 옵션 (svgr 등)
//     // svgr: false,
//   },
//   // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//   //   // tsconfig.base.json의 paths와 동일하게 설정
//   //   config.resolve.alias = {
//   //     ...config.resolve.alias,
//   //     '@core': join(workspaceRoot, 'apps/core'),
//   //   };
//   //   return config;
//   // },

//   // turbopack: {
//   //   rules: {
//   //     '**/*.{js,jsx,ts,tsx}': {
//   //       loaders: [{ loader: '@next/babel-loader' }],
//   //     },
//   //   },
//   // },
//   // webpack: (config) => {
//   //   config.resolve.alias = {
//   //     ...config.resolve.alias,
//   //     '@core/*': [path.join(__dirname, '*')],
//   //   };
//   // },
// };

// const stylex = (async () =>
//   await import('@stylexswc/nextjs-plugin/turbopack').default)({
//   // rootDir: path.join(__dirname, '../..'),
//   aliases: {
//     '@core/*': [path.join(path.join(__dirname, '../../'), 'apps/core/*')],
//   },
//   rsOptions: {
//     dev: process.env.NODE_ENV !== 'production',
//   },
// });

// const plugins = [
//   // Nx 플러그인이 여기서 빌드 경로 등을 자동으로 주입해줍니다.
//   withNx,
//   stylex,
// ];

// module.exports = composePlugins(...plugins)(nextConfig);
// // export default composePlugins(...plugins)(nextConfig);

// apps/core/next.config.js

// const { composePlugins, withNx } = require('@nx/next');
// const path = require('path');

// const workspaceRoot = path.join(__dirname, '../..');

// // 비동기 함수로 설정을 내보냅니다.
// module.exports = async (phase) => {
//   // 1. stylex swc 플러그인을 동적으로 가져옵니다.
//   const stylexPlugin = (await import('@stylexswc/nextjs-plugin/turbopack'))
//     .default;

//   // 2. 기본 Next.js 설정을 정의합니다.
//   const nextConfig = {
//     nx: {
//       svgr: false,
//     },
//   };

//   // 3. 먼저 NX 플러그인만 적용하여 중간 설정을 완성합니다.
//   const configWithNx = composePlugins(withNx)(nextConfig);

//   // 4. 위에서 완성된 NX 설정 객체를 stylexPlugin으로 감싸서 최종 설정을 만듭니다.
//   //    stylexPlugin(옵션)(감쌀_설정) 형태로 사용합니다.
//   return stylexPlugin({

//     rsOptions: {
//       aliases: {
//       // 경로를 직접, 절대 경로로 지정합니다.
//       '@core/*': [path.join(workspaceRoot, 'apps/core/*')],
//     },
//       dev: process.env.NODE_ENV !== 'production',
//     },
//   })(configWithNx);
// };

// apps/core/next.config.js

const path = require('path');
const { composePlugins, withNx } = require('@nx/next');
const stylexPlugin = require('@stylexswc/nextjs-plugin/turbopack').default;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              typescript: true,
              dimensions: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /react/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              icon: true,
              dimensions: false,
            },
          },
        ],
      },
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: [/react/] },
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },

  // transpilePackages: ['@stylexjs/open-props'],
};
// const withStyleX = stylexPlugin({
//   rootDir: path.join(__dirname, '../../'),
//   include: ['./**/*.{js,jsx,ts,tsx}'],
//   rsOptions: {
//     aliases: {
//       '@core/*': [path.join(__dirname, '*')],
//     },

//     unstable_moduleResolution: {
//       type: 'commonJS',
//       rootDir: path.join(__dirname, '../../'),
//     },
//     runtimeInjection: true,
//     treeshakeCompensation: true,
//     styleResolution: 'application-order',
//     enableDebugClassNames: false,
//     dev: process.env.NODE_ENV !== 'production',
//   },
//   stylexImports: ['stylex', '@stylexjs/stylex'],
// });
// 2. Nx의 composePlugins를 사용하여 플러그인들을 순서대로 조합합니다.
const plugins = [
  // stylex,
  withNx,
];

// 3. 조합된 플러그인으로 nextConfig를 감싸서 최종 설정을 export 합니다.
module.exports = composePlugins(...plugins)(nextConfig);
