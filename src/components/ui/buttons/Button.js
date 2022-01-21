import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  button: {
    height: 40,
  }
}))

const Button = ({ name, ...props }) => {
  const { button } = useStyles();

  return (
    <button className={button} type="button" {...props}>
      {name}
    </button>
  );
};

export default Button;
