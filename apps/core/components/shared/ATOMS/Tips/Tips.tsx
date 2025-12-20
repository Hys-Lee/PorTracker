import { Tooltip } from 'radix-ui';
import { ReactNode } from 'react';
import {
  QuestionMarkIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
interface TipsProps {
  content: ReactNode;
}
const Tips = ({ content }: TipsProps) => {
  return (
    <>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild {...stylex.props(buttonStyles.base)}>
            <button type="button">
              <QuestionMarkIcon width={'100%'} height={'100%'} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              sideOffset={5}
              {...stylex.props(contentStyles.base)}
            >
              {content}
              <Tooltip.Arrow style={{ fill: 'white' }} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};

export default Tips;

const buttonStyles = stylex.create({
  base: {
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: '16px',
    width: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: {
      default: 'rgb(from black r g b / 0)',
      ':hover': 'rgb(from var(--gray-t) r g b / 0.1)',
    },
    boxShadow: {
      default: '0 0  0 1px var(--gray-ic)',
      ':focus': '0 0  0 2px var(--gray-ic)',
    },
    color: 'var(--gray-ic)',
    userSelect: 'none',
    borderWidth: '0px',
    // padding: '0px',
    padding: '1px',
    paddingTop: '3px',
  },
});

const contentStyles = stylex.create({
  base: {
    borderRadius: '12px',
    padding: '10px 15px',
    fontSize: '15px',
    lineHeight: 1,
    color: ' var(--violet-11)',
    backgroundColor: 'white',
    boxShadow:
      'hsl(206 22% 7% / 35%) 0px 10px 38px -10px,hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    userSelect: 'none',
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  },
});
