import { Select } from 'radix-ui';
import * as stylex from '@stylexjs/stylex';
import { ReactNode } from 'react';
import { colors } from '../../../../tokens/colors.stylex';
import cssStyles from './IconSelect.module.css';

type IconItem = {
  icon: ReactNode;
  text: string;
  value: string;
};

interface IconSelectProps extends Select.SelectProps {
  items: IconItem[];
  placeholderIcon?: ReactNode;
  triggerStylex?: stylex.StyleXStyles;
}

/**
 * **제어/비제어 모두 사용 가능**
 *
 * Trigger크기는 Icon크기 맞춰 알아서 스타일 주입
 */
const IconSelect = ({
  items,
  placeholderIcon,
  triggerStylex,
  defaultValue,
  value,
  onValueChange,
  ...props
}: IconSelectProps) => {
  return (
    <>
      <Select.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <Select.Trigger
          className={`${cssStyles.SelectTrigger} ${
            stylex.props(triggerStyles.base, triggerStylex).className
          } `}
          // {...stylex.props(triggerStyles.base, triggerStylex)}
        >
          <Select.Value placeholder={placeholderIcon} />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            // className={`${cssStyles.SelectContent} ${
            //   stylex.props(contentStyles.base).className
            // }`}
            {...stylex.props(contentStyles.base)}
          >
            <Select.Viewport {...stylex.props(viewportStyles.base)}>
              {items.map(({ text, value, icon }) => (
                <IconSelectItem
                  key={value}
                  icon={<>{icon}</>}
                  text={text}
                  value={value}
                />
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};
export default IconSelect;

type IconSelectItemProps = IconItem & Select.SelectItemProps;
const IconSelectItem = ({
  icon,
  text,
  value,
  disabled,
}: IconSelectItemProps) => {
  return (
    <Select.Item
      value={value}
      className={`${cssStyles.SelectItem} ${
        stylex.props(selectItemStyles.base).className
      }`}
      disabled={disabled}
    >
      <Select.ItemText>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </div>
      </Select.ItemText>
      <p style={{ margin: 0 }}>{text}</p>
    </Select.Item>
  );
};

/** Styles */

const triggerStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    // borderRadius: '24px',
    padding: '0 15px',
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: 1,
    height: '48px',
    width: '48px',
    gap: '5px',
    borderStyle: 'none',
    outline: 'none',
    boxShadow: {
      default: 'none',
      ':focus-visible': `inset 0 0 0 1px ${colors.primaryVariant900}`,
    },
    backgroundColor: {
      default: colors.bgNormal,
      ':hover': colors.bgStrong,
    },
    color: colors.textNormal,
  },
});

const contentStyles = stylex.create({
  base: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow:
      '0px 10px 38px -10px rgba(22, 23, 24, 0.35),0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    padding: '5px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

const viewportStyles = stylex.create({
  base: {
    display: 'flex',
    gap: '8px',
    alignItems: 'stretch',
  },
});

const selectItemStyles = stylex.create({
  base: {
    fontSize: '16px',
    lineHeight: 1,
    color: colors.textNormal,
    fontWeight: '600',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    // height: '25px',
    padding: '8px',
    // padding: '0 6px 0 6px',
    // padding: '0 35px 0 25px',
    position: 'relative',
    userSelect: 'none',
    width: 'auto',
    // height: 'auto',
    flexGrow: '1',
  },
});
