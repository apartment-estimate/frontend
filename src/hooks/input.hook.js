import { useState } from 'react';
import { useValidation } from './useValidate';
import { correctName, returnNumber } from '../utils/regexpFunctions';

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
    onBlur,
    isDirty,
    reset,
    ...valid,
  };
};
