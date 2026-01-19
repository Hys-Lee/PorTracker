import React, { ReactNode, useRef } from 'react';
import RadioSwitchGroup from '../../_prototypes/RadioSwitchGroup/RadioSwitchGroup';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import cssStyles from './Switch.module.css';
import { useStateReducer } from '@core/utils/hooks/useStateReducer.ts/useStateReducer';

export type SwitchSelected<T extends string> = { value: T; text: ReactNode };

interface SwitchProps<T extends string> {
  items: [SwitchSelected<T>, SwitchSelected<T>];
  selected?: SwitchSelected<T>;
  defaultSelected?: SwitchSelected<T>;
  onChange?: (selected: SwitchSelected<T>) => void;
  name?: string;
  form?: string;
  disabled?: boolean;
  // required는 직접 구현해야함...
  rootStylex?: stylex.StyleXStyles;
}
const Switch = <T extends string>({
  items,
  selected,
  defaultSelected,
  onChange,
  name,
  form,
  disabled,
  rootStylex,
}: SwitchProps<T>) => {
  // const [innerSelected, setInnerSelected] = useStateReducer(
  //   defaultSelected || items[0],
  //   (prev, next) => {
  //     onChange && onChange(next);
  //     return next;
  //   }
  // );
  // const hiddenRef = useRef<HTMLInputElement>(null);

  //test
  console.log('defaultSelected in Sewietch: ', defaultSelected);

  return (
    <>
      <RadioSwitchGroup.Root
        value={selected?.value}
        defaultValue={defaultSelected?.value || items[0].value}
        onValueChange={
          (value) => {
            const target = items.find(
              ({ value: itemValue }) => value === itemValue
            );
            if (target) {
              // setInnerSelected(target);
              onChange && onChange(target);

              // // 이벤트 버블링 (비제어 방식 대비)
              // if (hiddenRef.current) {
              //   hiddenRef.current.value = target.value;
              //   const inputEvent = new Event('input', { bubbles: true });
              //   hiddenRef.current?.dispatchEvent(inputEvent);
              // }
            }
          }
          // onChange
          //   ? (value) => {
          //       const target = items.find(
          //         ({ value: itemValue }) => value === itemValue
          //       );
          //       if (target) {
          //         onChange(target);
          //       }
          //     }
          //   : undefined
        }
        className={`${cssStyles.root} ${
          stylex.props(rootStyles.base, rootStylex).className
        }`}
        data-active-index={items.findIndex(
          (data) => data === selected || defaultSelected || items[0]
        )}
        // {...stylex.props(rootStyles.base)}
      >
        {selected ? undefined : (
          <input
            // ref={hiddenRef}
            type="hidden"
            name={name}
            form={form}
            // data-default={defaultSelected?.value || items[0].value}
            // value={innerSelected.value}
          />
        )}
        <div
          className={cssStyles.thumb}
          // data-position={items.findIndex(
          //   (data) => data === selected || defaultSelected || items[0]
          // )} // 0 or 1
          style={
            {
              '--offset': 1,
              // '--offset': items.findIndex(
              //   (data) => data === selected || defaultSelected || items[0]
              // ),
            } as React.CSSProperties
          }
        />
        {items.map((item, idx) => (
          <RadioSwitchGroup.Item
            className={`${cssStyles.ToggleGroupItem} ${
              stylex.props(itemStyles.base).className
            }`}
            key={item.value}
            value={item.value}
            // name={name}
            // form={form}
            disabled={disabled}
            // 애니메이션 위한 처리
            data-index={`${idx}`}
          >
            {item.text}
          </RadioSwitchGroup.Item>
        ))}
      </RadioSwitchGroup.Root>
    </>
  );
};

export default Switch;

const rootStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    backgroundColor: colors.bgNormal,
    borderRadius: '4px',
    isolation: 'isolate',
  },
});

const itemStyles = stylex.create({
  base: {
    // 테스트
    // mixBlendMode: 'difference',

    // 기존
    zIndex: 2,
    borderRadius: '4px',
    borderStyle: 'none',
    backgroundColor: {
      default: `rgb(from ${colors.bgNormal} r g b / 0)`,
      //   ':hover': `rgb(from ${colors.bgStrong} r g b / 0.5)`,
    },
    transition: 'blackground ease 0.2s',
    color: colors.textNormal,
    height: '28px',
    minWidth: '28px',
    display: 'flex',
    fontSize: '10px',
    lineHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
});

/** */
/* reset */
// button {
// 	all: unset;
// }

// .ToggleGroupItem[data-state="on"] {
// 	background-color: var(--violet-5);
// 	color: var(--violet-11);
// }
// .ToggleGroupItem:focus {
// 	position: relative;
// 	box-shadow: 0 0 0 2px black;
// }
