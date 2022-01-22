import React, {createContext, useState} from 'react';
import { Modal } from "../../components/ui/Modal";

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {

  const [modalOpened, setModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openedModal = (modalConfig) => {
    document.querySelector('body').style.overflow = 'hidden';
    setModalContent(modalConfig);
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
    document.querySelector('body').style.overflow = 'auto';
  };


  return (
    <ModalContext.Provider
      value={{
        openedModal,
        closeModal,
        modalOpened,
      }}
    >
      {modalOpened && <Modal {...modalContent} />}
      {children}
    </ModalContext.Provider>
  );
}
export default ModalContextProvider;
