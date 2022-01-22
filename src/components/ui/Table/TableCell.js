import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  cell: {
    padding: '5px 16px',
  },
}))

const TableCell = ({ textCell, position }) => {
  const { cell } = useStyles();

  return (
    <td className={cell} style={{ textAlign: position }}>
      {textCell}
    </td>
  );
};

export default TableCell;
