import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  thead: {

  },
  row: {
    // display: 'grid',
    // gridTemplateColumns: '1fr 100px 150px 100px',
    // gap: 1,
    cursor: 'pointer',
    transition: 'all .3s',
    borderBottom: '1px solid #000'
  },
  cell: {
    padding: '5px 0',
    borderBottom: `1px solid ${theme.color.backdrop}`,
    fontWeight: 700,
    width: '100%',
  },
}))

const TableHead = ({ cellHeader }) => {
  const { thead, row, cell } = useStyles();

  return (
    <thead className={thead}>
      <tr className={row}>

        {cellHeader.map((item) => {
          return <th key={item} className={cell} >{ item }</th>
        })}

      </tr>
    </thead>
  );
};

export default TableHead;
