import React from 'react';
import Input from "../ui/Input";
import Button from "../ui/buttons/Button";
import { useInput } from "../../hooks/input.hook";

const CreateDataEstimate = () => {
  const nameEstimate = useInput('');

  return (
    <div>
      <Input value={nameEstimate.value} setValue={(e) => nameEstimate.setValue(e)} placeholder="Название для сметы"/>
      <Button name="Создать"/>
    </div>
  );
};

export default CreateDataEstimate;
