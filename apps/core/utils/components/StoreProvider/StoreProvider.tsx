'use client';

import { createStore, Provider } from 'jotai';
import { ComponentProps, ReactNode, useMemo } from 'react';

interface StoreProviderProps {
  children: ReactNode;
  store?: ComponentProps<typeof Provider>['store'];
}

const StoreProvider = ({ children, store }: StoreProviderProps) => {
  const memoizedStore = useMemo(() => store ?? createStore(), []);
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default StoreProvider;
