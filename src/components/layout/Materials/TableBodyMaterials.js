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
  iconWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  cellName: {
    '@media (max-width: 767px)': {
      gridColumnStart: 1,
      gridColumnEnd: 5,
    },
  },
  cellPrice: {
    width: 70,
    // '@media (max-width: 767px)': {
    //   width: 'auto',
    // },
  },
  cellButtonsContent: {
    width: 70,
    '@media (max-width: 767px)': {
      width: 'auto',
    },
  },
  cellButtons: {
    '& svg': {
      fill: 'gray',
    },
    '&:hover': {
      '& svg': {
        fill: theme.color.dim,
      }
    },
    // '@media (max-width: 420px)': {
    //   gridColumnStart: 1,
    //   gridColumnEnd: 5,
    // },
  },
}))

const TableBodyMaterials = ({ materials }) => {
  const { iconWrapper, cellPrice, cellButtonsContent, cellButtons, cellName } = useStyles();
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
          <TableCell textCell={row.name} stylesTd={cellName} position="start" />
          <TableCell textCell={row.unit} position="center" />
          <TableCell contentContent={cellPrice} textCell={modPrice(row.priceNet)} position="end" />
          <TableCell contentContent={cellButtonsContent} stylesTd={cellButtons} position="center" >
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
