import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  /** Theme */
  primary: 'var(--jade-p)',
  secondary: 'var(--blue-s)',
  /** Theme Primary Variants */
  primaryVariant100: 'var(--jade-p-1)',
  primaryVariant200: 'var(--jade-p-2)',
  primaryVariant300: 'var(--jade-p-3)',
  primaryVariant400: 'var(--jade-p-4)',
  primaryVariant500: 'var(--jade-p-5)',
  primaryVariant600: 'var(--jade-p-6)',
  primaryVariant700: 'var(--jade-p-7)',
  primaryVariant800: 'var(--jade-p-8)',
  primaryVariant900: 'var(--jade-p-9)',
  primaryVariant1000: 'var(--jade-p-10)',
  /** Profit & Loss */
  profit: 'var(--green-pr)',
  loss: 'var(--red-lo)',
  /** Text */
  textPrimary: 'var(--jade-t)',
  textStrong: 'var(--black-t)',
  textNormal: 'var(--blue-t)',
  textWeek: 'var(--gray-t)',
  /** Background */
  bgStrong: 'var(--gray-b-s)',
  bgNormal: 'var(--gray-b-n)',
  bgWeek: 'var(--gray-b-w)',
  /** Importance */
  importanceCriticalStrong: 'var(--red-i-s)',
  importanceCriticalWeek: 'var(--red-i-w)',
  importanceUsefulStrong: 'var(--blue-i-s)',
  importanceUsefulWeek: 'var(--blue-i-w)',
  importanceNormalStrong: 'var(--gray-i-s)',
  importanceNormalWeek: 'var(--gray-i-w)',
  /** Category */
  category1Strong: 'var(--blue-c-s)',
  category1Week: 'var(--blue-c-w)',
  category2Strong: 'var(--dblue-c-s)',
  category2Week: 'var(--dblue-c-w)',
  category3Strong: 'var(--purple-c-s)',
  category3Week: 'var(--purple-c-w)',
  category4Strong: 'var(--pink-c-s)',
  category4Week: 'var(--pink-c-w)',
  category5Strong: 'var(--red-c-s)',
  category5Week: 'var(--red-c-w)',
  category6Strong: 'var(--orange-c-s)',
  category6Week: 'var(--orange-c-w)',
  category7Strong: 'var(--yellow-c-s)',
  category7Week: 'var(--yellow-c-w)',
  category8Strong: 'var(--lime-c-s)',
  category8Week: 'var(--lime-c-w)',
  category9Strong: 'var(--green-c-s)',
  category9Week: 'var(--green-c-w)',
  category10Strong: 'var(--cyan-c-s)',
  category10Week: 'var(--cyan-c-w)',
  /** Icon */
  iconFilter: 'var(--gray-ic)',
  iconTransactionMajor: 'var(--jade-ic-s)',
  iconTransactionMinor: 'var(--jade-ic-w)',
  iconTransactionProfit: 'var(--green-ic)',
  iconTransactionLoss: 'var(--red-ic)',
});
