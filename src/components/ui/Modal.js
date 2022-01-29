import React, { useContext, useState } from 'react';
// import { ModalContext } from '../../state/context/modal-context';
// import { CloseIcon } from './Icons/CloseIcon';
import { createUseStyles } from "react-jss";
import { ModalContext } from "../../state/context/modal.context";
import {CloseIcon} from "./icons/Close.icon";
import ButtonIcon from "./buttons/ButtonIcon";

const useStyles = createUseStyles((theme) => ({
  '@keyframes showBackdrop': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  '@keyframes showModal': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.backdrop,
    zIndex: 3,
    transition: 'all .2s',
    animation: '$showBackdrop .1s ease-in-out',
  },
  childrenContainer: {
    position: 'relative',
    // height: '100%',
  },
  modal: {
    position: 'relative',
    backgroundColor: theme.color.main,
    width: 600,
    padding: 24,
    borderRadius: 20,
    boxShadow: `0 0 25px ${theme.color.dim60}`,
    animation: '$showModal .2s ease-in-out',
    overflowX: 'hidden',
    overflowY: 'auto',
    zIndex: 3,
    transition: 'all .2s',
    '& a': {
      color: theme.typography.main,
    },
    '@media (max-width: 499px)': {
      width: '100%',
      height: '100%',
    },
    // [breakpoints.down('sm')]: {
    //   width: '100%',
    //   height: '100%',
      // '&:after': {
      //   content: ({ headerLineBottom }) => (headerLineBottom ? '""' : ''),
      //   position: 'absolute',
      //   top: 78,
      //   left: 0,
      //   right: 0,
      //   height: 1,
      //   backgroundColor: primary.main,
      // },
    // },
  },
  closeIconButton: {
    zIndex: 1,
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: '50%',
    width: 30,
    height: 30,
  },
  modalHeader: {
    position: 'relative',
    margin: '40px 0',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: '20px',
  },
  backdropHide: {
    opacity: 0,
  },
  modalHide: {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
  tooltip: {
    position: 'absolute',
    top: -8,
    right: 16,
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: `10px solid ${theme.color.main}`,
  },

}))

export const Modal = (props) => {
  const {
    title,
    closeButtonNone,
    styleTitle,
    styleModal,
    children,
    styleChildrenContainer,
    addFunctionClose = () => {},
    ifBlur,
    position,
    addTooltip,
  } = props;

  const { backdrop, modal, modalHeader, closeIconButton, childrenContainer, backdropHide, modalHide, tooltip } = useStyles();
  const { closeModal } = useContext(ModalContext);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    addFunctionClose();
    const closeTimeout = setTimeout(() => {
      closeModal();
      clearTimeout(closeTimeout);
    }, 300);
  };

  const handleCloseBackdrop = () => {
    if (ifBlur) return;
    setClosing(true);
    addFunctionClose();
    const closeTimeout = setTimeout(() => {
      closeModal();
      clearTimeout(closeTimeout);
    }, 300);
  }

  return (
    <div style={position} className={closing ? `${backdrop} ${backdropHide}` : backdrop} onClick={handleCloseBackdrop}>
      <div style={styleModal} className={closing ? `${modal} ${modalHide}` : modal} onClick={(e) => e.stopPropagation()}>
        {addTooltip && <div className={tooltip} />}
        {!closeButtonNone && (
          <div className={closeIconButton}>
            <ButtonIcon onClick={handleClose}>
              <CloseIcon width={16} height={16} />
            </ButtonIcon>
          </div>
        )}
        <h3 style={styleTitle} className={modalHeader}>
          {title}
        </h3>
        <div style={styleChildrenContainer} className={childrenContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};
