import React, {useContext, useState} from 'react';
import {createUseStyles} from "react-jss";
import Input from "../../ui/Input";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
import SelectSearch from "../../ui/SelectSearch";
import {useEstimateHook} from "../../../hooks/estimate.hook";
import {ModalContext} from "../../../state/context/modal.context";
import {stageList} from "../../../state/mock/еstimateMock";
import Select from "../../ui/Select";

const useStyles = createUseStyles((theme) => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    gap: 20,
    minHeight: 300,
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

const AddMaterialFormModal = ({ estimate }) => {
  const { form, name_and_section, material_wrapper } = useStyles();
  const { changeEstimateApi } = useEstimateHook();
  const { closeModal } = useContext(ModalContext);

  const [materialSearch, setMaterialSearch] = useState('');
  const [stage, setStage] = useState('');
  const amount = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const coeffIndividual = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const [openSelectMaterialSearch, setOpenSelectMaterialSearch] = useState(false);

  const addMaterial = async (e) => {
    e.preventDefault();

    const dataMaterial = {
      name: materialSearch, //Наименование основного материала
      stage: stage, //Этап проведения строительных работ
      amount: amount.value, // Количество основного материала
      coeffIndividual: coeffIndividual.value, //Индивидуальный повышающий коэффициент для основного материала
    }
    await changeEstimateApi({...estimate, items: [ ...estimate.items, dataMaterial] }, estimate.name);
    closeModal();
  }


  return (
    <form className={form}>

        <div className={name_and_section}>
          <div className={name_and_section}>

            <Select
              value={stage}
              setValue={setStage}
              options={stageList}
              placeholder="Выбрать раздел"
            />

            <SelectSearch
              value={materialSearch}
              setValue={setMaterialSearch}
              openSelect={openSelectMaterialSearch}
              setOpenSelect={setOpenSelectMaterialSearch}
              placeholder="Выбрать материал"
            />

          </div>

          <div className={material_wrapper}>
            <Input value={amount.value} setValue={(e) => amount.onChange(e)} placeholder="Кол-во" />
            <Input value={coeffIndividual.value} setValue={(e) => coeffIndividual.onChange(e)} placeholder="Коэффициент" />
          </div>

          <Button onClick={addMaterial} name="Добавить материал" type="button" />
        </div>

    </form>
  );
};

export default AddMaterialFormModal;
