import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  table: {
    width: '100%'
  },
}))

const Table = ({ children }) => {
  const { table } = useStyles();

  return (
    <table className={table}>
      { children }
    </table>
  );
};

export default Table;
