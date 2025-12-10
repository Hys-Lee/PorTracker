import { useCallback, useState, SetStateAction } from 'react';

/**
 *
 * @param initState : 초기 상태
 * @param externalUpdater : 외부에서 개입 가능한 updater. 반환값이 다음 상태가 됨
 * @returns : useState의 것과 같다.
 */

const useStateReducer = <T>(
  initState: T,
  externalUpdater?: (prevState: T, nextState: T) => T
) => {
  const [state, setState] = useState(initState);
  const finalUpdater = useCallback(
    (internalNewState: SetStateAction<T>) => {
      if (externalUpdater)
        setState((prevState) =>
          externalUpdater(
            prevState,
            typeof internalNewState === 'function'
              ? (internalNewState as (prevState: T) => T)(prevState)
              : internalNewState
          )
        );
      else {
        setState(internalNewState);
      }
    },
    [externalUpdater]
  );
  return [state, finalUpdater] as const;
};

export { useStateReducer };
