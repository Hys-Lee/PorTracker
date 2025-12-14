import { Select, DropdownMenu, ScrollArea } from 'radix-ui';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import cssStyles from './Dropdown.module.css';
import { colors } from '../../../../tokens/colors.stylex';
import { useStateReducer } from '@core/hooks/utils/useStateReducer.ts/useStateReducer';
import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useSubmitIntercept } from '@core/hooks/utils/useSubmitIntercept/useSubmitIntercept';

export interface DropdownItem {
  text: string;
  value: string;
}

type Selected = Map<DropdownItem['value'], DropdownItem>;
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

interface Dropdown extends DropdownMenu.DropdownMenuProps {
  multi: boolean;
  items: DropdownItem[];
  triggerStylex?: stylex.StyleXStyles;
  selectedText?: ReactNode;
  placeholder?: ReactNode;
  /** 비제어 방식, form을 위해 */
  name?: string;
  form?: string;
  required?: boolean;
  disabled?: boolean;
  /** 제어 방식 */
  value?: DropdownItem[];
  onValueChange?: (value: DropdownItem[]) => void;
}

const Dropdown = ({
  multi,
  items,
  triggerStylex,
  selectedText,
  placeholder,
  name,
  form,
  required,
  disabled,
  value,
  onValueChange,
}: Dropdown) => {
  const [selected, setSelected] = useStateReducer<Selected>(
    new Map(),
    (_, nextState) => {
      if (onValueChange) {
        const nextStateIterable = nextState.values();
        onValueChange([...nextStateIterable]);
      }
      return nextState;
    }
  );
  const handleSelected = (multi: boolean, dropdownItem: DropdownItem) =>
    // : Selected
    {
      // let newSelected = null;
      if (multi) {
        setSelected((prev) => {
          const newSelected = new Map(prev);
          if (newSelected.has(dropdownItem.value)) {
            newSelected.delete(dropdownItem.value);
          } else {
            newSelected.set(dropdownItem.value, dropdownItem);
          }
          return newSelected;
        });
      } else {
        setSelected(() => {
          const newSelected = new Map();
          newSelected.set(dropdownItem.value, dropdownItem);
          return newSelected;
        });
      }
      // return newSelected;
    };

  // 비제어 form의 submit이벤트에 반응하기
  const inputRef = useSubmitIntercept((inputElement) => {
    inputElement.value = [...selected].join(',');
  }, form);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={`${cssStyles.SelectTrigger} ${
            stylex.props(triggerStyles.base, triggerStylex).className
          } `}
        >
          {selected.size === 0
            ? placeholder
            : selectedText ||
              [...selected.values()].map(({ text }) => text).join(',')}
        </DropdownMenu.Trigger>
        {value ? undefined : (
          <input
            ref={inputRef}
            type="hidden"
            name={name}
            form={form}
            required={required}
            disabled={disabled}
          />
        )}
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`${cssStyles.DropdownMenuContent} ${
              stylex.props(contentStyles.base).className
            }`}
          >
            {/** // 스크롤 영역 */}

            <ScrollArea.Root {...stylex.props(scrollRootStyles.base)}>
              {multi ? (
                <>
                  <ScrollArea.Viewport
                    {...stylex.props(scrollViewportStyles.base)}
                  >
                    {/** Multi Select */}

                    {items.map((dropdownItem) => (
                      <DropdownMenu.CheckboxItem
                        className={`${cssStyles.SelectItem}
                       ${stylex.props(selectItemStyles.base).className}
                      `}
                        key={dropdownItem.value}
                        checked={selected.has(dropdownItem.value)}
                        onCheckedChange={() => {
                          handleSelected(multi, dropdownItem);
                        }}
                      >
                        {dropdownItem.text}
                      </DropdownMenu.CheckboxItem>
                    ))}
                  </ScrollArea.Viewport>
                </>
              ) : (
                <>
                  <DropdownMenu.RadioGroup
                    {...stylex.props(radioGroupStyles.base)}
                    value={value ? value?.[0]?.value : [...selected.keys()][0]}
                  >
                    {/** Single Select */}

                    <ScrollArea.Viewport
                      {...stylex.props(scrollViewportStyles.base)}
                    >
                      {items.map((dropdownItem) => (
                        <DropdownMenu.RadioItem
                          className={`${cssStyles.SelectItem} ${
                            stylex.props(selectItemStyles.base).className
                          }`}
                          key={dropdownItem.value}
                          value={dropdownItem.value}
                          onSelect={useCallback(() => {
                            handleSelected(false, dropdownItem);
                            if (onValueChange) onValueChange([dropdownItem]);
                          }, [handleSelected, onValueChange])}
                        >
                          {dropdownItem.text}
                        </DropdownMenu.RadioItem>
                      ))}
                    </ScrollArea.Viewport>
                  </DropdownMenu.RadioGroup>
                </>
              )}

              <ScrollArea.ScrollAreaScrollbar
                {...stylex.props(scrollBarStyles.base)}
              >
                <ScrollArea.Thumb {...stylex.props(scrollThumbStyles.base)} />
              </ScrollArea.ScrollAreaScrollbar>
            </ScrollArea.Root>

            {/** 스크롤 영역 // */}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};
