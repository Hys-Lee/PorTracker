import { ReactNode } from 'react';
import { fonts } from '../../tokens/fonts.stylex';
import '../../tokens/colors.css';
import './../globals.css';

import { suite } from '../fonts';
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        // className={`${suite.variable}`}
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f8fafa',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          //   paddingTop: '20%',
          alignItems: 'center',
          // fontFamily: fonts.suite,
        }}
      >
        {children}
      </div>
    </>
  );
}
