import React, {useCallback, useEffect, useState} from 'react';
import {createUseStyles} from "react-jss";
import Input from "./Input";
// import {PlusIcon} from "./icons/Plus.icon";
// import ButtonIcon from "./buttons/ButtonIcon";
import {httpRequest} from "../../http/config";

const useStyles = createUseStyles((theme) => ({
  selectWrapper: {
    position: 'relative',
  },
  optionsWrapper: {
    position: 'absolute',
    zIndex: 3,
    width: '100%',
    minHeight: 40,
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
  inputWrapper: {
    position: 'relative',
  }
}))

const SelectSearch = ({ value, setValue, placeholder, openSelect, setOpenSelect }) => {
  const { selectWrapper, optionsWrapper, optionItem, optionsOpen, backgroundSelect, label, inputWrapper } = useStyles();
  // const [nameValue, setNameValue] = useState('');
  const [materialsOptions, setMaterialsOptions] = useState([]);
  const [access, setAccess] = useState(true);

  const onSearch = useCallback(async (search) => {
    if (!access) return;
    setOpenSelect(true);
    const res = await httpRequest('GET', `materials?search=${search}`);
    setMaterialsOptions(res.data.materials)
  }, [access, setOpenSelect])

  useEffect(() => {
    if (value.length > 0) {
      onSearch(value).then();
    }
  }, [value, onSearch])

  const handleChangeValue = async (e) => {
    setAccess(true)
    setValue(e.target.value);
  }

  const onChangeSelect = (name) => {
    console.log(name)
    setAccess(false)
    setValue(name);
    setOpenSelect(false);
    setMaterialsOptions([]);
  }

  const onCloseToBackdrop = (e) => {
    e.stopPropagation();
    setOpenSelect(false)
  }

  return (
    <div className={selectWrapper}>

      <span className={label}>{placeholder}</span>

      <div className={inputWrapper}>
        <Input value={value} setValue={handleChangeValue} />
        {/*<ButtonIcon*/}
        {/*  onClick={createMaterial}*/}
        {/*  style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: 40 }}*/}
        {/*>*/}
        {/*  <PlusIcon width={20} height={20} />*/}
        {/*</ButtonIcon>*/}
      </div>

      <div className={`${optionsWrapper} ${(openSelect && (materialsOptions?.length > 0)) ? optionsOpen : ''}`}>
        {materialsOptions.map((option) => {
          return (
            <div
              className={optionItem}
              key={option._id}
              onClick={() => onChangeSelect(option.name)}>
              {option.name}
            </div>
          )
        })}
      </div>

      <div
        className={ `${backgroundSelect} ${openSelect && materialsOptions?.length > 0 && optionsOpen}` }
        onClick={onCloseToBackdrop}
      />

    </div>
  );
};

export default SelectSearch;
