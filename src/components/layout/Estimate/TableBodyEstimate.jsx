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
import {modPrice} from "../../../utils/modPrice";

const useStyles = createUseStyles((theme) => ({
  iconWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    width: '100%',
  },
  auxiliaryCell: {
    paddingLeft: 60,
    '@media (max-width: 767px)': {
      paddingLeft: 16,
      gridColumnStart: 1,
      gridColumnEnd: 6,
    },
  },
  cellName: {
    '@media (max-width: 767px)': {
      gridColumnStart: 1,
      gridColumnEnd: 6,
    },
  },
  cellAmount: {
    width: 70,
    '@media (max-width: 767px)': {
      width: 'auto',
    },
  },
  cellCoeffIndividual: {
    width: 60,
    '@media (max-width: 767px)': {
      width: 'auto',
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
    '@media (max-width: 420px)': {
      gridColumnStart: 1,
      gridColumnEnd: 6,
    },
  },
}))

const TableBodyEstimate = ({ category }) => {
  const { iconWrapper, auxiliaryCell, iconPlus, cellName, cellAmount, cellCoeffIndividual, cellPrice, cellButtons, cellButtonsContent } = useStyles();
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
              <TableCell stylesTd={cellName} textCell={item.name} position="start" />
              <TableCell contentContent={cellAmount} textCell={`${item.amount} ${item.unit}`} position="center" />
              <TableCell contentContent={cellCoeffIndividual} textCell={item.coeffIndividual} position="center" />
              <TableCell contentContent={cellPrice} textCell={`${modPrice(item.priceNet)}`} position="end" />
              <TableCell contentContent={cellPrice} textCell={`${modPrice(item.totalNet)}`} position="end" />
              <TableCell contentContent={cellButtonsContent} stylesTd={cellButtons} position="center" >
                <div className={iconWrapper}>
                  {item.purpose === 'basic' && (
                    <ButtonIcon styles={iconPlus} onClick={() => onAddAuxiliaryMaterial(item)}>
                      <PlusIcon width={16} height={16} />
                    </ButtonIcon>
                  )}
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
                  <TableCell stylesTd={auxiliaryCell} textCell={itemAuxiliary.name} position="start" />
                  <TableCell contentContent={cellAmount} textCell={`${itemAuxiliary.amount} ${itemAuxiliary.unit}`} position="center" />
                  <TableCell contentContent={cellCoeffIndividual} textCell={itemAuxiliary.coeffIndividual} position="center" />
                  <TableCell contentContent={cellPrice} textCell={itemAuxiliary.priceNet} position="end" />
                  <TableCell contentContent={cellPrice} textCell={itemAuxiliary.totalNet} position="end" />
                  <TableCell contentContent={cellButtonsContent} stylesTd={cellButtons} position="center" >
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
