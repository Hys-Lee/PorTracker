import { Select, SelectProps, ConfigProvider } from 'antd';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import tagInputCss from './TagInput.module.css';

interface TagInputProps
  extends Omit<SelectProps, 'tokenSeparators' | 'mode' | 'className'> {
  externalStylex?: stylex.StyleXStyles;
}

const TagInput = ({ externalStylex, ...props }: TagInputProps) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorBgContainer: colors.bgNormal,
              colorBorder: colors.bgNormal,
              activeBorderColor: colors.primary,
              hoverBorderColor: colors.primary,
              activeOutlineColor: `rgb(from ${colors.primary} r g b / 0.1)`,
              optionSelectedBg: `rgb(from ${colors.primary} r g b / 0.2)`,
              multipleItemBg: `rgb(from ${colors.primary} r g b / 0.3)`,
              colorPrimary: colors.textPrimary,
              //   fontSize: 16,
              fontWeightStrong: 500,
              fontFamily: 'inherit',
              colorText: colors.textNormal,
            },
          },
        }}
      >
        <Select
          tokenSeparators={[' ']}
          mode="tags"
          maxTagCount={'responsive'}
          {...props}
          className={`${
            stylex.props(tagInputStyles.base, externalStylex).className
          } ${tagInputCss.base}`}
        />
      </ConfigProvider>
    </>
  );
};
export default TagInput;

const tagInputStyles = stylex.create({
  base: {
    width: '200px',
  },
});
