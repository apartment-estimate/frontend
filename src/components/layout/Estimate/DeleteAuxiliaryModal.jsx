import React, {useContext} from 'react';
import {createUseStyles} from "react-jss";
import Button from "../../ui/buttons/Button";
import {useEstimateHook} from "../../../hooks/estimate.hook";
import {ModalContext} from "../../../state/context/modal.context";

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

const DeleteAuxiliaryModal = ({ estimate, item, deleteItem }) => {
  const { wrapper, itemStyles } = useStyles();
  const { closeModal } = useContext(ModalContext);
  const { changeEstimateApi } = useEstimateHook();

  const onHandleDeleted = async () => {
    estimate.items.map((i) => {
      if (i.name === item.name && i.stage === item.stage) {
        i.auxiliary = i.auxiliary.filter(auxiliaryItem => auxiliaryItem._id !== deleteItem._id);
      }
    })

    await changeEstimateApi(estimate, estimate.name )
    closeModal();
  }

  return (
    <div className={wrapper}>
      <h3 className={itemStyles}>Удалить материал?</h3>
      <p className={itemStyles}>{deleteItem.name}</p>
      <Button onClick={onHandleDeleted} name="Удалить" type="button" />
    </div>
  );
};

export default DeleteAuxiliaryModal;
