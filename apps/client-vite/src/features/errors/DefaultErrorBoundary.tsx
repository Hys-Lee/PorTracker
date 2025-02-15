import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import DefaultErrorSection from './ui/sections/DefaultErrorSection';

interface ErrorProps {
  children: ReactNode;
}

const DefaultErrorBoundary = ({ children }: ErrorProps) => {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <DefaultErrorSection
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        )}
      >
        {children}
      </ErrorBoundary>
    </>
  );
};
export default DefaultErrorBoundary;
