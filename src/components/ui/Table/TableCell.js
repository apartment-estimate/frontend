import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  cell: {
    padding: '5px 16px',
  },
  content: {
    display: 'flex',
  }
}))

const TableCell = ({ children, styles, textCell, position, width }) => {
  const { cell, content } = useStyles();

  return (
    <td className={`${cell} ${styles || ''}`}>
      <div className={content} style={{ justifyContent: position, width: `${width}px` }}>
        {textCell}
        {children}
      </div>
    </td>
  );
};

export default TableCell;
