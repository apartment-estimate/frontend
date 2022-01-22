import React from 'react';
import {createUseStyles} from "react-jss";
import Button from "./Button";
import button from "./Button";

const useStyles = createUseStyles((theme) => ({
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    maxWidth: 240,
    minWidth: 200,
    height: 300,
    padding: 20,
    borderRadius: 20,
    border: '1px solid #bfbfbf82',
    boxShadow: '0px 0px 4px 0px #d7d7d782'
  },
  head: {
    fontSize: 16,
  },
}))

const ButtonCard = ({ children, header, ...props }) => {
  const { cardContainer, head } = useStyles();

  return (
    <button className={cardContainer} type="button" {...props}>
      {children}
      <h3 className={head}>{header}</h3>
    </button>
  );
};

export default ButtonCard;
