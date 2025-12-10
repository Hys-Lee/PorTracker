import type { Metadata } from 'next';
import './globals.css';
import { suite } from './fonts';
import { fonts } from '@core/tokens/fonts.stylex';
import * as stylex from '@stylexjs/stylex';

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
      <body className={suite.variable} {...stylex.props(bodyStyles.font)}>
        {children}
        {/* <script type="module" src="/src/main.tsx"></script> */}
      </body>
    </html>
  );
}

const bodyStyles = stylex.create({
  font: {
    fontFamily: fonts.suite,
  },
});
