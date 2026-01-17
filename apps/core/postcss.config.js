const babelConfig = require('./.babelrc.js');

module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['./**/*.{js,jsx,ts,tsx}'],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: babelConfig.plugins,
      },
      useCSSLayers: true,
    },
    autoprefixer: {},
  },
};
/************************************ */
// const path = require('path');
// const projectRoot = __dirname;

// module.exports = {
//   plugins: {
//     '@stylexswc/postcss-plugin': {
//       // 1. StyleX를 사용하는 파일 경로만 지정 (충분함)
//       include: [
//         // './app/**/*.{js,jsx,ts,tsx}',
//         // path.join(projectRoot, 'app/**/*.{js,jsx,ts,tsx}'),
//         // // './components/**/*.{js,jsx,ts,tsx}',
//         // path.join(projectRoot, 'components/**/*.{js,jsx,ts,tsx}'),
//         './**/*.{js,jsx,ts,tsx}',
//       ],

//       useCSSLayers: true,
//       rsOptions: {
//         // 2. 별칭(Alias) 설정 - 필요하다고 하셨으니 유지
//         aliases: {
//           '@core/*': [path.join(projectRoot, '*')],
//         },
//         // 3. 환경 설정
//         dev: process.env.NODE_ENV !== 'production',
//         styleResolution: 'application-order',
//         enableDebugClassNames: process.env.NODE_ENV !== 'production',
//         runtimeInjection: true,
//         treeshakeCompensation: true,
//         // 모노레포에서 발생할 수 있는 모듈 해석 이슈 방지
//         unstable_moduleResolution: {
//           type: 'commonJS',
//           // rootDir: path.join(__dirname, '../../'),
//         },
//       },
//     },
//     autoprefixer: {},
//   },
// };
