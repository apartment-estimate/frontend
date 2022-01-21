import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  row: {
    display: 'grid',
    gap: 1,
    cursor: 'pointer',
    transition: 'all .3s',
    '&:not(:first-child):hover': {
      boxShadow: '0px 0px 4px 0px #d7d7d782',
      backgroundColor: '#d7d7d782'
    },
    '&:first-child': {
      borderBottom: '1px solid #000',
    },
  },
  cell: {
    padding: '5px 16px',
  },
}))

const TableRow = ({ cells }) => {
  const { cell, row } = useStyles();

  return (
    <div className={row} style={{ gridTemplateColumns: '1fr 100px 150px 100px' }}>
      {cells.map((item) => {
        return (
          <div key={item.name} className={cell} >
            { item.name }
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
