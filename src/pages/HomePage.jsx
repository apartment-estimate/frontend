import React from 'react';
import {createUseStyles} from "react-jss";
import TitlePage from "../components/ui/TitlePage";

const useStyles = createUseStyles((theme) => ({
  wrapperPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))

const HomePage = () => {
  const { wrapperPage } = useStyles();

  return (
    <>
      <TitlePage title="Главная страница" />
      <div className={wrapperPage}>
        <p>Здесь можно разместить любую информацию</p>
      </div>
    </>
  );
};

export default HomePage;
