'use client';

import { usePathname } from 'next/navigation';
import { Separator } from 'radix-ui';

import * as stylex from '@stylexjs/stylex';
import { colors } from '@core/tokens/colors.stylex';
import Link from 'next/link';

const BreadCrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((data) => data !== '');
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          paddingLeft: '16px',
        }}
      >
        {segments.length > 2 ? (
          <>
            <Bread
              key={'start'}
              pageName={segments[0]}
              isBegin
              href={`/${segments[0]}`}
            />
            {/* <div {...stylex.props(breadStyles.text)}>{'...'}</div> */}
            <Bread key={'middle'} pageName={'...'} />
            <Bread
              key={'end'}
              pageName={segments[segments.length - 1]}
              href={`/${segments.join('/')}`}
            />
          </>
        ) : (
          segments.map((pageName, idx) => (
            <>
              <Bread
                key={pageName}
                pageName={pageName}
                isBegin={idx === 0}
                href={`/${segments.join('/')}`}
              />
            </>
          ))
        )}
      </div>
    </>
  );
};

export default BreadCrumb;

const Bread = ({
  pageName,
  isBegin = false,
  href,
}: {
  pageName: string;
  isBegin?: boolean;
  href?: string;
}) => {
  const pageText = `${pageName[0].toUpperCase()}${pageName.slice(1)}`;
  return (
    <>
      <div {...stylex.props(breadStyles.wrapper)}>
        {isBegin ? (
          <Separator.Root
            orientation="vertical"
            {...stylex.props(breadStyles.seperator)}
          />
        ) : (
          <p {...stylex.props(breadStyles.text, breadStyles.omitText)}>{'/'}</p>
        )}
        {href ? (
          <Link href={href} {...stylex.props(breadStyles.text)}>
            {pageText}
          </Link>
        ) : (
          <p {...stylex.props(breadStyles.text, breadStyles.omitText)}>
            {pageText}
          </p>
        )}
      </div>
    </>
  );
};

const breadStyles = stylex.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  beginSeperator: {},
  seperator: {
    margin: '0 8px',
    height: '32px',
    width: '1px',
    backgroundColor: `rgb(from ${colors.secondary} r g b / 0.7)`,
    // width: '1px',
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: colors.secondary,
    boxShadow: `0 0 0 1px rgb(from ${colors.secondary} r g b / 0.7)`,
  },
  text: {
    fontWeight: '450',
    fontSize: '20px',
    // color: colors.secondary,
    color: {
      default: `rgb(from ${colors.secondary} r g b / 0.7)`,
      ':hover': colors.secondary,
    },
    margin: 0,
    textDecoration: 'none',
  },
  omitText: {
    // pointerEvents: 'none',
    cursor: 'default',
  },
});
