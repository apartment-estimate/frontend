import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  cell: {
    padding: '5px 16px',
  },
}))

const TableHead = ({ cells }) => {
  const { cell } = useStyles();

  return (
    <>
      {cells.map(({ name }) => {
        return (
          <div className={cell}>
            { name }
          </div>
        );
      })}
    </>
  );
};

export default TableHead;
