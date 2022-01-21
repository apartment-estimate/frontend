import { useEffect, useState } from 'react';

export const useValidation = (value, checked, validations, regex) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthErr, setMinLengthErr] = useState(false);
  const [maxLengthErr, setMaxLengthErr] = useState(false);
  const [isEmail, setEmail] = useState(false);
  const [isAccept, setAccept] = useState(false);
  const [isValidForm, setValidForm] = useState(false);

  useEffect(() => {
    for (const validate in validations) {
      switch (validate) {
        case 'isEmpty':
          if (value) {
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
          }
          break;
        case 'minLength':
          if (value?.length < validations[validate] && value.length !== 0) {
            setMinLengthErr(true);
          } else {
            setMinLengthErr(false);
          }
          break;
        case 'maxLength':
          if (value?.length > 20) {
            setMaxLengthErr(true);
          } else {
            setMaxLengthErr(false);
          }
          break;
        case 'isEmail':
          // eslint-disable-next-line max-len
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(String(value).toLowerCase())) {
            setEmail(true);
          } else {
            setEmail(false);
          }
          break;
        case 'isAccept':
          if (checked) {
            setAccept(true);
          } else {
            setAccept(false);
          }
          break;
        default:
          break;
      }
    }
  }, [value, checked]);

  useEffect(() => {
    if (isEmpty || minLengthErr || maxLengthErr || isEmail || isAccept) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [isEmpty, minLengthErr, maxLengthErr, isEmail, isAccept]);

  return {
    setIsEmpty,
    setMinLengthErr,
    setMaxLengthErr,
    setEmail,
    setAccept,
    isEmpty,
    minLengthErr,
    maxLengthErr,
    isEmail,
    isValidForm,
    isAccept,
    regex,
  };
};
