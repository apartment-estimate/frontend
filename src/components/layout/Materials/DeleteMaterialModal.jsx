import React, {useContext} from 'react';
import {createUseStyles} from "react-jss";
import Button from "../../ui/buttons/Button";
import {useMaterialsHook} from "../../../hooks/materials.hook";
import {ModalContext} from "../../../state/context/modal.context";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    gap: 20,
  },
  item: {
    textAlign: 'center',
  },
}))

const DeleteMaterialModal = ({ material }) => {
  const { wrapper, item } = useStyles();
  const { closeModal } = useContext(ModalContext);
  const { deletedMaterial } = useMaterialsHook();

  const onHandleDeleted = async () => {
    await deletedMaterial(material.name);
    closeModal();
  }

  return (
    <div className={wrapper}>
      <h3 className={item}>Удалить материал?</h3>
      <p className={item}>{material.name}</p>
      <Button onClick={onHandleDeleted} name="Удалить" type="button" />
    </div>
  );
};

export default DeleteMaterialModal;
