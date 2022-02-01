import React from 'react';
import {createUseStyles} from "react-jss";
import TitlePage from "../../ui/TitlePage";

const useStyles = createUseStyles((theme) => ({
  text: {
    '@media (max-width: 767px)': {
      fontSize: 14,
      margin: '3px 0',
    },
  },
}))

const EstimateBody = ({ estimate }) => {
  const { text } = useStyles();

  return (
    <>
      <TitlePage title={estimate.name} />
      <p className={text}>{estimate.residence}</p>
      <p className={text}>{estimate.layout}</p>
      <p className={text}>Поправочный коэффициент по смете - {estimate.coeffCommon}</p>
      <p className={text}>Клиент - {estimate.customer}</p>
    </>
  );
};

export default EstimateBody;
