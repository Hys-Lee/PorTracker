import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { action } from 'storybook/actions';
import Filter from './Filter';

const meta: Meta<typeof Filter> = {
  component: Filter,
  // 앱 내부이므로 title에 앱 이름을 고정하거나 생략해도 됩니다.
  title: 'ProTracker/Filter',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Primary: Story = {
  args: {},
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
