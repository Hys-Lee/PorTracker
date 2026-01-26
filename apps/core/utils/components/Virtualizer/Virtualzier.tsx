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

interface VirtualzierProps<ItemInfoT> {
  Container: ReactElement<ComponentPropsWithoutRef<ElementType>>;
  itemsInfo: ItemInfoT[];
  renderItem: (eachItemInfo: ItemInfoT, itemIdx?: number) => ReactNode;
  estimateSize: number;
  getKey: (itemInfo: ItemInfoT) => Key;
}
/**
 *
 * @param Container : ref를 넘기면 덮어씌워지니, 넘기지 말 것.
 *
 */
const Virtualizer = <InfoT,>({
  Container,
  itemsInfo,
  estimateSize,
  renderItem,
  getKey,
}: VirtualzierProps<InfoT>) => {
  // 가상화
  // const containerRef = useRef<HTMLDivElement>(null);
  const [containerElement, setContainerElement] =
    useState<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: itemsInfo.length,
    getScrollElement: () => containerElement,
    estimateSize: () => estimateSize,
  });

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
                  {renderItem(itemInfo, virtualItem.index)}
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
