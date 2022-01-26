import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  button: {
    height: 40,
    backgroundColor: theme.color.dim,
    borderRadius: 3,
    border: `1px solid ${theme.color.dim}`,
    color: theme.typography.dim,
    cursor: 'pointer',
    minWidth: 200,
  }
}))

const Button = ({ name, styles, ...props }) => {
  const { button } = useStyles();

  return (
    <button className={button} type="button" {...props}>
      {name}
    </button>
  );
};

export default Button;
