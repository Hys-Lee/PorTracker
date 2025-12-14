'use client';

import { Tabs } from 'radix-ui';
import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../../tokens/colors.stylex';
import { ReactNode, useState } from 'react';
import { useStateReducer } from '@core/hooks/utils/useStateReducer.ts/useStateReducer';
// Prototype을 만들어서, 기본 형태를 만들어놔야겠는데? 다른 곳에서 변경할 수 있도록..
// 너무 과하지 않도록 디자인쪽에서만 기본 만들어두자. 사용하는 곳에서 나머지 알아서 책임지도록

interface TabProps {
  tabsInfo: { name: string; content: ReactNode }[];
  initTab: string;
  stateReducer?: (prevActivated: string, newActivated: string) => string;
  tabItemStyleX?: stylex.StyleXStyles;
  tabContentStyleX?: stylex.StyleXStyles;
}

const Tab = ({
  initTab,
  stateReducer,
  tabsInfo,
  tabItemStyleX,
  tabContentStyleX,
}: TabProps) => {
  const [activeTab, setActiveTab] = useStateReducer(initTab, stateReducer);
  return (
    <>
      <Tabs.Root
        defaultValue={initTab}
        value={activeTab}
        onValueChange={setActiveTab}
        {...stylex.props(rootStyle.base)}
      >
        <Tabs.List {...stylex.props(listStyle.base)}>
          {tabsInfo.map(({ name }) => (
            <Tabs.Trigger
              key={name}
              value={name}
              {...stylex.props(
                triggerStyle.base,
                activeTab === name ? triggerStyle.active : undefined,
                tabItemStyleX
              )}
            >
              {name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabsInfo.map(({ name, content }) => (
          <Tabs.Content
            key={name}
            value={name}
            // asChild
            {...stylex.props(contentStyle.base, tabContentStyleX)}
          >
            {content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  );
};

export default Tab;

const rootStyle = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

const listStyle = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 0,
  },
});

const triggerStyle = stylex.create({
  base: {
    flexGrow: 1,
    flexBasis: '0%',
    color: colors.textNormal,
    fontSize: '18px',
    fontWeight: '600',
    backgroundColor: 'white',
    padding: '20px',
    height: '60px',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    userSelect: 'none',
    borderStyle: 'none',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: colors.bgStrong,
  },
  active: {
    color: colors.textPrimary,
    borderBottomWidth: '2px',
    borderBottomColor: colors.textPrimary,
  },
});

const contentStyle = stylex.create({
  base: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
