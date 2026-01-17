'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as stylex from '@stylexjs/stylex';
import { colors } from '@core/tokens/colors.stylex';

const navPage = ['flows', 'portfolios', 'memos'] as const;

const Navbar = () => {
  const pathname = usePathname();
  const pathSemgents = pathname.split('/').filter((data) => data !== '');
  //test
  console.log('pathSegments: ', pathSemgents);
  const majorPathName =
    pathSemgents.length > 0 &&
    navPage.includes(pathSemgents[0] as (typeof navPage)[number])
      ? (pathSemgents[0] as (typeof navPage)[number])
      : '';
  return (
    <>
      <div {...stylex.props(navWrapperStyles.base)}>
        {navPage.map((navPageName) => {
          const text = `${navPageName[0].toUpperCase()}${navPageName.slice(1)}`;
          console.log(
            'navtext,majorPathName , navPageName : ',
            text,
            majorPathName,
            navPageName
          );
          return (
            <Link
              key={navPageName}
              href={`/${navPageName}`}
              {...stylex.props(
                navStyles.base,
                majorPathName === navPageName
                  ? navStyles.active
                  : navStyles.inactive
              )}
            >
              {text}
            </Link>
          );
        })}
        <div>마이페이지 관련</div>
        {/* <Link href={'/flows'}>{'Flows'}</Link>
        <Link href={'/portfolios'}>{'Portfolios'}</Link>
        <Link href={'/memos'}>{'Memos'}</Link> */}
      </div>
    </>
  );
};
export default Navbar;

const navStyles = stylex.create({
  base: {
    fontSize: '16px',
    fontWeight: '400',
    textDecoration: 'none',
  },
  inactive: {
    color: colors.textNormal,
  },
  active: {
    // color: colors.textPrimary,
    color: colors.primary,
    fontWeight: '600',
  },
});
const navWrapperStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
});
