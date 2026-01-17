'use client';
import SegmentControl from '@core/components/shared/MOLECULES/SegmentControl/SegmentControl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
// import { colors } from '@core/tokens/colors.stylex';

import cssStyles from './PortfolioTypeSwitch.module.css';
import { makeCss2Stylex } from '@core/utils/helpers/css2Stylex';

const portfolioTypeInfo: ComponentProps<typeof SegmentControl>['items'] = [
  { text: 'Actual', value: 'actual' },
  { text: 'Target', value: 'target' },
];

const PortfolioTypeSwitch = () => {
  //   const [selected, setSelected] = useState(portfolioTypeInfo[0]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  return (
    <>
      <SegmentControl
        rootStylex={switchStyles.root}
        itemStylex={
          makeCss2Stylex(cssStyles.ToggleGroupItem)
          //   {
          //     $$css: true,
          //     [cssStyles.ToggleGroupItem]: cssStyles.ToggleGroupItem,
          //   } as unknown as stylex.StaticStyles
        }
        items={portfolioTypeInfo}
        // selected={selected}
        defaultSelected={portfolioTypeInfo[0]}
        onChange={(newSelected) => {
          const urlSearchParams = new URLSearchParams(searchParams);
          urlSearchParams.set('portfolioType', newSelected.value);

          const nextUrl = `${pathname}?${urlSearchParams.toString()}`;
          replace(nextUrl);
        }}
      />
    </>
  );
};

export default PortfolioTypeSwitch;

const switchStyles = stylex.create({
  root: {
    width: '200px',
    minWidth: '0px',
  },
  item: {
    // backgroundColor: 'white',
    //   color: colors.textPrimary,
  },
});
