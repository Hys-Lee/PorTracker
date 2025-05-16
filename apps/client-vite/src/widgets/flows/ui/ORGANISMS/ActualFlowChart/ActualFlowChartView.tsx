import ActualFlowEcharts from 'src/widgets/flows/ui/ORGANISMS/ActualFlowChart/ActualFlowEchartsNew';
import { css, cva } from '@styled-system/css';
import AsyncSelect from 'react-select/async';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import { useState } from 'react';

const CompoundSegmentBase = css({
  display: 'flex',
  //   gap: '2px',
});
const CompoundSegmentButton = css({
  width: '20px',
});

const PeriodButton = css({
  width: '32px',
  height: '32px',
  rounded: 'lg',
  border: 'gray solid 1px',
});

const ActualFlowChartView = () => {
  const [IsKoreancurrency, setIsKoreancurrency] = useState(false);
  const period = ['일', '주', '월', '년'];
  return (
    <>
      <div
        style={{
          minWidth: '480px',
          width: '100% !important',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '8px',
          border: 'gray solid 1px',
          borderRadius: '8px',
          // padding: '8px',
        }}
      >
        <section
          className={css({
            rounded: 'lg',
            bg: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '8px',
            width: '100% !important',
            // border: 'gray solid 1px',
            borderRadius: '8px',
          })}
        >
          <div
            style={{
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <AsyncSelect
              classNames={{
                control: () => css({ rounded: 'lg' }),
                indicatorSeparator: () =>
                  css({
                    width: '0px !important',
                  }),
              }}
              options={[
                { value: 123, label: '123' },
                { value: 456, label: '456' },
                { value: 789, label: '789' },
              ]}
            />
          </div>
          <div
            style={{
              height: '100%',
              padding: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CompoundSegmentControl className={CompoundSegmentBase}>
              <CompoundSegmentControl.Button
                className={CompoundSegmentButton}
                textContent="$"
                activated={!IsKoreancurrency}
                onClick={() => setIsKoreancurrency(false)}
              />
              <CompoundSegmentControl.Button
                className={CompoundSegmentButton}
                textContent="원"
                activated={IsKoreancurrency}
                onClick={() => setIsKoreancurrency(true)}
              />
            </CompoundSegmentControl>
          </div>
          <div
            style={{
              display: 'flex',
              height: '40px',
              padding: '4px',
              gap: '4px',
            }}
          >
            {period.map((periodString) => (
              <button key={periodString} className={PeriodButton}>
                {periodString}
              </button>
            ))}
          </div>
        </section>
        <section
          style={{
            // height: '100% !important',
            // minWidth: '480px',
            // width: '1000px',
            background: 'white',
            borderRadius: '16px',
            padding: '8px',
            flexGrow: 1,
            width: '100% !important',
            height: '100% !important',
          }}
        >
          <ActualFlowEcharts />
        </section>
      </div>
    </>
  );
};

export default ActualFlowChartView;
