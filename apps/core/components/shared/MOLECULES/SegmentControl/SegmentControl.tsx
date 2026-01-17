import { ReactNode } from 'react';
import RadioSwitchGroup from '../../_prototypes/RadioSwitchGroup/RadioSwitchGroup';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import cssStyles from './SegmentControl.module.css';

type ItemInfo = {
  value: string;
  text: ReactNode;
};

interface SegmentControlProps {
  items: ItemInfo[];
  selected?: ItemInfo;
  defaultSelected?: ItemInfo;
  onChange?: (selected: ItemInfo) => void;
  name?: string;
  form?: string;
  disabled?: boolean;
  rootStylex?: stylex.StyleXStyles;
  itemStylex?: stylex.StyleXStyles;
}

const SegmentControl = ({
  items,
  selected,
  defaultSelected,
  onChange,
  name,
  form,
  disabled,
  rootStylex,
  itemStylex,
}: SegmentControlProps) => {
  return (
    <>
      <RadioSwitchGroup.Root
        className={`${stylex.props(rootStyles.base, rootStylex).className}`}
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
      >
        {items.map((item) => (
          <RadioSwitchGroup.Item
            className={`${cssStyles.ToggleGroupItem} ${
              stylex.props(itemStyles.base, itemStylex).className
            }`}
            key={item.value}
            value={item.value}
            name={name}
            form={form}
            disabled={disabled}
          >
            {item.text}
          </RadioSwitchGroup.Item>
        ))}
      </RadioSwitchGroup.Root>
    </>
  );
};

export default SegmentControl;

const rootStyles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    backgroundColor: colors.bgNormal,
    borderRadius: '12px',
    height: '36px',
    minWidth: '300px',
    padding: '4px',
  },
});

const itemStyles = stylex.create({
  base: {
    flexGrow: 1,
    borderStyle: 'none',
    // borderWidth: '0px',
    backgroundColor: colors.bgNormal,
    borderRadius: '12px',
    // fontSize: '12px',
    fontWeight: '600',
    color: colors.textNormal,
  },
});
