import { Select } from 'radix-ui';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import cssStyles from './Dropdown.module.css';
import { colors } from '../../../../tokens/colors.stylex';
import { useStateReducer } from '@core/hooks/useStateReducer.ts/useStateReducer';

export interface DropdownItem {
  text: string;
  value: string;
}

interface ItemDropdownProps extends Select.SelectProps {
  items: DropdownItem[];
  placeholder?: string;
  selectedText?: string;
  triggerStylex?: stylex.StyleXStyles;
}

/**
 *
 * @param value : 제어 방식이더라도 value가 ''라면 placeholder사용 가능
 *
 * <br/>
 *
 * ### 설명
 *
 * 비제어 방식 사용을 위해 name등을 활용할 수도 있음.
 *
 * triggerStyleX를 통해 외부 박스 스타일 주입 가능
 */
const Dropdown = ({
  items,
  placeholder,
  selectedText,
  value,
  defaultValue,
  onValueChange,
  triggerStylex,
  ...props
}: ItemDropdownProps) => {
  return (
    <>
      <Select.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        <Select.Trigger
          className={`${cssStyles.SelectTrigger} ${
            stylex.props(triggerStyles.base, triggerStylex).className
          } `}
        >
          {selectedText || <Select.Value placeholder={placeholder} />}

          <Select.Icon {...stylex.props(iconStyles.base)}>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            className={`${cssStyles.SelectContent} ${
              stylex.props(contentStyles.base).className
            }`}
          >
            <Select.ScrollUpButton
              {...stylex.props(selectScrollButtonStyles.base)}
            >
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport {...stylex.props(viewportStyles.base)}>
              {items.map(({ text, value }) => (
                <DropdownItem key={value} text={text} value={value} />
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton
              {...stylex.props(selectScrollButtonStyles.base)}
            >
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};
export default Dropdown;

type DropdownItemProps = DropdownItem & Select.SelectItemProps;
const DropdownItem = ({ text, value, disabled }: DropdownItemProps) => {
  return (
    <>
      <Select.Item
        className={`${cssStyles.SelectItem} ${
          stylex.props(selectItemStyles.base).className
        }`}
        value={value}
      >
        <Select.ItemText>{text}</Select.ItemText>
      </Select.Item>
    </>
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
    fontWeight: '600',
    lineHeight: 1,
    height: '48px',
    width: '300px',
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

const iconStyles = stylex.create({
  base: {
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
    // padding: '5px',
    // padding: '5px',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    paddingLeft: '5px',
    paddingRight: '5px',
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
    justifyContent: 'start',
    alignItems: 'center',
    height: '25px',
    padding: '0 5px 0 5px',
    // padding: '0 35px 0 25px',
    position: 'relative',
    userSelect: 'none',
    width: '100%',
  },
});
/**
 * 
 .SelectItem[data-disabled] {
	color: var(--mauve-8);
	pointer-events: none;
}
.SelectItem[data-highlighted] {
	outline: none;
	background-color: var(--violet-9);
	color: var(--violet-1);
}

 */

const selectItemIndicator = stylex.create({
  base: {
    position: 'relative',
    width: '100%',
    height: '50%',

    // padding: '0 10px',
    // display: 'inline-flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    /** */
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: colors.primary,
  },
});
const selectScrollButtonStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25px',
    backgroundColor: 'white',
    color: colors.primary,
    cursor: 'default',
  },
});
