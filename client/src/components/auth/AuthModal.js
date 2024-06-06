import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import closebutton from '../../assets/icons/closebutton.svg';

const AuthModal = ({ children, onClose }) => {
  const [showModal, setShowModal] = useState(true);
  const modalElement = document.getElementById('modal');

  return (
    <>
      {showModal &&
        ReactDOM.createPortal(
          <Container>
            <Modal>
              <CloseBtn src={closebutton} alt='close-btn' onClick={onClose} />
              {children}
            </Modal>
          </Container>,
          modalElement
        )}
    </>
  );
};

export default AuthModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid #ececec;
  border-radius: 8px;
  box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.06);
  height: 30rem;
  width: 33rem;
  padding: 20px;
  position: relative;
`;

const CloseBtn = styled.img`
  width: 0.8rem;
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
`;
