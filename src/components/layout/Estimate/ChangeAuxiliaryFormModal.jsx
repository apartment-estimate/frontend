import React, {useContext} from 'react';
import {createUseStyles} from "react-jss";
import Input from "../../ui/Input";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
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
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
  },
}))

const ChangeAuxiliaryFormModal = ({ estimate, item, changeItem }) => {
  const { form, name_and_section, material_wrapper } = useStyles();
  const { changeEstimateApi } = useEstimateHook();
  const { closeModal } = useContext(ModalContext);

  const amount = useInput(changeItem.amount || '', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const price = useInput(changeItem.priceNet || '', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  const addMaterial = async (e) => {
    e.preventDefault();

    estimate.items.map((i) => {
      if (i.name === item.name && i.stage === item.stage) {
        i.auxiliary.map((auxiliaryItem) => {
          if (auxiliaryItem._id === changeItem._id) {
            auxiliaryItem.amount = amount.value
            auxiliaryItem.priceNet = price.value

          }
        })
      }
    })

    await changeEstimateApi(estimate, estimate.name);
    closeModal();
  }

  return (
    <form className={form}>

        <div className={name_and_section}>

          <div className={material_wrapper}>
            <Input value={amount.value} setValue={(e) => amount.onChange(e)} placeholder="Кол-во" />
            <Input value={price.value} setValue={(e) => price.onChange(e)} placeholder="Цена" />
            <Button onClick={addMaterial} name="Изменить" type="button" />
          </div>

        </div>

    </form>
  );
};

export default ChangeAuxiliaryFormModal;
