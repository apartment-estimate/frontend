import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  row: {
    cursor: 'pointer',
    transition: 'all .3s',
    '&:hover': {
      boxShadow: '0px 0px 4px 0px #d7d7d782',
      backgroundColor: '#d7d7d782',
    },
    '@media (max-width: 767px)': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      border: `1px solid ${theme.borderColor.main}`
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
