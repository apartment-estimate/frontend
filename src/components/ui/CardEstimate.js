import React, {useContext} from 'react';
import {createUseStyles} from "react-jss";
import {NavLink} from "react-router-dom";
import {DeletedIcon} from "./icons/Deleted.icon";
import ButtonIcon from "./buttons/ButtonIcon";
import {ModalContext} from "../../state/context/modal.context";
import DeleteEstimateModal from "../layout/Estimate/DeleteEstimateModal";

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
  deleteIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
}))

const CardEstimate = ({ item }) => {
  const { cardContainer, head, deleteIcon } = useStyles();
  const { openedModal } = useContext(ModalContext);

  const onHandleDeleteEstimate = (e, estimate) => {
    e.preventDefault();
    openedModal({
      title: '',
      children: <DeleteEstimateModal estimate={estimate} item={item} />,
    })
  }

  return (
    <NavLink to={`/estimates/${item.name}`} className={cardContainer} >
      <h3 className={head}>{item.name}</h3>
      <p>{item.residence}</p>
      <p>{item.layout}</p>
      <div className={deleteIcon}>
        <ButtonIcon onClick={(e) => onHandleDeleteEstimate(e, item) }>
          <DeletedIcon width={16} height={16} fill="red" />
        </ButtonIcon>
      </div>
    </NavLink>
  );
};

export default CardEstimate;
