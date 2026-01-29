'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './getQueryClient';
import { ReactNode } from 'react';

const TanstackQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryCilent = getQueryClient();
  return (
    <>
      <QueryClientProvider client={queryCilent}>{children}</QueryClientProvider>
    </>
  );
};
export default TanstackQueryProvider;
