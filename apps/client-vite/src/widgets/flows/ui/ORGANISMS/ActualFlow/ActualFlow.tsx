import ActualFlowEcharts from 'src/widgets/flows/ui/ORGANISMS/ActualFlowChart/ActualFlowEchartsNew';
import ActualPortTile from '../Form/ActualPortfolioContents';
import MemoTile from '../Form/MemoContents';
import { css } from '@styled-system/css';
import AsyncSelect from 'react-select/async';
import CompoundSegmentControl from 'src/shared/ui/MOLECULES/CompoundSegmentControl/CompoundSegmentControl';
import ActualTile from './ActualTile';

import { getSomeTable } from '@styled-system/../api/apicall';
import { useEffect } from 'react';
import ActualFlowChartView from '../ActualFlowChart/ActualFlowChartView';

const ActualFlow = () => {
  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     const tests = await getSomeTable();
  //     return tests;
  //   };
  //   const res = new Promise((res) => {
  //     res(asyncFunc());
  //   }).then((result) => {
  //     console.log('비동기.. 상태 모르겠구여 일단 출력.', result);
  //   });
  // }, []);

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
        className={css({ bg: 'white', width: 'fit-content' })}
      >
        <ActualFlowChartView />
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
          <ActualTile />
          {/* <ActualPortTile defaultTransactionType="allocation" /> */}
          {/* </div> */}
          {/* <MemoTile /> */}
        </div>
      </div>
    </>
  );
};

export default ActualFlow;
