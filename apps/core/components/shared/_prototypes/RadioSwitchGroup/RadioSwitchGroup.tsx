import { ToggleGroup } from 'radix-ui';
import { MouseEvent, PointerEvent } from 'react';

const radixToggleStateName = 'state';

const preventRadixToggleDeselect = (e: MouseEvent) => {
  const element = e.currentTarget as HTMLElement;

  const isOn = element.dataset.state === 'on';
  if (isOn) {
    e.preventDefault();
  }
};

// const RadioSwitchGroup = () => {
//   return (
//     <>
//       <ToggleGroup.Root type="multiple">{}</ToggleGroup.Root>
//     </>
//   );
// };

// export default RadioSwitchGroup;

const SingleSelectRoot = ({
  ...props
}: Omit<ToggleGroup.ToggleGroupSingleProps, 'type'>) => {
  return (
    <ToggleGroup.Root type="single" {...props}>
      {props.children}
    </ToggleGroup.Root>
  );
};

const NonDeselectableItem = ({
  ...props
}: ToggleGroup.ToggleGroupItemProps) => {
  return (
    <ToggleGroup.Item
      {...props}
      onClick={(pointerEvent) => {
        preventRadixToggleDeselect(pointerEvent);
        props.onClick && props.onClick(pointerEvent);
      }}
    />
  );
};

const RadioSwitchGroup = Object.assign(
  {},
  { Root: SingleSelectRoot, Item: NonDeselectableItem }
);

export default RadioSwitchGroup;
