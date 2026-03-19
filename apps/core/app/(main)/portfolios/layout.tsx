import { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import PortfolioTypeSwitch from './_components/PortfolioTypeSwitch';

interface PortfoliosLayoutProps {
  children: ReactNode;
  type: ReactNode;
}

export default function PortfoliosLayout({
  children,
  type,
}: PortfoliosLayoutProps) {
  return (
    <>
      <div {...stylex.props(layoutStyles.wrapper)}>
        <PortfolioTypeSwitch />
        {type}
        {/* <div>구분</div>
        {children} */}
      </div>
    </>
  );
}

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
});
