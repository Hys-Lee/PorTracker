import Modal from './ModalWithX';
import { useState } from 'react';

export default {
  component: Modal,
  title: 'Shared/MOLECULES/ModalWithX',
  tags: ['autodocs'],
  //👇 "Data"로 끝나는 export들은 스토리가 아닙니다.
  excludeStories: /.*Data$/,
  // args: {  },
};

const Template = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* <OtherParent /> */}
      <div id="default">
        <p onClick={() => setIsOpen(true)}>모달 열기</p>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          headerContents={[
            <button
              style={{
                // background: 'rgb(200,200,200)',
                height: '32px',
                width: '100px',
                textDecoration: 'underline',
              }}
            >
              추가된 버튼
            </button>,
          ]}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              // overflow: 'scroll',
            }}
          >
            <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>제목</h2>
            <p style={{ whiteSpace: 'pre-wrap ', width: '100%' }}>
              {`내용aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
          </div>
        </Modal>
      </div>
      <div id="other">
        <p>아덜</p>
      </div>
    </>
  );
};

export const Default = Template.bind({});
