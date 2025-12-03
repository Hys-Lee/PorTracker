import '../src/styles.css';
import '@styled-system/styles.css';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/blocks';
import type { Preview } from '@storybook/react';

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
