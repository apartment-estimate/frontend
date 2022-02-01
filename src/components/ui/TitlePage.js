import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  titleStyle: {
    '@media (max-width: 767px)': {
      fontSize: 20,
    },
  },
}))

const TitlePage = ({ title }) => {
  const { titleStyle } = useStyles();

  return (
    <h1 className={titleStyle}>
      { title }
    </h1>
  );
};

export default TitlePage;
