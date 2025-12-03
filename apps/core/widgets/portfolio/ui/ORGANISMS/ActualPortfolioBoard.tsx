import Modal from 'src/shared/ui/MOLECULES/ModalWithX';
import { useState } from 'react';
import ActualPortfolioModalContent from './ActualPortfolioModalContent';
import getActualPorts from 'src/features/tmpFuncs/getAcutalPorts';
import LayeredErrorBoundary from 'src/features/errors/LayeredErrorBoundary';

const ActualPortfolioBoard = () => {
  const [open, setOpen] = useState(true);
  const actualPorts = getActualPorts();
  return (
    <>
      <div>
        <ul>
          {actualPorts.map((value) => (
            <li
              id={value.id.toString()}
              style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}
              onClick={() => setOpen(true)}
            >
              <p>{value.date.toISOString()}</p>
              <p>{value.asset}</p>
              <p>{value.value}</p>
              <p>{value.transactionType}</p>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <LayeredErrorBoundary>
          <ActualPortfolioModalContent />
        </LayeredErrorBoundary>
      </Modal>
    </>
  );
};

export default ActualPortfolioBoard;
