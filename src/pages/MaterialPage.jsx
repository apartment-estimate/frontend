import React from 'react';
import TitlePage from "../components/ui/TitlePage";
import {createUseStyles} from "react-jss";
import CreateMaterialForm from "../components/layout/CreateMaterialForm";
import TableMaterials from "../components/layout/Materials/TableMaterials";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  }
}))

const MaterialPage = () => {
  const { wrapper } = useStyles();

  return (
    <div >
      <TitlePage title="Материалы" />
      <div className={wrapper}>
        <CreateMaterialForm />
        <TableMaterials />
      </div>
    </div>
  );
};

export default MaterialPage;
