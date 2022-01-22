import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  row: {
    // display: 'grid',
    // gridTemplateColumns: '1fr 100px 150px 100px',
    // gap: 1,
    cursor: 'pointer',
    transition: 'all .3s',
    '&:hover': {
      boxShadow: '0px 0px 4px 0px #d7d7d782',
      backgroundColor: '#d7d7d782'
    },
  },
}))

const TableRow = ({ children }) => {
  const { row } = useStyles();

  return (
    <tr className={row}>
      { children }
    </tr>
  );
};

export default TableRow;
