import React, {useContext} from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";
import {modPrice} from "../../../utils/modPrice";
import ButtonIcon from "../../ui/buttons/ButtonIcon";
import {DeletedIcon} from "../../ui/icons/Deleted.icon";
import {createUseStyles} from "react-jss";
import {useMaterialsHook} from "../../../hooks/materials.hook";
import {EditIcon} from "../../ui/icons/Edit.icon";
import {ModalContext} from "../../../state/context/modal.context";
import CreateMaterialForm from "../CreateMaterialForm";

const useStyles = createUseStyles(() => ({
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
  const { deletedMaterial } = useMaterialsHook();
  const { openedModal } = useContext(ModalContext);

  const onHandleChangeMaterial = (material) => {
    openedModal({
      title: 'Создание материала',
      children: <CreateMaterialForm changeMaterial={material} />,
      // children: <div>sadfsdfs</div>,
      ifBlur: true,
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
              <ButtonIcon onClick={() => deletedMaterial(row.name) }>
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
