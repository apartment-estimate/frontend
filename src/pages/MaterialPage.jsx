import React, {useContext} from 'react';
import TitlePage from "../components/ui/TitlePage";
import {createUseStyles} from "react-jss";
import CreateMaterialForm from "../components/layout/CreateMaterialForm";
import TableMaterials from "../components/layout/Materials/TableMaterials";
import ButtonIcon from "../components/ui/buttons/ButtonIcon";
import {PlusIcon} from "../components/ui/icons/Plus.icon";
import {ModalContext} from "../state/context/modal.context";

const useStyles = createUseStyles(() => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  }
}))

const MaterialPage = () => {
  const { wrapper } = useStyles();
  const { openedModal } = useContext(ModalContext);

  const handleCreateMaterial = () => {
    openedModal({
      title: 'Создание материала',
      children: <CreateMaterialForm />,
      // children: <div>sadfsdfs</div>,
      ifBlur: true,
    })
  }

  return (
    <div >
      <TitlePage title="Материалы" />
      <div className={wrapper}>

        <div>
          <ButtonIcon onClick={handleCreateMaterial}>
            <PlusIcon width={60} height={60} />
          </ButtonIcon>
        </div>

        {/*<CreateMaterialForm />*/}
        <TableMaterials />
      </div>
    </div>
  );
};

export default MaterialPage;
