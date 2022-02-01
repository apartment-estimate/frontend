import { useState } from 'react';
import { correctName, returnNumber } from '../utils/regexpFunctions';
import {useValidation} from "./validate.hook";

export const useInput = (initialValue, validations, isFilter) => {
  const [value, setValue] = useState(initialValue);
  const [checked, setChecked] = useState(initialValue);

  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, checked, validations);

  const onChange = (e) => {
    if (isFilter) {
      switch (isFilter?.additionalProcessing) {
        case 'onlyNumbers':
          setValue(returnNumber(e.target.value));
          break;
        case 'toLowerCase':
          setValue(e.target.value.replace(isFilter.find, isFilter.repl).toLowerCase());
          break;
        case 'name':
          setValue(correctName(e.target.value));
          break;
        default:
          setValue(e.target.value.replace(isFilter.find, isFilter.repl));
          break;
      }
      return;
    }
    setValue(e.target.value);
    setChecked(e.target.checked);
  };

  const onEdit = (name) => {
    setValue(name);
  }

  const reset = () => {
    setValue('');
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    setValue,
    checked,
    onChange,
    onEdit,
    onBlur,
    isDirty,
    reset,
    ...valid,
  };
};
