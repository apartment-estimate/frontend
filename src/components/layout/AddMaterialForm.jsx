import React from 'react';
import {createUseStyles} from "react-jss";
import Input from "../ui/Input";
import Button from "../ui/buttons/Button";
import {useInput} from "../../hooks/input.hook";

const useStyles = createUseStyles((theme) => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    alignItems: 'end',
    gap: 20,
  },
}))

const AddMaterialForm = () => {
  const { form } = useStyles();
  const name = useInput('')
  const quantity = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'})
  const ratio = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const addMaterial = (e) => {
    e.preventDefault();
    const dataEstimate = {
      name: name.value,
      quantity: quantity.value,
      ratio: ratio.value,
    }
    console.log(dataEstimate)
  }

  return (
    <form className={form}>
      <Input value={name.value} setValue={(e) => name.onChange(e)} placeholder="Название материала" />
      <Input value={quantity.value} setValue={(e) => quantity.onChange(e)} placeholder="Кол-во" />
      <Input value={ratio.value} setValue={(e) => ratio.onChange(e)} placeholder="Коэффициент" />
      <Button onClick={addMaterial} name="Добавить материал" type="submit" />
    </form>
  );
};

export default AddMaterialForm;
