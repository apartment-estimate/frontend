import React, {useEffect} from 'react';
import TitlePage from "../components/ui/TitlePage";
import {createUseStyles} from "react-jss";
import AddMaterialForm from "../components/layout/AddMaterialForm";
import TableEstimate from "../components/layout/Estimate/TableEstimate";
import EstimateBody from "../components/layout/Estimate/EstimateBody";
import {useMaterialsHook} from "../hooks/materials.hook";

const useStyles = createUseStyles(() => ({
  wrapper_estimatePage: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  },
}))

const EstimatePage = () => {
  const { wrapper_estimatePage } = useStyles();
  const { getMaterials } = useMaterialsHook();


  useEffect(() => {
    getMaterials().then();
  }, [getMaterials]);

  return (
    <>
      <TitlePage title="Страница создания сметы" />
      <div className={wrapper_estimatePage}>
        <EstimateBody />
        <AddMaterialForm />
        <TableEstimate />
      </div>
    </>
  );
};

export default EstimatePage;
