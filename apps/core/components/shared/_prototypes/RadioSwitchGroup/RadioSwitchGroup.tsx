import { ToggleGroup } from 'radix-ui';
import { PointerEvent } from 'react';

const radixToggleStateName = 'state';

const preventRadixToggleDeselect = (e: PointerEvent) => {
  const element = e.target as HTMLElement;

  const isOn = element.dataset[radixToggleStateName] === 'on';
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
      onPointerDown={(pointerEvent) => {
        preventRadixToggleDeselect(pointerEvent);
        props.onPointerDown && props.onPointerDown(pointerEvent);
      }}
    />
  );
};

const RadioSwitchGroup = Object.assign(
  {},
  { Root: SingleSelectRoot, Item: NonDeselectableItem }
);

export default RadioSwitchGroup;
