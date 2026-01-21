import { ConfigProvider, Input } from 'antd';
import { ComponentProps } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as stylex from '@stylexjs/stylex';
import { inputBase } from '@core/styles/input.stylex';
import { scrollBarStyles } from '@core/styles/scrollbar.stylex';
import { ScrollArea } from 'radix-ui';
import { colors } from '../../../../tokens/colors.stylex';

const { TextArea: AntdTextArea } = Input;
interface TextAreaProps extends ComponentProps<typeof AntdTextArea> {
  externalStylex?: stylex.StyleXStyles;
}
const TextArea = ({ externalStylex, ...props }: TextAreaProps) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBorder: colors.bgNormal,
              colorBgContainer: colors.bgNormal,
              colorText: colors.textNormal,
              activeBorderColor: colors.primary,
              hoverBorderColor: colors.primary,
              activeShadow: `0 0 2px 1px ${colors.primary}`,
              fontSize: 16,
            },
          },
        }}
      >
        <AntdTextArea
          style={{ whiteSpace: 'pre-wrap', resize: 'none' }}
          {...props}
          className={`${stylex.props(externalStylex).className}`}
        />
      </ConfigProvider>

      {/** 아래와 같이 처리하는건 BACKLOG */}
      {/* <ScrollArea.Root
        style={{
          width: 'min-content',
          borderRadius: '8px',
          paddingRight: '-8px',
          //   height: '200px',
        }}
        {...stylex.props(textAreaStyles.scrollRoot)}
      >
        <ScrollArea.Viewport
          style={{ width: 'min-content' }}
          {...stylex.props(inputBase.base, textAreaStyles.scrollViewport)}
        >
          <TextareaAutosize
            // style={{
            //   height: 200,
            // }}
            minRows={6}
            {...stylex.props(textAreaStyles.textArea)}
          />
        </ScrollArea.Viewport>
        <ScrollArea.ScrollAreaScrollbar
          orientation="vertical"
          {...stylex.props(scrollBarStyles.box, textAreaStyles.scrollBox)}
        >
          <ScrollArea.ScrollAreaThumb
            {...stylex.props(scrollBarStyles.thumb)}
          />
        </ScrollArea.ScrollAreaScrollbar>
      </ScrollArea.Root> */}
    </>
  );
};
export default TextArea;

const textAreaStyles = stylex.create({
  textArea: {
    resize: 'none',
    height: '100px ',
    borderStyle: 'none',
    outlineStyle: 'none',
  },
  scrollBox: {
    // right: '8px',
    // margin: '2px 0',
    // marginRight: '4px',
  },
  scrollViewport: {
    borderRadius: '8px',
    position: 'relative',
  },
  scrollRoot: {
    overflow: 'hidden',
  },
});
