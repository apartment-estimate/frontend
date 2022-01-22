import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  button: {
    height: 40,
  }
}))

const Button = ({ name, styles, ...props }) => {
  const { button } = useStyles();

  return (
    <button className={`${button} ${styles}`} type="button" {...props}>
      {name}
    </button>
  );
};

export default Button;
