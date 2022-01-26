import React, { useContext, useEffect } from 'react';
import Table from "../../ui/Table/Table";
import TableHead from "../../ui/Table/TableHead";
import TableBodyMaterials from "./TableBodyMaterials";
import { materialsTableHeaderMock} from "../../../state/mock/materialsMock";
import { MaterialContext} from "../../../state/context/materials.context";
import { useMaterialsHook} from "../../../hooks/materials.hook";

const TableMaterials = () => {

  const { materialsState } = useContext(MaterialContext);
  const { getMaterials } = useMaterialsHook();

  useEffect(() => {
    getMaterials().then();
  }, [getMaterials])

  if (!materialsState) return <div>Загрузка</div>

  return (
    <Table>
      <TableHead cellHeader={materialsTableHeaderMock} />
      <TableBodyMaterials materials={materialsState} />
    </Table>
  );
};

export default TableMaterials;
