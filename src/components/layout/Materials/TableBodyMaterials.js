import React from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";

const TableBodyMaterials = ({ materials }) => {

  return (
    <tbody>
    {materials.map((row) => {
      return (
        <TableRow key={row.name}>
          <TableCell textCell={row.name} position="start" />
          <TableCell textCell={row.unit} position="center" />
          <TableCell textCell={row.price} position="end" />
          <TableCell textCell={row.ratio} position="center" />
        </TableRow>
      )
    })}
    </tbody>
  );
};

export default TableBodyMaterials;
