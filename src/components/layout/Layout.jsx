import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import { createUseStyles } from 'react-jss'

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
    height: 100,
  },
  nav: {
    display: 'flex',
    gap: 50,
    '& a': {
      textDecoration: 'none',
      fontWeight: 700,
      padding: '5px 10px',
      borderRadius: 2,
      color: theme.color.primary.main,
      '&:hover': {
        textDecoration: 'underline',
      }
    }
  },
  main: {
    padding: 30,
  },
}))

export const Layout = () => {
  const { container, header, nav, main } = useStyles();

  return (
    <>
      <header className={`${container} ${header}`}>
        <nav className={nav}>
          <NavLink to='/'>Главная</NavLink>
          <NavLink to='/material'>Материалы</NavLink>
          <NavLink to='/estimate'>Смета</NavLink>
        </nav>
      </header>

      <main className={`${container} ${main}`}>
        <Outlet />
      </main>
    </>
  );
};
