import { css } from '@styled-system/css';
import { ReactNode } from 'react';
import Text from 'src/shared/ui/ATOMS/Text';
import { NavLink, Outlet } from 'react-router';

// interface LayoutProps {
//   children: ReactNode;
// }

const linkInfo = [
  { to: '/', textContent: '홈' },
  { to: '/flows', textContent: '흐름 관리' },
  { to: '/portfolios', textContent: '포트폴리오 관리' },
  { to: '/memos', textContent: '메모 관리' },
];

const Layout = () =>
  // { children }: LayoutProps   // -> 이건 react-router없을 때..
  {
    return (
      <>
        <div className={LayoutHeaderStyle}>
          <div>
            <div>대충 로고</div>
            <div className={LayouTabsStyle}>
              {linkInfo.map((info) => (
                <button>
                  <NavLink
                    key={info.to}
                    to={info.to}
                    style={({ isActive }) =>
                      isActive ? { color: 'black' } : {}
                    }
                  >
                    <Text as="p" textContent={info.textContent} />
                  </NavLink>
                </button>
              ))}
            </div>
            <button className={LayouLoginStyle}>로그인 버튼</button>
          </div>
          <div className={LayouBodyStyle}>
            {/* {children} */}
            <Outlet />
          </div>
        </div>
      </>
    );
  };
export default Layout;

const LayoutHeaderStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  alignItems: 'center',
  '& > div': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
const LayoutLogoStyle = css({});
const LayouTabsStyle = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  fontWeight: 'bold',
  color: 'gray.400',
  '& > button': {
    cursor: 'pointer',
  },
  '& > button:hover': {
    color: 'black',
  },
});
const LayoutActiveTabsStyle = css({
  color: 'black',
});

const LayouLoginStyle = css({
  background: 'blue.500',
  color: 'whitesmoke',
  padding: '4px 8px',
  rounded: 'lg',
  fontWeight: '600',
  fontSize: '16px',
});
const LayouBodyStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px',
  paddingTop: '40px',
});
