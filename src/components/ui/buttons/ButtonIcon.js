import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  }
}))

const ButtonIcon = ({ children, styles, ...props }) => {
  const { button } = useStyles();

  return (
    <button
      className={`${button} ${styles || ''}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
