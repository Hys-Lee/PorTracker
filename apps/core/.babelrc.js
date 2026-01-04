const path = require('path');

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  // presets: ['next/babel'],
  presets: ['@babel/preset-typescript'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@core': './',
        },
      },
    ],
    [
      '@stylexjs/babel-plugin',
      {
        dev,
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        // aliases: { '@core/*': [path.join(__dirname, '*')] },
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: path.join(__dirname, '../../'),
          // aliases: { '@core/*': [path.join(__dirname, '*')] },
        },
        // ... other StyleX configuration
      },
    ],
  ],
};
