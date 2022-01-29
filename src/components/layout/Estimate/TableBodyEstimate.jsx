import React, {useContext} from 'react';
import TableRow from "../../ui/Table/TableRow";
import TableCell from "../../ui/Table/TableCell";
import ButtonIcon from "../../ui/buttons/ButtonIcon";
import {EditIcon} from "../../ui/icons/Edit.icon";
import {DeletedIcon} from "../../ui/icons/Deleted.icon";
import {createUseStyles} from "react-jss";
import {ModalContext} from "../../../state/context/modal.context";
import DeleteMaterialEstimateModal from "./DeleteMaterialEstimateModal";
import {EstimateContext} from "../../../state/context/estimate.context";

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
  }
}))

const TableBodyEstimate = () => {
  const { cellStyles, iconWrapper } = useStyles();
  const { openedModal } = useContext(ModalContext);
  const { estimates } = useContext(EstimateContext);

  const estimate = estimates[0]
  const onHandleChangeMaterial = () => {

  }


  const onHandleDeleteMaterial = async (item) => {
    // const newItems = estimate.items.filter(item => item._id !== material._id);
    // const newEstimate = { ...estimate, items: newItems }

    openedModal({
      title: '',
      children: <DeleteMaterialEstimateModal estimate={estimate} item={item} />,
    })
  }

  let i = 1;

  return (
    <>
    {estimate.items.map((item) => {

      // if (item.stage === category) {

        return (
          <TableRow key={i++}>
            <TableCell textCell={item.name} position="start" />
            <TableCell width={50} textCell={item.amount} position="center" />
            <TableCell width={60} textCell={item.coeffIndividual} position="center" />
            <TableCell width={100} textCell={item.priceTotal} position="end" />
            <TableCell width={70} styles={cellStyles} position="center" >
              <div className={iconWrapper}>
                <ButtonIcon onClick={() => onHandleChangeMaterial(item)}>
                  <EditIcon width={16} height={16} />
                </ButtonIcon>
                <ButtonIcon onClick={() => onHandleDeleteMaterial(item) }>
                  <DeletedIcon width={16} height={16} />
                </ButtonIcon>
              </div>
            </TableCell>
          </TableRow>
        )
      // }
    })}
    </>
  );
};

export default TableBodyEstimate;
