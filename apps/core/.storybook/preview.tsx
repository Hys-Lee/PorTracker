// import { spyOn } from 'storybook/';
// import '../src/styles.css';
// import '@styled-system/styles.css';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook//blocks';
import type { Preview } from '@storybook/nextjs';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Description /> {/* component description이 여기 표시 */}
          <p>----</p>
          <Primary />
          <Controls />
          <p>EX</p>
          <Stories />
          <Subtitle /> {/* story description이 여기 표시 */}
        </>
      ),
    },
  },
};

export default preview;

export const beforeEach = function beforeEach() {
  spyOn(console, 'log').mockName('console.log');
  spyOn(console, 'warn').mockName('console.warn');
  spyOn(console, 'error').mockName('console.error');
  spyOn(console, 'info').mockName('console.info');
  spyOn(console, 'debug').mockName('console.debug');
  spyOn(console, 'trace').mockName('console.trace');
  spyOn(console, 'count').mockName('console.count');
  spyOn(console, 'dir').mockName('console.dir');
  spyOn(console, 'assert').mockName('console.assert');
};
