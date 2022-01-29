import React, { useState } from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  selectWrapper: {
    position: 'relative',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 40,
    background: 'transparent',
    border: `1px solid ${theme.borderColor.main}`,
    borderRadius: 3,
    padding: '0 16px',
    cursor: 'pointer',
  },
  optionsWrapper: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    backgroundColor: theme.color.main,
    border: `1px solid ${theme.borderColor.main}`,
    borderRadius: 5,
    padding: '16px 0',
    boxShadow: `0 0 25px ${theme.borderColor.main}`,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all .2s'
  },
  optionItem: {
    padding: '5px 16px',
    '&:hover': {
      backgroundColor: theme.color.dim,
      cursor: 'pointer',
    },
  },
  backgroundSelect: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    content: '""',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color.backdrop,
    opacity: 0,
    visibility: 'hidden',
    zIndex: 2,
  },
  optionsOpen: {
    opacity: 1,
    visibility: 'visible',
  },
  label: {
    fontSize: 12,
  },
}))

const Select = ({ value, setValue, options, placeholder, additionalStyles }) => {
  const { selectWrapper, select, optionsWrapper, optionItem, optionsOpen, backgroundSelect, label } = useStyles();
  const [openSelect, setOpenSelect] = useState(false);

  const onOpenSelected = () => {
    setOpenSelect(true);
  };

  const onCloseSelect = (option) => {
    setValue(option);
    setOpenSelect(false);
  }

  const onCloseToBackdrop = (e) => {
    e.stopPropagation();
    setOpenSelect(false)
  }

  return (
    <div className={selectWrapper}>
      <span className={label}>{placeholder}</span>
      <div className={select} onClick={onOpenSelected}>{value}</div>

      <div className={`${optionsWrapper} ${additionalStyles || ''} ${openSelect && optionsOpen}`}>
        {options.map((option) => {
          return (
            <div className={optionItem} key={option} onClick={() => onCloseSelect(option)}>
              {option}
            </div>
          )
        })}
      </div>

      <div
        className={ `${backgroundSelect} ${openSelect && optionsOpen}` }
        onClick={onCloseToBackdrop}
      />

    </div>
  );
};

export default Select;
