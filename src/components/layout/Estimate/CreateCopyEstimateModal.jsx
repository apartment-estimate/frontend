import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import {layoutList} from "../../../state/mock/еstimateMock";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
import {useEstimateHook} from "../../../hooks/estimate.hook";
import {createUseStyles} from "react-jss";
import {ModalContext} from "../../../state/context/modal.context";

const useStyles = createUseStyles((theme) => ({
  nameWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 20,
    width: '100%',
  },
  input: {
    width: '100%'
  },
  selectStyle: {
    bottom: 0,
  }
}))

const CreateCopyEstimateModal = ({ estimate }) => {
  const { nameWrapper, input, selectStyle } = useStyles();
  const { createEstimate } = useEstimateHook();
  const { closeModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const name = useInput('');
  const residence = useInput(estimate.residence || '');
  const [layout, setLayout] = useState(estimate.layout || '');
  const style = useInput(estimate.style || '');
  const coeffCommon = useInput(estimate.coeffCommon || '', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const customer = useInput(estimate?.customer || '');

  const onCreateEstimate = async () => {
    const copyEstimate = {
      ...estimate,
      name: name.value,
      residence: residence.value,
      coeffCommon: coeffCommon.value,
      style: style.value,
      customer: customer.value,
      layout,
    }

    const res = await createEstimate(copyEstimate);
    if (res.status === 200) {
      navigate(`/estimates/${res.data.estimate.name}`, {replace: true});
      closeModal();
    }
  }

  return (
    <div className={nameWrapper}>

      <Input
        value={name.value}
        setValue={(e) => name.onChange(e)}
        styles={input}
        placeholder="Название сметы"
      />

      <Input
        value={residence.value}
        setValue={(e) => residence.onChange(e)}
        styles={input}
        placeholder="Название жилого комплекса"
      />

      <Select
        additionalStyles={selectStyle}
        options={layoutList}
        setValue={setLayout}
        value={layout}
        placeholder="Тип планировки"
      />

      <Input
        value={style.value}
        setValue={(e) => style.onChange(e)}
        styles={input}
        placeholder="Стиль планировки"
      />

      <Input
        value={coeffCommon.value}
        setValue={(e) => coeffCommon.onChange(e)}
        styles={input}
        placeholder="Повышающий коэффициент для всей сметы"
      />

      <Input
        value={customer.value}
        setValue={(e) => customer.onChange(e)}
        styles={input}
        placeholder="Фамилия клиента"
      />

      <Button onClick={onCreateEstimate} name={"Создать"} />

    </div>
  );
};

export default CreateCopyEstimateModal;
