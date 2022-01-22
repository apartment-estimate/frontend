import React from 'react';
import Input from "../ui/Input";
import Button from "../ui/buttons/Button";
import {createUseStyles} from "react-jss";
import {useInput} from "../../hooks/input.hook";
import {modPrice} from "../../utils/modPrice";

const useStyles = createUseStyles((theme) => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    alignItems: 'end',
    gap: 20,
  },
  nameMaterial: {
    gridColumnStart: 1,
    gridColumnEnd: -1,
  },
}))

const CreateMaterialForm = () => {
  const { form, nameMaterial } = useStyles();

  const name = useInput('');
  const unit = useInput('');
  const price = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const ratio = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const noCreateMaterial = (e) => {
    e.preventDefault();
    const material = {
      name: name.value,
      unit: unit.value,
      price: price.value,
      ratio: ratio.value,
    }
    console.log(material);
  };

  return (
    <form className={form} action="">
      <Input value={name.value} setValue={(e) => name.onChange(e)} styles={nameMaterial} placeholder="Наименование материала" />
      <Input value={unit.value} setValue={(e) => unit.onChange(e)} placeholder="Ед. измерения" />
      <Input value={modPrice(price.value)} setValue={(e) => price.onChange(e)} placeholder="Цена за единицу" />
      <Input value={ratio.value} setValue={(e) => ratio.onChange(e)} placeholder="Коэффициент" />
      <Button onClick={noCreateMaterial} name="Добавить материал" type="submit" />
    </form>
  );
};

export default CreateMaterialForm;
