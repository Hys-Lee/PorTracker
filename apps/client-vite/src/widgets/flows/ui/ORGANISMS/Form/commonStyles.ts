import { css } from '@styled-system/css';

const FieldDefaultStyle = css({
  // width: '100%',

  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  alignItems: 'center',
});

const LabelDefaultStyle = css({
  width: '40px',
  flexShrink: 0,
});

const FormContentsDefaultStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const FormControlDefaultStyle = css({
  flexGrow: 1,
  width: '100%',
});

export {
  FieldDefaultStyle,
  LabelDefaultStyle,
  FormContentsDefaultStyle,
  FormControlDefaultStyle,
};
