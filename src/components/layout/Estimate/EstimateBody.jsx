import React from 'react';
// import {createUseStyles} from "react-jss";
import TitlePage from "../../ui/TitlePage";

// const useStyles = createUseStyles(() => ({
//
// }))

const EstimateBody = ({ estimate }) => {
  // const { nameReadyWrapper } = useStyles();

  return (
    <>
      <TitlePage title={estimate.name} />
      <p>{estimate.residence}</p>
      <p>{estimate.layout}</p>
      <p>Поправочный коэффициент по смете - {estimate.coeffCommon}</p>
    </>
  );
};

export default EstimateBody;
