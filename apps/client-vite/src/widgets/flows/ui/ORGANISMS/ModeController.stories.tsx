import ModeController from './ModeContoller';

import { FlowModeAtom } from '../../../../entities/flows/atoms/flowAtoms';
import { within, fireEvent } from '@storybook/testing-library';

export default {
  component: ModeController,
  title: 'ModeController',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

export const Default = {
  args: {},
  //   play: ({ canvasElement }) => {
  //     const canvas = within(canvasElement);
  //     const buttons = canvas.getAllByRole('button');
  //     fireEvent.click(buttons[2]);
  //   },
};
