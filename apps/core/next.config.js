// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', // Outputs a Single-Page Application (SPA).
//   distDir: './dist', // Changes the build output directory to `./dist/`.
// }

// export default nextConfig

// apps/my-app/next.config.js
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // 여기에 Next.js 전용 설정 (images, rewrites 등)을 넣습니다.
  nx: {
    // Nx 관련 옵션 (svgr 등)
    // svgr: false,
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // tsconfig.base.json의 paths와 동일하게 설정
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@core': join(workspaceRoot, 'apps/core'),
  //   };
  //   return config;
  // },
};

const plugins = [
  // Nx 플러그인이 여기서 빌드 경로 등을 자동으로 주입해줍니다.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
