import ActualFlow from 'src/widgets/flows/ui/ORGANISMS/ActualFlow/ActualFlow';
import ActualPortTile from 'src/widgets/flows/ui/ORGANISMS/ActualPortTile';
import MemoTile from 'src/widgets/flows/ui/ORGANISMS/MemoTile';
import ModeController from 'src/widgets/flows/ui/ORGANISMS/ModeController';

const Flows = () => {
  return (
    <>
      <div>
        <ModeController />
        <div>
          <ActualFlow />
        </div>
      </div>
    </>
  );
};

export default Flows;
