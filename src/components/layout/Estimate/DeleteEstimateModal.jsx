import React, {useContext} from 'react';
import {createUseStyles} from "react-jss";
import Button from "../../ui/buttons/Button";
import {ModalContext} from "../../../state/context/modal.context";
import {useEstimateHook} from "../../../hooks/estimate.hook";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    gap: 20,
  },
  itemStyles: {
    textAlign: 'center',
  },
}))

const DeleteEstimateModal = ({ estimate }) => {
  const { wrapper, itemStyles } = useStyles();
  const { closeModal } = useContext(ModalContext);
  const { deletedEstimate } = useEstimateHook();

  const onHandleDeleted = async () => {
    await deletedEstimate(estimate.name )
    closeModal();
  }

  return (
    <div className={wrapper}>
      <h3 className={itemStyles}>Удалить смету?</h3>
      <p className={itemStyles}>{estimate.name}</p>
      <Button onClick={onHandleDeleted} name="Удалить" type="button" />
    </div>
  );
};

export default DeleteEstimateModal;
