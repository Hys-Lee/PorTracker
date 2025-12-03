import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseRecalculatingStateProps<TState> {
  initState: TState;
  recalcConditioner: (state?: TState) => boolean;
  dependentRecalculator: (originState: TState) => TState;
}
/**
 *
 * @param dependentRecalculator 재계산 시키는 useEffect의 deps에 들어감. 안정화는 사용자 맘대로
 * @returns
 */
const useRecalculatableState = <TState>({
  initState,
  recalcConditioner,
  dependentRecalculator,
}: UseRecalculatingStateProps<TState>) => {
  const [state, setState] = useState<TState>(initState);
  const recalcCondition = recalcConditioner(state);
  //   const stableRecalculator = useCallback(recalculator, []);

  useEffect(() => {
    if (recalcCondition) {
      setState((prev) => dependentRecalculator(prev));
    }
  }, [recalcCondition, dependentRecalculator]);

  return [state, setState];
};
export default useRecalculatableState;
