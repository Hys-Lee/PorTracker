import ActualFlowEcharts from 'src/widgets/flows/ui/ORGANISMS/ActualFlow/ActualFlowEcharts';
import ActualPortTile from '../ActualPortTile';
import MemoTile from '../MemoTile';
import { css } from '@styled-system/css';
import AsyncSelect from 'react-select/async';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import ActualTile from '../ActualTile';

const ActualFlow = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'stretch',
          height: '100%',
          padding: '8px',
          gap: '8px',
          width: '100%',
        }}
        className={css({ bg: 'neutral.100', width: 'fit-content' })}
      >
        <div
          style={{
            // minWidth: '480px',
            width: '100% ',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
            // padding: '8px',
          }}
        >
          <div
            className={css({
              rounded: 'lg',
              bg: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '8px',
              width: '100% !important',
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
                // className={css({
                //   '&  :is(*)': {
                //     minHeight: 'auto !important',
                //     height: '20px !important',
                //     fontSize: '8px',
                //     // minHeight: '10px !important',
                //     display: 'flex',
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //     margin: '0 !important',
                //     padding: '0px !important',
                //   },
                // })}
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
              <CompoundSegmentControl style={{ width: '48px' }}>
                <CompoundSegmentControl.Button textContent="$" />
                <CompoundSegmentControl.Button textContent="원" />
              </CompoundSegmentControl>
            </div>
            <div style={{ display: 'flex', height: '40px', padding: '4px' }}>
              <button
                className={css({
                  bg: 'neutral.200',
                  width: '32px',
                  rounded: 'lg',
                })}
              >
                일
              </button>
              <button
                className={css({
                  bg: 'neutral.200',
                  width: '32px',
                  rounded: 'lg',
                })}
              >
                주
              </button>
              <button
                className={css({
                  bg: 'neutral.200',
                  width: '32px',
                  rounded: 'lg',
                })}
              >
                월
              </button>
              <button
                className={css({
                  bg: 'neutral.200',
                  width: '32px',
                  rounded: 'lg',
                })}
              >
                년
              </button>
            </div>
          </div>
          <div
            style={{
              // height: '100% !important',
              minWidth: '480px',
              // width: '1000px',
              background: 'white',
              borderRadius: '16px',
              padding: '8px',
              flexGrow: 1,
              width: '100%',
            }}
          >
            <ActualFlowEcharts />
          </div>
        </div>
        <div
          style={{
            width: '260px',
            // padding: '8px',
            gap: '8px',
            fontSize: '13px',
            // fontWeight: 'bold',
          }}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '& p': {
              fontSize: '12px',
            },
          })}
        >
          {/* <div style={{ height: '350px' }}> */}
          <ActualTile defaultTransactionType="allocation" />
          {/* <ActualPortTile defaultTransactionType="allocation" /> */}
          {/* </div> */}
          {/* <MemoTile /> */}
        </div>
      </div>
    </>
  );
};

export default ActualFlow;
