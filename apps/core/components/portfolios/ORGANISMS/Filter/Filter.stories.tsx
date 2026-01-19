import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import Filter from './Filter';

const meta: Meta<typeof Filter> = {
  component: Filter,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Portfolios/Filter',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Primary: Story = {
  args: {
    assetInfo: [{ name: '1', value: '1' }],
    currencyInfo: [
      { name: 'c1', value: 'krw' },
      { name: 'c2', value: 'usd' },
    ],
    transactionInfo: [
      { name: 't1', value: 'allocation' },
      { name: 't2', value: 'dividend' },
      { name: 't3', value: 'fee' },
      { name: 't4', value: 'withdrawal' },
    ],
  },
  // parameters: {
  //   nextjs: {
  //     appDirectory: true,
  //     router: {
  //       pathname: '/',
  //       asPath: '/asdf',
  //       query: {
  //         id: 'yaho',
  //       },
  //       push: (...args) => action('router.push')(...args),
  //     },
  //   },
  // },
};
