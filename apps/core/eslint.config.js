// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');
const { plugin } = require('typescript-eslint');

module.exports = [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      'react/jsx-no-useless-fragment': 'off',
      // '@typescript-eslint/no-explicit-any': 'warn', // 임시
      // '@typescript-eslint/no-implicit-any-array': 'warn', // 임시
      // // '@typescript-eslint/no-implicit-any': 'warn',
      // '@typescript-eslint/no-unsafe-call': 'warn',
      // '@typescript-eslint/no-unsafe-member-access': 'warn',
      // '@typescript-eslint/no-unsafe-argument ': 'warn',
      // '@typescript-eslint/no-unsafe-assignment ': 'warn',
    },
  },
];
