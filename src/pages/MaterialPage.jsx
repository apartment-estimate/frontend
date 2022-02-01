import React, {useContext} from 'react';
import TitlePage from "../components/ui/TitlePage";
import {createUseStyles} from "react-jss";
import CreateMaterialForm from "../components/layout/CreateMaterialForm";
import TableMaterials from "../components/layout/Materials/TableMaterials";
import ButtonIcon from "../components/ui/buttons/ButtonIcon";
import {PlusIcon} from "../components/ui/icons/Plus.icon";
import {ModalContext} from "../state/context/modal.context";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  },
  textButton: {
    marginLeft: 10,
  },
  iconPlus: {
    '& svg': {
      fill: theme.color.dim,
    },
    '&:hover': {
      '& svg': {
        fill: theme.color.dim,
      }
    },
  }
}))

const MaterialPage = () => {
  const { wrapper, textButton, iconPlus } = useStyles();
  const { openedModal } = useContext(ModalContext);

  const handleCreateMaterial = () => {
    openedModal({
      title: 'Создание материала',
      children: <CreateMaterialForm />,
      ifBlur: true,
    })
  }

  return (
    <div >
      <TitlePage title="Материалы" />
      <div className={wrapper}>

        <div>
          <ButtonIcon styles={iconPlus} onClick={handleCreateMaterial}>
            <PlusIcon width={20} height={20} />
            <div className={textButton}>Добавить материал в базу</div>
          </ButtonIcon>
        </div>

        <TableMaterials />

      </div>
    </div>
  );
};

export default MaterialPage;
