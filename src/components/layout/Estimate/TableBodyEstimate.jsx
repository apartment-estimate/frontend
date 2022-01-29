import React, {Fragment, useContext} from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";
import ButtonIcon from "../../ui/buttons/ButtonIcon";
import {EditIcon} from "../../ui/icons/Edit.icon";
import {DeletedIcon} from "../../ui/icons/Deleted.icon";
import {createUseStyles} from "react-jss";
import {ModalContext} from "../../../state/context/modal.context";
import DeleteMaterialEstimateModal from "./DeleteMaterialEstimateModal";
import {EstimateContext} from "../../../state/context/estimate.context";
import {PlusIcon} from "../../ui/icons/Plus.icon";
import AddAuxiliaryFormModal from "./AddAuxiliaryFormModal";
import ChangeAuxiliaryFormModal from "./ChangeAuxiliaryFormModal";
import ChangeMaterialFormModal from "./ChangeMaterialFormModal";
import DeleteAuxiliaryModal from "./DeleteAuxiliaryModal";

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
    width: '100%',
  },
  auxiliaryCell: {
    paddingLeft: 60,
  },
}))

const TableBodyEstimate = ({ category }) => {
  const { cellStyles, iconWrapper, auxiliaryCell } = useStyles();
  const { openedModal } = useContext(ModalContext);
  const { estimates } = useContext(EstimateContext);

  const estimate = estimates[0]

  const onHandleChangeMaterial = (item) => {
    openedModal({
      title: item.name,
      children: <ChangeMaterialFormModal estimate={estimate} changeItem={item} />,
    })
  }

  const onHandleDeleteMaterial = async (item) => {
    openedModal({
      title: '',
      children: <DeleteMaterialEstimateModal estimate={estimate} item={item} />,
    })
  }

  const onAddAuxiliaryMaterial = async (item) => {
    openedModal({
      title: item.name,
      children: <AddAuxiliaryFormModal estimate={estimate} item={item} />,
    })
  }

  const onChangeAuxiliaryMaterial = async (item, changeItem) => {
    openedModal({
      title: item.name,
      children: <ChangeAuxiliaryFormModal estimate={estimate} item={item} changeItem={changeItem} />,
    })
  }

  const onDeleteAuxiliary = async (item, deleteItem) => {
    openedModal({
      title: '',
      children: <DeleteAuxiliaryModal estimate={estimate} item={item} deleteItem={deleteItem} />,
    })
  }


  let i = 1;

  return (
    <>
    {estimate.items.map((item) => {

      if (item.stage === category) {
        return (
          <Fragment key={item._id}>
            <TableRow>
              <TableCell textCell={item.name} position="start" />
              <TableCell width={50} textCell={item.amount} position="center" />
              <TableCell width={60} textCell={item.coeffIndividual} position="center" />
              <TableCell width={100} textCell={item.priceTotal} position="end" />
              <TableCell width={70} styles={cellStyles} position="center" >
                <div className={iconWrapper}>
                  <ButtonIcon onClick={() => onAddAuxiliaryMaterial(item)}>
                    <PlusIcon width={16} height={16} />
                  </ButtonIcon>
                  <ButtonIcon onClick={() => onHandleChangeMaterial(item)}>
                    <EditIcon width={16} height={16} />
                  </ButtonIcon>
                  <ButtonIcon onClick={() => onHandleDeleteMaterial(item) }>
                    <DeletedIcon width={16} height={16} />
                  </ButtonIcon>
                </div>
              </TableCell>
            </TableRow>
            {item.auxiliary.map((itemAuxiliary) => {
              return (
                <TableRow key={i++}>
                  <TableCell textCell={itemAuxiliary.name} position="start" styles={auxiliaryCell} />
                  <TableCell width={50} textCell={itemAuxiliary.amount} position="center" />
                  <TableCell width={60} textCell={itemAuxiliary.coeffIndividual} position="center" />
                  <TableCell width={100} textCell={itemAuxiliary.priceNet} position="end" />
                  <TableCell width={70} styles={cellStyles} position="center" >
                    <div className={iconWrapper}>
                      <ButtonIcon onClick={() => onChangeAuxiliaryMaterial(item, itemAuxiliary)}>
                        <EditIcon width={16} height={16} />
                      </ButtonIcon>
                      <ButtonIcon onClick={() => onDeleteAuxiliary(item, itemAuxiliary) }>
                        <DeletedIcon width={16} height={16} />
                      </ButtonIcon>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </Fragment>
        )
      }
    })}
    </>
  );
};

export default TableBodyEstimate;
