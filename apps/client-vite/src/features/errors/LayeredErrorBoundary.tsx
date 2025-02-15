import { ReactNode } from 'react';
import DefaultErrorBoundary from './DefaultErrorBoundary';
import NetworkErrorBoundary from './NetworkErrorBoundary';

interface LayeredErrorBoundaryProps {
  children: ReactNode;
}

const LayeredErrorBoundary = ({ children }: LayeredErrorBoundaryProps) => {
  return (
    <>
      <DefaultErrorBoundary>
        <NetworkErrorBoundary>{children}</NetworkErrorBoundary>
      </DefaultErrorBoundary>
    </>
  );
};

export default LayeredErrorBoundary;
