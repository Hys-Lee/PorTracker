import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import NetworkErrorSection from './ui/sections/NetworkErrorSection';

interface ErrorProps {
  children?: ReactNode;
}

const NetworkErrorBoundary = ({ children }: ErrorProps) => {
  // 대충 네트워크 에러가 아니면 throw하는 내용
  return (
    <>
      <ErrorBoundary
        fallbackRender={
          ({ error, resetErrorBoundary }) => (
            <NetworkErrorSection
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )
          //   ({ error, resetErrorBoundary }) => {
          //   if (routeError) {
          //     return <div>라우팅에러</div>;
          //   }

          //   switch (error) {
          //     case '야호':
          //       return null;
          //     Network:
          //       return <div className={ErrorNetworkStyle}>Error Page</div>;
          //   }
          // }
        }
      >
        {children}
      </ErrorBoundary>
    </>
  );
};
export default NetworkErrorBoundary;
