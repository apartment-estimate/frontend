import React, {useContext, useEffect, useState} from 'react';
import {createUseStyles} from "react-jss";
import {theme} from "../../lib/theme";
import {AlertContext} from "../../state/context/alert.context";
const useStyles = createUseStyles((theme) => ({
  '@keyframes showAlert': {
    '0%': {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
  },
  '@keyframes closeAlert': {
    '0%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateY(-50px)',
    },
  },
  alertStyle: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: theme.color.dim,
    maxWidth: 300,
    width: 200,
    padding: 20,
    transition: 'all .3s',
    animation: '$showAlert .2s ease-in-out',
    color: theme.typography.dim,
    borderRadius: 4,
    fontSize: 12,
  },
  closeAlertStyle: {
    animation: '$closeAlert .2s ease-in-out',
    opacity: 0,
  },
}))

const Alert = (props) => {
  const { alertStyle, closeAlertStyle } = useStyles();
  const { closeAlert } = useContext(AlertContext);
  const code = props.children.props.code;
  const text = props.children.props.text;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setVisible(true)
    }, 2000);

    const timer2 = setTimeout(() => {
      closeAlert();
    }, 3000);
    return () => [timer1, timer2];
  }, [closeAlert])

  return (
    <div
      className={`${alertStyle} ${visible && closeAlertStyle }`}
      style={code >= 400 ? { backgroundColor: 'red'} : { backgroundColor: theme.color.dim }}
    >
      { text }
    </div>
  );
};

export default Alert;
