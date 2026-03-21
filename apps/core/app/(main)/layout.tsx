import type { Metadata } from 'next';
import '../../tokens/colors.css';
import '../globals.css';

import * as stylex from '@stylexjs/stylex';
import BreadCrumb from '../_components/Breadcrumb';
import { colors } from '@core/tokens/colors.stylex';
import Navbar from '../_components/Navbar';
import Link from 'next/link';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import TanstackQueryProvider from '@core/libs/tanstack-query/TanstackQueryProvider';
import { ReactNode } from 'react';
// import { fonts } from '../../tokens/fonts.stylex';
// import { suite } from '../fonts';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <
      // className={suite.variable}
    >
      {/** Antd Next App Router에서 작동하도록 */}
      <AntdRegistry>
        <div {...stylex.props(baseStyles.innerBase)}>
          <header {...stylex.props(headerStyles.base)}>
            <div {...stylex.props(headerStyles.leftPart)}>
              <Link href={'/'} {...stylex.props(headerStyles.logo)}>
                PorTracker
              </Link>

              <BreadCrumb />
            </div>
            <Navbar />
          </header>
          <div
            {...stylex.props(
              // baseStyles.font,
              baseStyles.base
            )}
          >
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </div>
          {/* <script type="module" src="/src/main.tsx"></script> */}
        </div>
      </AntdRegistry>
    </>
  );
}

const baseStyles = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
  },
  font: {
    // fontFamily: fonts.suite,
  },
  innerBase: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    padding: '20px',
    maxWidth: '1280px',
    width: '100%',
  },
});

const headerStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    margin: 0,
    fontWeight: '700',
    fontSize: '24px',
    color: colors.primary,
    textDecoration: 'none',
  },
  leftPart: {
    display: 'flex',
    alignItems: 'center',
  },
});
