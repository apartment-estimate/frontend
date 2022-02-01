import React, {useContext, useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {createUseStyles, useTheme} from "react-jss";
import AddMaterialFormModal from "../components/layout/Estimate/AddMaterialFormModal";
import TableEstimate from "../components/layout/Estimate/TableEstimate";
import EstimateBody from "../components/layout/Estimate/EstimateBody";
import ButtonIcon from "../components/ui/buttons/ButtonIcon";
import {PlusIcon} from "../components/ui/icons/Plus.icon";
import {ModalContext} from "../state/context/modal.context";
import {useEstimateHook} from "../hooks/estimate.hook";
import {EstimateContext} from "../state/context/estimate.context";
import {modPrice} from "../utils/modPrice";
import {PrintIcon} from "../components/ui/icons/Print.icon";
import NewAddMaterialModal from "../components/layout/Estimate/NewAddMaterialModal";

const useStyles = createUseStyles((theme) => ({
  wrapper_estimatePage: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 30,
    marginTop: 50,
  },
  textButton: {
    marginLeft: 10,
  },
  result: {
    marginTop: 40,
    fontSize: 20,
    textAlign: 'end',
  },
  nullMaterials: {
    fontSize: 20,
    textAlign: 'center',
  },
  iconPlus: {
    '& svg': {
      fill: theme.color.dim,
    },
  },
  resultTotal: {
    fontSize: 26,
    margin: 20,
  },
  buttonsActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  printLink: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const EstimateCreatePage = () => {
  const { wrapper_estimatePage, textButton, result, nullMaterials, iconPlus, resultTotal, buttonsActions, printLink } = useStyles();
  const { getEstimates } = useEstimateHook();
  const { estimates } = useContext(EstimateContext);
  const { openedModal } = useContext(ModalContext);
  const { name } = useParams();
  const theme = useTheme();

  useEffect(() => {
    getEstimates(name).then();
  }, [getEstimates, name])


  const estimate = estimates[0]

  const handleAddMaterial = () => {
    openedModal({
      title: 'Добавление материала',
      // children: <AddMaterialFormModal estimate={estimate} />,
      children: <NewAddMaterialModal estimates={estimates} estimate={estimate} />,
      ifBlur: true,
    })
  }

  if (!estimate) return <div>Загрузка...</div>

  return (
    <>
      <EstimateBody estimate={estimate} />

      <div className={wrapper_estimatePage}>

        <div className={buttonsActions}>
          <ButtonIcon styles={iconPlus} onClick={handleAddMaterial}>
            <PlusIcon width={20} height={20} />
            <div className={textButton}>Добавить материал</div>
          </ButtonIcon>
          <NavLink className={printLink} to={`print`}>
            <PrintIcon width={20} height={20} fill={theme.color.dim}/>
            <div className={textButton}>Версия для печати</div>
          </NavLink>
        </div>

        {estimate.items.length > 0 ? (
          <>
            <TableEstimate />
            <div className={result}>
              ИТОГО:
              <span className={resultTotal}>{modPrice(estimate.totalEstimate)}</span>
            </div>
          </>
        ) : (
          <div className={nullMaterials}>Добавьте материал</div>
        )}

      </div>
    </>
  );
};

export default EstimateCreatePage;
