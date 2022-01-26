import React, {useContext, useState} from 'react';
import {createUseStyles} from "react-jss";
import Input from "../ui/Input";
import Button from "../ui/buttons/Button";
import {useInput} from "../../hooks/input.hook";
import {EstimateContext} from "../../state/context/estimate.context";
import Select from "../ui/Select";
import SelectSearch from "../ui/SelectSearch";

const useStyles = createUseStyles(() => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'end',
    gap: 20,
  },
  section_wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
  },
  name_and_section: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
  },
  material_wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
  },
}))

const AddMaterialForm = () => {
  const { form, section_wrapper, name_and_section, material_wrapper } = useStyles();
  const { estimate, setEstimate } = useContext(EstimateContext);

  const [nameCategory, setNameCategory] = useState('');
  const [materialSearch, setMaterialSearch] = useState('');
  const [section, setSection] = useState('');
  const amount = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const coeffIndividual = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const [openSelectMaterialSearch, setOpenSelectMaterialSearch] = useState(false);

  // const namesMaterials = materialsState.map(item => {
  //   return item.name;
  // })

  const addSectionEstimate = (e) => {
    e.preventDefault();
    setEstimate({ ...estimate, sections: [ ...estimate.sections, nameCategory ] })
  }

  const addMaterial = (e) => {
    e.preventDefault();

    const dataMaterial = {
      name: materialSearch, //Наименование основного материала
      stage: section, //Этап проведения строительных работ
      amount: amount.value, // Количество основного материала
      coeffIndividual: coeffIndividual.value, //Индивидуальный повышающий коэффициент для основного материала
    }
    setEstimate({ ...estimate, materials: [ ...estimate.materials, dataMaterial ] })

    setNameCategory('');
    setMaterialSearch('');
    setSection('');
    amount.reset();
    coeffIndividual.reset();
  }

  // const createMaterial = () => {
  //   openedModal({
  //     title: 'Добавить новый материал',
  //     children: <div>sadfsadfsdf</div>,
  //     ifBlur: true,
  //   });
  // }

  return (
    <form className={form}>

      {estimate.name && (
        <div className={section_wrapper}>
          <Input value={nameCategory} setValue={(e) => setNameCategory(e.target.value)} placeholder="Название раздела" />
          <Button onClick={addSectionEstimate} name="Добавить раздел сметы" type="button" />
        </div>
      )}

      {estimate.sections.length > 0 && (
        <div>
          <div className={name_and_section}>

            <SelectSearch
              value={materialSearch}
              setValue={setMaterialSearch}
              openSelect={openSelectMaterialSearch}
              setOpenSelect={setOpenSelectMaterialSearch}
              placeholder="Выбрать материал"
            />

            <Select
              value={section}
              setValue={setSection}
              options={estimate.sections}
              placeholder="Выбрать раздел"
            />

          </div>
          <div className={material_wrapper}>
            <Input value={amount.value} setValue={(e) => amount.onChange(e)} placeholder="Кол-во" />
            <Input value={coeffIndividual.value} setValue={(e) => coeffIndividual.onChange(e)} placeholder="Коэффициент" />
            <Button onClick={addMaterial} name="Добавить материал" type="button" />
          </div>
        </div>
      )}

    </form>
  );
};

export default AddMaterialForm;
