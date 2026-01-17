import * as stylex from '@stylexjs/stylex';
const makeCss2Stylex = (cssClassName: string) => {
  return {
    $$css: true,
    [cssClassName]: cssClassName,
  } as unknown as stylex.StaticStyles;
};
export { makeCss2Stylex };