export default Dropdown;

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

const contentStyles = stylex.create({
  base: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow:
      '0px 10px 38px -10px rgba(22, 23, 24, 0.35),0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    // padding: '5px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
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
    padding: '0 4px 0 4px',
    // padding: '0 35px 0 25px',
    position: 'relative',
    userSelect: 'none',
    // width: '100px',
    flexGrow: 1,
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

const radioGroupStyles = stylex.create({
  base: {
    height: '100%',
    width: '100%',
  },
});

/** Scorll Area */

const scrollRootStyles = stylex.create({
  base: {
    padding: '4px',
    overflow: 'hidden',
  },
});

const scrollViewportStyles = stylex.create({
  base: {
    width: '100%',
    maxHeight: '300px',
    borderRadius: 'inherit',
  },
});

const scrollBarStyles = stylex.create({
  base: {
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
});

const scrollThumbStyles = stylex.create({
  base: {
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
});

/**
 * Radix Primitive - Select 기반이었던 Legacy
 */
// interface ItemDropdownProps extends Select.SelectProps {
//   items: DropdownItem[];
//   placeholder?: string;
//   selectedText?: ReactNode;
//   triggerStylex?: stylex.StyleXStyles;
// }

// const Dropdown = ({
//   items,
//   placeholder,
//   selectedText,
//   value,
//   defaultValue,
//   onValueChange,
//   triggerStylex,
//   ...props
// }: ItemDropdownProps) => {
//   return (
//     <>
//       <Select.Root
//         defaultValue={defaultValue}
//         value={value}
//         onValueChange={onValueChange}
//       >
//         <Select.Trigger
//           className={`${cssStyles.SelectTrigger} ${
//             stylex.props(triggerStyles.base, triggerStylex).className
//           } `}
//         >
//           {selectedText || <Select.Value placeholder={placeholder} />}

//           <Select.Icon {...stylex.props(iconStyles.base)}>
//             <ChevronDownIcon />
//           </Select.Icon>
//         </Select.Trigger>
//         <Select.Portal>
//           <Select.Content
//             position="popper"
//             className={`${cssStyles.SelectContent} ${
//               stylex.props(contentStyles.base).className
//             }`}
//           >
//             <Select.ScrollUpButton
//               {...stylex.props(selectScrollButtonStyles.base)}
//             >
//               <ChevronUpIcon />
//             </Select.ScrollUpButton>
//             <Select.Viewport {...stylex.props(viewportStyles.base)}>
//               {items.map(({ text, value }) => (
//                 <DropdownItem key={value} text={text} value={value} />
//               ))}
//             </Select.Viewport>
//             <Select.ScrollDownButton
//               {...stylex.props(selectScrollButtonStyles.base)}
//             >
//               <ChevronDownIcon />
//             </Select.ScrollDownButton>
//           </Select.Content>
//         </Select.Portal>
//       </Select.Root>
//     </>
//   );
// };
// export default Dropdown;

// type DropdownItemProps = DropdownItem & Select.SelectItemProps;
// const DropdownItem = ({ text, value, disabled }: DropdownItemProps) => {
//   return (
//     <>
//       <Select.Item
//         className={`${cssStyles.SelectItem} ${
//           stylex.props(selectItemStyles.base).className
//         }`}
//         value={value}
//       >
//         <Select.ItemText>{text}</Select.ItemText>
//       </Select.Item>
//     </>
//   );
// };

//// style legacy

// const viewportStyles = stylex.create({
//   base: {
//     // padding: '5px',
//     // padding: '5px',
//     // display: 'flex',
//     // flexDirection: 'column',
//     // alignItems: 'center',
//     paddingLeft: '5px',
//     paddingRight: '5px',
//   },
// });
// const selectItemIndicator = stylex.create({
//   base: {
//     position: 'relative',
//     width: '100%',
//     height: '50%',

//     // padding: '0 10px',
//     // display: 'inline-flex',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     /** */
//     // borderStyle: 'solid',
//     // borderWidth: '2px',
//     // borderColor: colors.primary,
//   },
// });
// const selectScrollButtonStyles = stylex.create({
//   base: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '25px',
//     backgroundColor: 'white',
//     color: colors.primary,
//     cursor: 'default',
//   },
// });
