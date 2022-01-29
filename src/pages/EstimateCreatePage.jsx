import React, {useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {createUseStyles} from "react-jss";
import AddMaterialFormModal from "../components/layout/Estimate/AddMaterialFormModal";
import TableEstimate from "../components/layout/Estimate/TableEstimate";
import EstimateBody from "../components/layout/Estimate/EstimateBody";
import ButtonIcon from "../components/ui/buttons/ButtonIcon";
import {PlusIcon} from "../components/ui/icons/Plus.icon";
import {ModalContext} from "../state/context/modal.context";
import {useEstimateHook} from "../hooks/estimate.hook";
import {EstimateContext} from "../state/context/estimate.context";

const useStyles = createUseStyles((theme) => ({
  wrapper_estimatePage: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  },
  textButton: {
    marginLeft: 10,
  },
  result: {
    fontSize: 20,
    textAlign: 'end',
  },
  nullMaterials: {
    fontSize: 20,
    textAlign: 'center',
  }
}))

const EstimateCreatePage = () => {
  const { wrapper_estimatePage, textButton, result, nullMaterials } = useStyles();
  // const { openedModal } = useContext(ModalContext);
  const { getEstimates } = useEstimateHook();
  const { estimates } = useContext(EstimateContext);
  const { openedModal } = useContext(ModalContext);
  const { name } = useParams();

  useEffect(() => {
    getEstimates(name).then();
  }, [getEstimates, name])


  const estimate = estimates[0]

  const handleAddMaterial = () => {
    openedModal({
      title: 'Добавление материала',
      children: <AddMaterialFormModal estimate={estimate} />,
      ifBlur: true,
    })
  }

  if (!estimate) return <div>Загрузка...</div>

  return (
    <>
      <EstimateBody estimate={estimate} />

      <div className={wrapper_estimatePage}>

        <div>
          <ButtonIcon onClick={handleAddMaterial}>
            <PlusIcon width={20} height={20} />
            <div className={textButton}>Добавить материал</div>
          </ButtonIcon>
        </div>

        {estimate.items.length > 0 ? (
          <>
            <TableEstimate />
            <div className={result}>ИТОГО: {estimate.total}</div>
          </>
        ) : (
          <div className={nullMaterials}>Добавьте материал</div>
        )}

      </div>
    </>
  );
};

export default EstimateCreatePage;
