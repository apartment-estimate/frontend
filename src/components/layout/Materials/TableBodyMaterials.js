import React, {useContext} from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";
import {modPrice} from "../../../utils/modPrice";
import ButtonIcon from "../../ui/buttons/ButtonIcon";
import {DeletedIcon} from "../../ui/icons/Deleted.icon";
import {createUseStyles} from "react-jss";
import {EditIcon} from "../../ui/icons/Edit.icon";
import {ModalContext} from "../../../state/context/modal.context";
import CreateMaterialForm from "../CreateMaterialForm";
import DeleteMaterialModal from "./DeleteMaterialModal";

const useStyles = createUseStyles((theme) => ({
  cellStyles: {
    '& svg': {
      fill: 'gray',
    },
    '&:hover': {
      '& svg': {
        fill: 'red',
      }
    },
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  }
}))

const TableBodyMaterials = ({ materials }) => {
  const { cellStyles, iconWrapper } = useStyles();
  const { openedModal } = useContext(ModalContext);

  const onHandleChangeMaterial = (material) => {
    openedModal({
      title: 'Создание материала',
      children: <CreateMaterialForm changeMaterial={material} />,
      ifBlur: true,
    })
  }

  const onHandleDeleteMaterial = (material) => {
    openedModal({
      title: '',
      children: <DeleteMaterialModal material={material} />,
    })
  }

  return (
    <tbody>
    {materials.map((row) => {
      return (
        <TableRow key={row.name}>
          <TableCell textCell={row.name} position="start" />
          <TableCell textCell={row.unit} position="center" />
          <TableCell width={100} textCell={modPrice(row.priceNet)} position="end" />
          <TableCell width={50} styles={cellStyles} position="center" >
            <div className={iconWrapper}>
              <ButtonIcon onClick={() => onHandleChangeMaterial(row)}>
                <EditIcon width={16} height={16} />
              </ButtonIcon>
              <ButtonIcon onClick={() => onHandleDeleteMaterial(row) }>
                <DeletedIcon width={16} height={16} />
              </ButtonIcon>
            </div>
          </TableCell>
        </TableRow>
      )
    })}
    </tbody>
  );
};

export default TableBodyMaterials;
