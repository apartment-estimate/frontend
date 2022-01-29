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

const DeleteMaterialEstimateModal = ({ estimate, item }) => {
  const { wrapper, itemStyles } = useStyles();
  const { closeModal } = useContext(ModalContext);
  const { changeEstimateApi } = useEstimateHook();

  const onHandleDeleted = async () => {
    const newItems = estimate.items.filter(i => i._id !== item._id);
    const newEstimate = { ...estimate, items: newItems }

    const res = await changeEstimateApi(newEstimate, estimate.name )
    if (res.status === 200)
    closeModal();
  }

  return (
    <div className={wrapper}>
      <h3 className={itemStyles}>Удалить материал?</h3>
      <p className={itemStyles}>{item.name}</p>
      <Button onClick={onHandleDeleted} name="Удалить" type="button" />
    </div>
  );
};

export default DeleteMaterialEstimateModal;
