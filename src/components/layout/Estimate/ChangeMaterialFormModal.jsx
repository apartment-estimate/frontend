import React, {useContext, useState} from 'react';
import {createUseStyles} from "react-jss";
import Input from "../../ui/Input";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
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

const ChangeMaterialFormModal = ({ estimate, changeItem }) => {
  const { form, name_and_section, material_wrapper } = useStyles();
  const { changeEstimateApi } = useEstimateHook();
  const { closeModal } = useContext(ModalContext);

  const [stage, setStage] = useState(changeItem.stage || '');
  const amount = useInput(changeItem.amount || '', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const coeffIndividual = useInput(changeItem.coeffIndividual || 1, '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const addMaterial = async (e) => {
    e.preventDefault();

    estimate.items.map((i) => {
      if (i.name === changeItem.name && i.stage === changeItem.stage) {
        i.stage = stage
        i.amount = amount.value
        i.coeffIndividual = coeffIndividual.value
      }
    })

    await changeEstimateApi(estimate, estimate.name);
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

          </div>

          <div className={material_wrapper}>
            <Input value={amount.value} setValue={(e) => amount.onChange(e)} placeholder="Кол-во" />
            <Input value={coeffIndividual.value} setValue={(e) => coeffIndividual.onChange(e)} placeholder="Коэффициент" />
          </div>

          <Button onClick={addMaterial} name="Изменить" type="button" />
        </div>

    </form>
  );
};

export default ChangeMaterialFormModal;
