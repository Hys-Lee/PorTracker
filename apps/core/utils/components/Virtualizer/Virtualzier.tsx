import { useVirtualizer } from '@tanstack/react-virtual';
import { DropdownMenu } from 'radix-ui';
import {
  useState,
  useEffect,
  HTMLAttributes,
  cloneElement,
  ReactNode,
  ReactElement,
  ComponentPropsWithoutRef,
  ElementType,
  Key,
  ComponentProps,
  ComponentType,
  FC,
  createElement,
  ComponentPropsWithRef,
} from 'react';

interface VirtualzierProps<ItemInfoT, IA extends ElementType> {
  Container: ReactElement<ComponentPropsWithoutRef<ElementType>>;
  itemsInfo: ItemInfoT[];
  ItemAs: IA; //({ eachItemInfo }: { eachItemInfo: ItemInfoT }) => ReactNode;
  itemProps: (eachItemInfo: ItemInfoT) => ComponentProps<IA>;
  estimateSize: number;
  getKey: (itemInfo: ItemInfoT) => Key;
}
/**
 *
 * @param Container : ref를 넘기면 덮어씌워지니, 넘기지 말 것.
 *
 */
const Virtualizer = <InfoT, IA extends ElementType>({
  Container,
  itemsInfo,
  estimateSize,
  ItemAs,
  itemProps,
  getKey,
}: VirtualzierProps<InfoT, IA>) => {
  // 가상화
  // const containerRef = useRef<HTMLDivElement>(null);
  const [containerElement, setContainerElement] =
    useState<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: itemsInfo.length,
    getScrollElement: () => containerElement,
    estimateSize: () => estimateSize,
  });
  useEffect(() => {
    console.log(
      '엥? v: ',
      itemsInfo.length,
      rowVirtualizer.getVirtualItems().length,
      containerElement
    );
  }, [containerElement]);
  return (
    <>
      {cloneElement(
        Container,
        { ref: setContainerElement },
        <>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const itemInfo = itemsInfo[virtualItem.index];

              const finalItemProps = itemProps(itemInfo);

              return (
                <div
                  key={getKey(itemInfo)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {/* <Item eachItemInfo={itemInfo} /> */}
                  {/* {createElement(ItemAs, finalItemProps)} */}
                  <ItemAs {...finalItemProps} />

                  {/* <DropdownMenu.RadioItem value="123">
                    TestTest
                  </DropdownMenu.RadioItem> */}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Virtualizer;
