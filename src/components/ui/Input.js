import React from 'react';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  label_wrapper: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    background: 'transparent',
    border: `1px solid ${theme.borderColor.main}`,
    borderRadius: 3,
    padding: '0 16px',
    // color: '',
    filter: 'none',
    '&:focus-visible': {
      outline: '1px solid #8488f1',
    },
    '&::-webkit-input-placeholder': {
      // color: typography.color,
    },
    '&::-moz-placeholder': {
      // color: typography.color,
    },
    '&::-moz-placeholder, :-moz-placeholder': {
      opacity: 1,
      background: 'transparent',
    },
    '&:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0 1000px transparent inset',
    },
    '&:not(input:-webkit-autofill)::-webkit-contacts-auto-fill-button': {
      // backgroundColor: icons.main,
    },
    '&:not(input:-webkit-autofill)::-webkit-credentials-auto-fill-button': {
      // backgroundColor: icons.main,
    },
  },
  labelInput: {
    fontSize: 12,
  },
}))

const Input = ({ placeholder, value, setValue }) => {
  const { label_wrapper, input, labelInput } = useStyles();

  return (
    <label className={label_wrapper}>
      <span className={labelInput}>{placeholder}</span>
      <input className={input} type="text" value={value} onChange={setValue}/>
    </label>
  );
};

export default Input;
