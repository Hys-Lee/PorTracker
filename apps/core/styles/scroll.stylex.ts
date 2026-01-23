import * as stylex from '@stylexjs/stylex';

export const scrollBarStyles = stylex.create({
  verticalBox: {
    width: '4px',
    display: 'flex',
    // 	/* ensures no selection */
    userSelect: 'none',
    // 	/* disable browser handling of all panning and zooming gestures on touch devices */
    touchAction: 'none',
    padding: '2px',
    backgroundColor: {
      default: `rgb(from var(--black-t) r g b / 0.1)`,
      ':hover': 'rgb(from var(--black-t) r g b / 0.3)',
    },
    transition: 'background 160ms ease-out',
  },
  verticalThumb: {
    flex: '1',
    backgroundColor: 'rgb(from var(--black-t) r g b / 0.5)',
    borderRadius: '24px',
    position: 'relative',
    '::before': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: '44px',
      minHeight: ' 44px',
    },
  },
  horizontalBox: {
    height: '4px',
    display: 'flex',
    // 	/* ensures no selection */
    userSelect: 'none',
    // 	/* disable browser handling of all panning and zooming gestures on touch devices */
    touchAction: 'none',
    padding: '2px',
    backgroundColor: {
      default: `rgb(from var(--black-t) r g b / 0.1)`,
      ':hover': 'rgb(from var(--black-t) r g b / 0.3)',
    },
    transition: 'background 160ms ease-out',
  },
  horizontalThumb: {
    backgroundColor: 'rgb(from var(--black-t) r g b / 0.5)',
    borderRadius: '24px',
    position: 'relative',
    '::before': {
      content: '',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: '44px',
      minHeight: ' 44px',
    },
  },
});

export const nonScorlledOverflowStyles = stylex.create({
  verticalFadeout: {
    // 넘칠 때 그라데이션
    maskImage: `linear-gradient(to bottom, black 70%, transparent 100%)`,
    WebkitMaskImage: `linear-gradient(to bottom, black 70%, transparent 100%)`,
    //   mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
    // -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  },
  horizontalFadeout: {
    maskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
  },
});
