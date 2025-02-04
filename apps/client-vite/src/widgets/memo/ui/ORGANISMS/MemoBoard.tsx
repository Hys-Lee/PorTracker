import Modal from 'src/shared/ui/MOLECULES/ModalWithX';
import MemoTile from './MemoTile';
import MemoModalContent from './MemoModalContent';
import { useState } from 'react';

const MemoBoard = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div>
        <MemoTile
          asset={'애셋'}
          content={'내용'}
          date={'날짜'}
          portfolioType={'타입'}
          title={'제목'}
          onClick={() => {
            console.log('클릭');
            setOpen(true);
          }}
        />
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <MemoModalContent />
      </Modal>
    </>
  );
};

export default MemoBoard;
