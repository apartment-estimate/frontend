import React, {useContext, useState} from 'react';
import Input from "../ui/Input";
import Button from "../ui/buttons/Button";
import {createUseStyles} from "react-jss";
import {useInput} from "../../hooks/input.hook";
import {modPrice} from "../../utils/modPrice";
import Select from "../ui/Select";
import {units} from "../../state/mock/unitsMock";
import {useMaterialsHook} from "../../hooks/materials.hook";
import {ModalContext} from "../../state/context/modal.context";
import {Checkbox} from "../ui/Checkbox";

const useStyles = createUseStyles(() => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'end',
    gap: 20,
  },
  group2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'end',
    gap: 20,
  },
  optionPosition: {
    bottom: 0,
  }
}))

const CreateMaterialForm = ({ changeMaterial }) => {
  const { form, group2, optionPosition } = useStyles();
  const { createMaterials, changeMaterialApi } = useMaterialsHook();
  const { closeModal } = useContext(ModalContext);

  const name = useInput(changeMaterial?.name || '');
  const category = useInput(changeMaterial?.category || '');
  const [unit, setUnit] = useState(changeMaterial?.unit || '');
  const priceNet = useInput(changeMaterial?.priceNet || '', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const [purpose, setPurpose] = useState((changeMaterial?.purpose === 'auxiliary' && true) || false);

  const noCreateMaterial = async (e) => {
    e.preventDefault();
    const materialData = {
      name: name.value,
      category: category.value,
      priceNet: +priceNet.value,
      _id: changeMaterial ? changeMaterial._id : null,
      purpose: purpose ? 'auxiliary' : 'basic',
      unit,
    }
    if (changeMaterial) {
      await changeMaterialApi(materialData, changeMaterial.name);
    } else {
      await createMaterials(materialData);
    }
    closeModal();
  };

  return (
    <form className={form} action="">
      <div>
        <Input value={name.value} setValue={(e) => name.onChange(e)} placeholder="Наименование материала" />
      </div>
      <Input value={category.value} setValue={(e) => category.onChange(e)} placeholder="Категория материала" />
      <div>
        <Checkbox
          checked={purpose}
          handlerChange={() => setPurpose(!purpose)}
        >
          <span>
            {purpose ? "Может содержать в себе сопутствующие материалы" : "Не может содержать в себе сопутствующие материалы" }
        </span>
        </Checkbox>
      </div>
      <div className={group2}>
        <Select positionOptions={optionPosition} options={units} setValue={setUnit} value={unit} placeholder="Единица измерения" />
        <Input value={modPrice(priceNet.value)} setValue={(e) => priceNet.onChange(e)} placeholder="Цена за единицу" />
        <Button onClick={noCreateMaterial} name={changeMaterial ? "Изменить материал" : "Добавить материал"} type="submit" />
      </div>
    </form>
  );
};

export default CreateMaterialForm;
