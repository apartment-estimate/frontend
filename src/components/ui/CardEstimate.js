import React, {useContext} from 'react';
import {createUseStyles, useTheme} from "react-jss";
import {NavLink} from "react-router-dom";
import {DeletedIcon} from "./icons/Deleted.icon";
import ButtonIcon from "./buttons/ButtonIcon";
import {ModalContext} from "../../state/context/modal.context";
import DeleteEstimateModal from "../layout/Estimate/DeleteEstimateModal";
import {CopyIcon} from "./icons/Copy.icon";
import CreateCopyEstimateModal from "../layout/Estimate/CreateCopyEstimateModal";
import {EditIcon} from "./icons/Edit.icon";
import CreateEstimateForm from "../layout/Estimate/CreateEstimateForm";

const useStyles = createUseStyles((theme) => ({
  cardContainer: {
    width: 'auto',
    height: 200,
    padding: 20,
    borderRadius: 20,
    border: `1px solid ${theme.borderColor.main}`,
    boxShadow: `0px 0px 4px 0px ${theme.borderColor.main}`,
    cursor: 'pointer',
    transition: 'all .3s',
    position: 'relative',
    '&:hover': {
      border: `1px solid ${theme.color.dim60}`,
      boxShadow: `0px 0px 14px 0px ${theme.color.dim60}`,
    },
  },
  head: {
    fontSize: 16,
    fontWeight: 700,
  },
  buttonsBlock: {
    position: 'absolute',
    display: 'flex',
    bottom: 20,
    right: 20,
  },
  text: {
    margin: 0,
  },
}))

const CardEstimate = ({ item }) => {
  const { cardContainer, head, buttonsBlock, text } = useStyles();
  const { openedModal } = useContext(ModalContext);
  const theme = useTheme();

  const onCreateCopyEstimate = (e) => {
    e.preventDefault();
    openedModal({
      title: `Новая смета на основе "${item.name}"`,
      children: <CreateCopyEstimateModal estimate={item} />,
    })
  }

  const onChangeEstimate = (e) => {
    e.preventDefault();
    openedModal({
      title: item.name,
      children: <CreateEstimateForm changeEstimate={item} />,
    })
  }

  const onHandleDeleteEstimate = (e, estimate) => {
    e.preventDefault();
    openedModal({
      title: '',
      children: <DeleteEstimateModal estimate={estimate} item={item} />,
    })
  }
  console.log(item)
  return (
    <NavLink to={`/estimates/${item.name}`} className={cardContainer} >

      <h3 className={head}>{item.name}</h3>
      <p className={text}>{item.residence}</p>
      <p className={text}>{item.layout}</p>
      <p className={text}> Стиль: {item.style}</p>
      <p >{item.customer}</p>


      <div className={buttonsBlock}>
        <ButtonIcon onClick={(e) => onChangeEstimate(e) }>
          <EditIcon width={16} height={16} fill={theme.color.dim} />
        </ButtonIcon>
        <ButtonIcon onClick={(e) => onCreateCopyEstimate(e) }>
          <CopyIcon width={16} height={16} fill={theme.color.dim} />
        </ButtonIcon>
        <ButtonIcon onClick={(e) => onHandleDeleteEstimate(e, item) }>
          <DeletedIcon width={16} height={16} fill={theme.color.dim} />
        </ButtonIcon>
      </div>
    </NavLink>
  );
};

export default CardEstimate;
