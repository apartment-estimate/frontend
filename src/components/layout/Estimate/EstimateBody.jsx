import React, {useContext, useState} from 'react';
import ButtonIcon from "../../ui/buttons/ButtonIcon";
import {EditIcon} from "../../ui/icons/Edit.icon";
import {theme} from "../../../lib/theme";
import Input from "../../ui/Input";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
import {createUseStyles} from "react-jss";
import {EstimateContext} from "../../../state/context/estimate.context";

const useStyles = createUseStyles(() => ({
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
  nameReadyWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
}))

const EstimateBody = () => {
  const { nameWrapper, input, nameReadyWrapper } = useStyles();
  const [nameEstimate, setNameEstimate] = useState(null);
  const { estimate, setEstimate } = useContext(EstimateContext);

  const name = useInput('');

  const createEstimate = () => {
    setNameEstimate(name.value);

    setEstimate({ ...estimate, name: name.value})
  }

  return (
    <>
      {nameEstimate
        ? (
          <div className={nameReadyWrapper}>
            <h2>{nameEstimate}</h2>
            <ButtonIcon onClick={() => setNameEstimate(null)} >
              <EditIcon width={20} height={20} fill={ theme.color.dim} />
            </ButtonIcon>
          </div>
        ) : (
          <div className={nameWrapper}>
            <Input
              value={name.value}
              setValue={(e) => name.onChange(e)}
              styles={input}
              placeholder="Название сметы"
            />
            <Button onClick={createEstimate} name={estimate.name ? "Изменить" : "Создать"} />
          </div>
        )
      }
    </>
  );
};

export default EstimateBody;
