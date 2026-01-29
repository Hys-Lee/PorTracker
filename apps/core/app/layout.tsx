import type { Metadata } from 'next';
import '../tokens/colors.css';
import './globals.css';
import { suite } from './fonts';
import { fonts } from '../tokens/fonts.stylex';
import * as stylex from '@stylexjs/stylex';
import BreadCrumb from './_components/Breadcrumb';
import { colors } from '@core/tokens/colors.stylex';
import Navbar from './_components/Navbar';
import Link from 'next/link';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import TanstackQueryProvider from '@core/libs/tanstack-query/TanstackQueryProvider';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/src/styles.css" /> */}
      </head>
      <body
        className={suite.variable}
        {...stylex.props(bodyStyles.font, bodyStyles.base)}
      >
        {/** Antd Next App Router에서 작동하도록 */}
        <AntdRegistry>
          <div {...stylex.props(bodyStyles.innerBase)}>
            <header {...stylex.props(headerStyles.base)}>
              <div {...stylex.props(headerStyles.leftPart)}>
                <Link href={'/'} {...stylex.props(headerStyles.logo)}>
                  MyFancyLogo
                </Link>

                <BreadCrumb />
              </div>
              <Navbar />
            </header>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
            {/* <script type="module" src="/src/main.tsx"></script> */}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}

const bodyStyles = stylex.create({
  base: {
    display: 'flex',
    justifyContent: 'center',
  },
  font: {
    fontFamily: fonts.suite,
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
