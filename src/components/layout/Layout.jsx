import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { createUseStyles } from 'react-jss'
import {pullRequest} from "../../lib/pullRequest";

const useStyles = createUseStyles((theme) => ({
  container: {
    maxWidth: theme.breakpoints.xl,
    margin: '0 auto',
    '@media (max-width: 1440px)': {
      maxWidth: theme.breakpoints.lg,
    },
    '@media (max-width: 1023px)': {
      maxWidth: theme.breakpoints.md,
    },
    '@media (max-width: 767px)': {
      maxWidth: theme.breakpoints.sm,
    },
    '@media (max-width: 499px)': {
      maxWidth: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  nav: {
    display: 'flex',
    gap: 50,
  },
  link: {
    fontWeight: 700,
    padding: '5px 10px',
    borderRadius: 2,
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  main: {
    padding: 30,
    minHeight: 'calc(100vh - 100px)',
  },
  footer: {
    textAlign: 'center',
    fontSize: 9,
    padding: 5,
    height: 30,
  },
}))

export const Layout = () => {
  const { container, header, nav, main, footer, link } = useStyles();

  return (
    <>

      <header className={`${container} ${header}`}>
        <nav className={nav}>
          <NavLink className={link} to='/'>Главная</NavLink>
          <NavLink className={link} to='/material'>Материалы</NavLink>
          <NavLink className={link} to='/estimate'>Смета</NavLink>
        </nav>
      </header>

      <main className={`${container} ${main}`}>
        <Outlet />
      </main>

      <footer className={`${container} ${footer}`}>
        <div>{`Apartment Estimate © 2022 v.${pullRequest}`}</div>
      </footer>
    </>
  );
};
