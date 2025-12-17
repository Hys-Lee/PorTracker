import { ReactNode } from 'react';
import RadioSwitchGroup from '../../_prototypes/RadioSwitchGroup/RadioSwitchGroup';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import cssStyles from './Switch.module.css';

type Selected = { value: string; text: ReactNode };

interface SwitchProps {
  items: [Selected, Selected];
  selected?: Selected;
  defaultSelected?: Selected;
  onChange?: (selected: Selected) => void;
  name?: string;
  form?: string;
  disabled?: boolean;
  // required는 직접 구현해야함...
}
const Switch = ({
  items,
  selected,
  defaultSelected,
  onChange,
  name,
  form,
  disabled,
}: SwitchProps) => {
  return (
    <>
      <RadioSwitchGroup.Root
        value={selected?.value}
        defaultValue={defaultSelected?.value || items[0].value}
        onValueChange={
          onChange
            ? (value) => {
                const target = items.find(
                  ({ value: itemValue }) => value === itemValue
                );
                if (target) {
                  onChange(target);
                }
              }
            : undefined
        }
        className={`${cssStyles.root} ${
          stylex.props(rootStyles.base).className
        }`}
        // {...stylex.props(rootStyles.base)}
      >
        <div className={cssStyles.thumb} />
        {items.map((item, idx) => (
          <RadioSwitchGroup.Item
            className={`${cssStyles.ToggleGroupItem} ${
              stylex.props(itemStyles.base).className
            }`}
            key={item.value}
            value={item.value}
            name={name}
            form={form}
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
  },
});

const itemStyles = stylex.create({
  base: {
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
