import React, {useContext, useEffect} from 'react';
import {createUseStyles} from "react-jss";
import ButtonIcon from "../components/ui/buttons/ButtonIcon";
import {PlusIcon} from "../components/ui/icons/Plus.icon";
import {ModalContext} from "../state/context/modal.context";
import CreateEstimateForm from "../components/layout/Estimate/CreateEstimateForm";
import {useEstimateHook} from "../hooks/estimate.hook";
import {EstimateContext} from "../state/context/estimate.context";
import CardEstimate from "../components/ui/CardEstimate";

const useStyles = createUseStyles((theme) => ({
  wrapper_estimatePage: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  },
  wrapper_estimateCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20,
  }
}))

const EstimatePage = () => {
  const { wrapper_estimatePage, wrapper_estimateCards } = useStyles();
  const { openedModal } = useContext(ModalContext);

  const { getEstimates } = useEstimateHook();
  const { estimates } = useContext(EstimateContext);

  useEffect(() => {
    getEstimates().then();
  }, [getEstimates])

  const handleCreateMaterial = () => {
    openedModal({
      title: 'Создание материала',
      children: <CreateEstimateForm />,
      ifBlur: true,
    })
  }

  return (
    <>
      <div className={wrapper_estimatePage}>

        <div>
          <ButtonIcon onClick={handleCreateMaterial}>
            <PlusIcon width={20} height={20} />
            <div style={{ marginLeft: 10 }}>Создать новую смету</div>
          </ButtonIcon>
        </div>

        <div className={wrapper_estimateCards}>
          {estimates.map((estimate) => <CardEstimate key={estimate._id} item={estimate} />)}
        </div>

      </div>
    </>
  );
};

export default EstimatePage;
