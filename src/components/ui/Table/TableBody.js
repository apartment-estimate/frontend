import React from 'react';
import TableRow from "./TableRow";
import TableCell from "./TableCell";

const TableBody = ({ materials }) => {

  let i = 1;

  return (
    <tbody>
      {materials.map((material) => {
        return (
          <TableRow key={i++}>
            {material.map((item) => {
              return <TableCell key={i++} textCell={item.name} position={item.position} />;
            })}
          </TableRow>
        )
      })}
    </tbody>
  );
};

export default TableBody;
