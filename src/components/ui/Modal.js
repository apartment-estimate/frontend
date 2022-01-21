import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { ModalContext } from '../../state/context/modal-context';
import { CloseIcon } from './Icons/CloseIcon';

const useStyles = makeStyles(({ breakpoints, palette: { primary }, typography }) => ({
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
    backgroundColor: primary.backdrop,
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
    backgroundColor: primary.dim,
    width: 370,
    padding: 24,
    borderRadius: 4,
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.144)',
    animation: '$showModal .2s ease-in-out',
    overflowX: 'hidden',
    overflowY: 'auto',
    zIndex: 3,
    transition: 'all .2s',
    '& a': {
      color: typography.color,
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      '&:after': {
        content: ({ headerLineBottom }) => (headerLineBottom ? '""' : ''),
        position: 'absolute',
        top: 78,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: primary.main,
      },
    },
  },
  closeIcon: {
    zIndex: 1,
    position: 'absolute',
    top: 22,
    right: 17,
  },
  modalHeader: {
    position: 'relative',
    margin: '10px 0 40px',
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
    borderBottom: `10px solid ${primary.dim}`,
  },
}));

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
    headerLineBottom,
  } = props;
  const { backdrop, modal, modalHeader, closeIcon, childrenContainer, backdropHide, modalHide, tooltip } = useStyles({ headerLineBottom });
  const { closeModal } = useContext(ModalContext);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    if (ifBlur) return;
    setClosing(true);
    addFunctionClose();
    const closeTimeout = setTimeout(() => {
      closeModal();
      clearTimeout(closeTimeout);
    }, 300);
  };

  return (
    <div style={position} className={closing ? `${backdrop} ${backdropHide}` : backdrop} onClick={handleClose}>
      <div style={styleModal} className={closing ? `${modal} ${modalHide}` : modal} onClick={(e) => e.stopPropagation()}>
        {addTooltip && <div className={tooltip} />}
        {!closeButtonNone && (
          <IconButton onClick={handleClose} className={closeIcon}>
            <CloseIcon />
          </IconButton>
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
