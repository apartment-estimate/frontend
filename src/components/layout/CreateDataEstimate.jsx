import React from 'react';
import Input from "../ui/Input";
import Button from "../ui/buttons/Button";
import { useInput } from "../../hooks/input.hook";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }
}))

const CreateDataEstimate = () => {
  const { wrapper } = useStyles();
  const nameEstimate = useInput('');

  return (
    <div className={wrapper}>
      <Input value={nameEstimate.value} setValue={(e) => nameEstimate.onChange(e)} placeholder="Название для сметы"/>
      <Button name="Создать"/>
    </div>
  );
};

export default CreateDataEstimate;
