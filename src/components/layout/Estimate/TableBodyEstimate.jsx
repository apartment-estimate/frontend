import React from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";

const TableBodyEstimate = ({ estimates, category }) => {

  let i = 1;
  return (
    <>
    {estimates.map((row) => {

      if (row.stage === category) {
        return (
          <TableRow key={i++}>
            <TableCell textCell={row.name} position="start" />
            <TableCell width={50} textCell={row.amount} position="center" />
            <TableCell width={70} textCell={row.coeffIndividual} position="center" />
            <TableCell width={150} textCell={row.priceTotal} position="end" />
          </TableRow>
        )
      }
    })}
    </>
  );
};

export default TableBodyEstimate;
