import React from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";

const TableBodyEstimate = ({ estimates }) => {

  return (
    <tbody>
    {estimates.map((row) => {
      return (
        <TableRow key={row.name}>
          <TableCell textCell={row.name} position="start" />
          <TableCell textCell={row.category} position="center" />
          <TableCell textCell={row.quantity} position="center" />
          <TableCell textCell={row.ratio} position="center" />
          <TableCell textCell={row.amount} position="end" />
        </TableRow>
      )
    })}
    </tbody>
  );
};

export default TableBodyEstimate;
