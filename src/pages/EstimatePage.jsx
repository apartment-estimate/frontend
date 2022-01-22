import React from 'react';
import TitlePage from "../components/ui/TitlePage";
// import { ModalContext } from "../state/context/modal.context";
import {createUseStyles} from "react-jss";
import Input from "../components/ui/Input";
import Button from "../components/ui/buttons/Button";
import {useInput} from "../hooks/input.hook";
import AddMaterialForm from "../components/layout/AddMaterialForm";
import TableEstimate from "../components/layout/Estimate/TableEstimate";

const useStyles = createUseStyles((theme) => ({
  nameWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
  },
  input: {
    width: '100%'
  },
  buttonStyle: {
    width: 200,
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  }
}))

const EstimatePage = () => {

  const { wrapper, nameWrapper, input, buttonStyle } = useStyles();
  // const { openedModal } = useContext(ModalContext);

  const name = useInput('');

  // const createEstimate = () => {
  //   openedModal({
  //     title: 'Создание новой сметы',
  //     children: <CreateDataEstimate />,
  //     ifBlur: true,
  //   });
  // }

  return (
    <>
      <TitlePage title="Страница создания сметы" />
      <div className={wrapper}>
        <div className={nameWrapper}>
          <Input
            value={name.value}
            setValue={(e) => name.onChange(e)}
            styles={input}
            placeholder="Название сметы"
          />
          <Button styles={buttonStyle} name="Создать" />
        </div>
        <AddMaterialForm />
        <TableEstimate />
      </div>
    </>
  );
};

export default EstimatePage;
