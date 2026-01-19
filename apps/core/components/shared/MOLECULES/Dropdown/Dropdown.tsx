import { DropdownMenu, ScrollArea } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import cssStyles from './Dropdown.module.css';
import { colors } from '../../../../tokens/colors.stylex';
import { useStateReducer } from '@core/utils/hooks/useStateReducer.ts/useStateReducer';
import { ReactNode } from 'react';
import { useSubmitIntercept } from '@core/utils/hooks/useSubmitIntercept/useSubmitIntercept';

import Virtualizer from '@core/utils/components/Virtualizer/Virtualzier';
import { inputBase } from '@core/styles/input.stylex';

export interface DropdownItem<T extends string> {
  text: string;
  value: T;
}

type Selected<T extends string> = Map<
  DropdownItem<T>['value'],
  DropdownItem<T>
>;
/**
 *
 * ### 설명
 *
 * 비제어 방식 사용을 위해 name등을 활용할 수도 있음.
 *
 * triggerStyleX를 통해 외부 박스 스타일 주입 가능
 */

interface Dropdown<T extends string> extends DropdownMenu.DropdownMenuProps {
  multi: boolean;
  items: DropdownItem<T>[];
  triggerStylex?: stylex.StyleXStyles;
  selectedText?: ReactNode;
  placeholder?: ReactNode;
  defaultValue?: DropdownItem<T>[];
  /** 비제어 방식, form을 위해 */
  name?: string;
  form?: string;
  required?: boolean;
  disabled?: boolean;
  /** 제어 방식 */
  value?: DropdownItem<T>[];
  onValueChange?: (value: DropdownItem<T>[]) => void;
  icon?: boolean;
}

const Dropdown = <T extends string>({
  multi,
  items,
  triggerStylex,
  selectedText,
  placeholder,
  defaultValue,
  name,
  form,
  required,
  disabled,
  value,
  onValueChange,
  icon = false,
}: Dropdown<T>) => {
  const [selected, setSelected] = useStateReducer<Selected<T>>(
    initializer(defaultValue),
    (_, nextState) => {
      if (onValueChange) {
        const nextStateIterable = nextState.values();
        onValueChange([...nextStateIterable]);
      }
      return nextState;
    }
  );
  const handleSelected = (multi: boolean, dropdownItem: DropdownItem<T>) =>
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
        setSelected((prev) => {
          const newSelected = new Map();
          if (prev.has(dropdownItem.value)) return newSelected;
          newSelected.set(dropdownItem.value, dropdownItem);
          return newSelected;
        });
      }
      // return newSelected;
    };

  // 비제어 form의 submit이벤트에 반응하기
  const inputRef = useSubmitIntercept((inputElement) => {
    // inputElement.value = [...selected.values()].join(',');
    inputElement.value = JSON.stringify([...selected.values()]);
  }, form);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={`${cssStyles.DropdownMenuTrigger} ${
            stylex.props(inputBase.base, triggerStylex).className
          } `}
        >
          {selected.size === 0
            ? placeholder
            : selectedText || (
                <p
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {[...selected.values()].map(({ text }) => text).join(',')}
                </p>
              )}
          {icon && (
            <ChevronDownIcon style={{ position: 'absolute', right: '12px' }} />
          )}
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
              <Virtualizer
                Container={
                  <ScrollArea.Viewport
                    {...stylex.props(scrollViewportStyles.base)}
                    // ref={setContainerElement}
                  />
                  //   {multi ? undefined : (
                  //     <DropdownMenu.RadioGroup
                  //       {...stylex.props(radioGroupStyles.base)}
                  //       value={
                  //         value ? value?.[0]?.value : [...selected.keys()][0]
                  //       }
                  //     />
                  //   )}
                  // </ScrollArea.Viewport>
                }
                getKey={(itemInfo) => itemInfo.value}
                estimateSize={24}
                itemsInfo={items}
                renderItem={(itemInfo) => (
                  <>
                    <DropdownMenu.CheckboxItem
                      className={`${cssStyles.SelectItem} ${
                        stylex.props(selectItemStyles.base).className
                      }`}
                      checked={selected.has(itemInfo.value)}
                      onCheckedChange={(checked) => {
                        handleSelected(multi, itemInfo);
                        if (onValueChange)
                          onValueChange(checked ? [itemInfo] : []); // unchecked => []
                      }}
                    >
                      {itemInfo.text}
                    </DropdownMenu.CheckboxItem>
                    {/* {multi ? (
                      <DropdownMenu.CheckboxItem
                        className={`${cssStyles.SelectItem} ${
                          stylex.props(selectItemStyles.base).className
                        }`}
                        checked={selected.has(itemInfo.value)}
                        onCheckedChange={() => {
                          handleSelected(multi, itemInfo);
                          if (onValueChange) onValueChange([itemInfo]);
                        }}
                      >
                        {itemInfo.text}
                      </DropdownMenu.CheckboxItem>
                    ) : (
                      <DropdownMenu.RadioItem
                        className={`${cssStyles.SelectItem} ${
                          stylex.props(selectItemStyles.base).className
                        }`}
                        value={itemInfo.value}
                        onSelect={() => {
                          handleSelected(false, itemInfo);
                          if (onValueChange) onValueChange([itemInfo]);
                        }}
                      >
                        {itemInfo.text}
                      </DropdownMenu.RadioItem>
                    )} */}
                  </>
                )}
              />

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

const initializer = <T extends string>(
  defaultValue?: DropdownItem<T>[]
): Selected<T> => {
  if (!defaultValue) return new Map();

  const init: Selected<T> = new Map();
  defaultValue.forEach(({ text, value }) => {
    init.set(value, { text, value });
  });

  return init;
};

// 만약 Item이라고 renderProps를 대비해 외부에 변수로 저장시킨다면, Dropdown내 변수를 사용할 수 없어짐. 컨텍스트를 잃게 됨. -> useContext쓰지도 못할 것 같은데. 컴포넌트나 훅이 아니라.

/** Styles */

// const triggerStyles = stylex.create({
//   base: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '12px',
//     // borderRadius: '24px',
//     padding: '0 15px',
//     fontSize: '16px',
//     fontWeight: '600',
//     lineHeight: 1,
//     height: '48px',
//     width: '300px',
//     gap: '5px',
//     borderStyle: 'none',
//     outline: 'none',
//     boxShadow: {
//       default: 'none',
//       ':focus-visible': `inset 0 0 0 1px ${colors.primaryVariant900}`,
//     },
//     backgroundColor: {
//       default: colors.bgNormal,
//       ':hover': colors.bgStrong,
//     },
//     color: colors.textNormal,
//   },
// });

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
    height: '24px',
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
    // height: '300px',
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
