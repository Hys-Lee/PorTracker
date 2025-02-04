import Modal from './ModalWithX';
import { useState } from 'react';
import ReactModal from 'react-modal';

export default {
  component: Modal,
  title: 'ModalWithX',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => {
  //   const OtherParent = () => {
  //     return (
  //       <div id="otherParent">
  //         <p>여긴 다른 부모</p>
  //       </div>
  //     );
  //   };
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* <OtherParent /> */}
      <div id="default">
        <p onClick={() => setIsOpen(true)}>하하</p>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p style={{ whiteSpace: 'pre-wrap ' }}>
            {`내용
          asd
          
          asdf
          as
          fda
          sf
          afda
          sfd
          asf
          asf
          ads
          `}
          </p>
        </Modal>
      </div>
      <div id="other">
        <p>아덜</p>
      </div>
    </>
  );
};

export const Default = Template.bind({});
