import React, {useContext, useEffect, useState} from 'react';
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
import {MaterialContext} from "../../state/context/materials.context";

const useStyles = createUseStyles((theme) => ({
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
  const { materialsState } = useContext(MaterialContext);

  const name = useInput(changeMaterial?.name || '');
  const category = useInput(changeMaterial?.category || '');
  const [unit, setUnit] = useState(changeMaterial?.unit || '');
  const priceNet = useInput(changeMaterial?.priceNet || '', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const [purpose, setPurpose] = useState((changeMaterial?.purpose === 'basic' && true) || false);

  const noCreateMaterial = async (e) => {
    e.preventDefault();
    const materialData = {
      name: name.value,
      category: category.value,
      priceNet: +priceNet.value,
      _id: changeMaterial ? changeMaterial._id : null,
      purpose: purpose ? 'basic' : 'auxiliary',
      unit,
    }
    if (changeMaterial) {
      await changeMaterialApi(materialData, changeMaterial.name);
    } else {
      await createMaterials(materialData);
    }
    closeModal();
  };

  // const [listMaterialsSections, setListMaterialsSections] = useState([]);
  //
  // useEffect(() => {
  //   const listMaterialsSections = materialsState.map((item) => {
  //     return item.category
  //   })
  //   setListMaterialsSections([...new Set(listMaterialsSections)])
  // }, [materialsState])

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
            {purpose ? "Может содержать в себе сопутствующие материалы" : "Не может содержать в себе сопутствующие материалы"}
        </span>
        </Checkbox>
      </div>
      <div className={group2}>
        <Select additionalStyles={optionPosition} options={units} setValue={setUnit} value={unit} placeholder="Единица измерения" />
        <Input value={modPrice(priceNet.value)} setValue={(e) => priceNet.onChange(e)} placeholder="Цена за единицу" />
        <Button onClick={noCreateMaterial} name={changeMaterial ? "Изменить материал" : "Добавить материал"} type="submit" />
      </div>
    </form>
  );
};

export default CreateMaterialForm;
