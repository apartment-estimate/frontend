import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(() => ({
  cell: {
    padding: '5px 16px',
  },
}))

const TableCell = ({ children, styles, textCell, position, width }) => {
  const { cell } = useStyles();
  const content = { textAlign: position, width: `${width}px` }

  return (
    <td className={`${cell} ${styles || ''}`}>
      <div style={content}>
        {textCell}
        {children}
      </div>
    </td>
  );
};

export default TableCell;
