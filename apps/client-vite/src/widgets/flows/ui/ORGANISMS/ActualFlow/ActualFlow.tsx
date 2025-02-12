import ActualFlowEcharts from 'src/widgets/flows/ui/ORGANISMS/ActualFlow/ActualFlowEcharts';
import ActualPortTile from '../ActualPortTile';
import MemoTile from '../MemoTile';

const ActualFlow = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'stretch',
        }}
      >
        <div
          style={{
            width: '1000px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ border: '1px solid black', height: '50px' }}>
            대충 뭔가 위에 있는 정보들하고뭔가 // 근데 이게 echarts에 사용되는
            데이터들 전체에 대해 핸들링하는거라
          </div>
          <ActualFlowEcharts />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ActualPortTile defaultTransactionType="allocation" />
          <MemoTile />
        </div>
      </div>
    </>
  );
};

export default ActualFlow;
