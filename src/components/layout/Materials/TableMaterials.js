import React from 'react';
import Table from "../../ui/Table/Table";
import TableHead from "../../ui/Table/TableHead";
import {materialsMock, materialsTableHeaderMock} from "../../../state/mock/materialsMock";
import TableBodyMaterials from "./TableBodyMaterials";

const TableMaterials = () => {
  return (
    <Table>
      <TableHead cellHeader={materialsTableHeaderMock} />
      <TableBodyMaterials materials={materialsMock} />
    </Table>
  );
};

export default TableMaterials;
