import React from 'react';
import Table from "../../ui/Table/Table";
import TableHead from "../../ui/Table/TableHead";
// import { createUseStyles } from "react-jss";
import {estimateMock, estimateTableHeaderMock} from "../../../state/mock/materialsMock";
import TableBodyEstimate from "./TableBodyEstimate";


// const useStyles = createUseStyles((theme) => ({
//
// }))

const TableEstimate = () => {
  return (
    <Table>
      <TableHead cellHeader={estimateTableHeaderMock} />
      <TableBodyEstimate estimates={estimateMock} />
    </Table>
  );
};

export default TableEstimate;
