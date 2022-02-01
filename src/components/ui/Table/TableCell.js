import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  cell: {
    padding: '5px 16px',
  },
  content: {
    display: 'flex',
    justifyContent: ({position}) => position,
  },
}))

const TableCell = ({ children, stylesTd, contentContent, textCell, ...props }) => {
  const { cell, content } = useStyles({ ...props });

  return (
    <td className={`${cell} ${stylesTd || ''}`}>
      <div className={`${content} ${contentContent || ''}`}>
        {textCell}
        {children}
      </div>
    </td>
  );
};

export default TableCell;
