import React, {useContext, useState} from 'react';
import {createUseStyles} from "react-jss";
import Input from "../../ui/Input";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
import SelectSearch from "../../ui/SelectSearch";
import {useEstimateHook} from "../../../hooks/estimate.hook";
import {ModalContext} from "../../../state/context/modal.context";

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
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
  },
}))

const AddAuxiliaryFormModal = ({ estimate, item }) => {
  const { form, name_and_section, material_wrapper } = useStyles();
  const { changeEstimateApi } = useEstimateHook();
  const { closeModal } = useContext(ModalContext);

  const [addedMaterial, setAddedMaterial] = useState({});
  const [materialSearch, setMaterialSearch] = useState('');
  const amount = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const [openSelectMaterialSearch, setOpenSelectMaterialSearch] = useState(false);

  const addMaterial = async (e) => {
    e.preventDefault();

    const auxiliary = {
      // name: materialSearch, //Наименование сопутствующего материала
      amount: amount.value, // Количество сопутствующего материала
      ...addedMaterial,
    }

    estimate.items.map((i) => {
      if (i.name === item.name && i.stage === item.stage) {
        i.auxiliary = [...i.auxiliary, auxiliary]
      }
    })

    await changeEstimateApi(estimate, estimate.name);
    closeModal();
  }

  return (
    <form className={form}>

        <div className={name_and_section}>
          <div className={name_and_section}>

            <SelectSearch
              purpose
              value={materialSearch}
              setValue={setMaterialSearch}
              openSelect={openSelectMaterialSearch}
              setOpenSelect={setOpenSelectMaterialSearch}
              placeholder="Выбрать сопутствующий материал"
              setAddedMaterial={setAddedMaterial}
            />

          </div>

          <div className={material_wrapper}>
            <Input value={amount.value} setValue={(e) => amount.onChange(e)} placeholder="Кол-во" />
            <Button onClick={addMaterial} name="Добавить материал" type="button" />
          </div>

        </div>

    </form>
  );
};

export default AddAuxiliaryFormModal;
