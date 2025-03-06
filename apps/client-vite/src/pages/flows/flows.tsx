import ActualFlow from 'src/widgets/flows/ui/ORGANISMS/ActualFlow/ActualFlow';
import ActualPortTile from 'src/widgets/flows/ui/ORGANISMS/ActualPortTile';
import MemoTile from 'src/widgets/flows/ui/ORGANISMS/MemoTile';
import ModeController from 'src/widgets/flows/ui/ORGANISMS/ModeController';

const Flows = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <div style={{ width: '300px' }}>
          <ModeController />
        </div>
        <div style={{ width: '100%' }}>
          <ActualFlow />
        </div>
      </div>
    </>
  );
};

export default Flows;
