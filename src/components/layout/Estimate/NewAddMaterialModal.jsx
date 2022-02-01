import React, {useContext, useEffect, useState} from 'react';
import {createUseStyles} from "react-jss";
import Input from "../../ui/Input";
import Button from "../../ui/buttons/Button";
import {useInput} from "../../../hooks/input.hook";
import SelectSearch from "../../ui/SelectSearch";
import {useEstimateHook} from "../../../hooks/estimate.hook";
import {ModalContext} from "../../../state/context/modal.context";
import {stageList} from "../../../state/mock/еstimateMock";
import Select from "../../ui/Select";
import {PlusIcon} from "../../ui/icons/Plus.icon";
import ButtonIcon from "../../ui/buttons/ButtonIcon";
import {EditIcon} from "../../ui/icons/Edit.icon";
import {httpRequest} from "../../../http/config";

const useStyles = createUseStyles((theme) => ({
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    alignContent: 'start',
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
  iconPlus: {
    textAlign: 'start',
    '& svg': {
      fill: theme.color.dim,
    },
  },
  textButton: {
    marginLeft: 10,
  },
  options: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxHeight: 300,
    backgroundColor: theme.color.main,
    textAlign: 'center',
    visibility: 'hidden',
    opacity: 0,
    transition: 'all .4s',
    overflowY: 'auto',
  },
  optionItem: {
    display: 'flex',
    padding: '8px 16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color.dim,
    },
  },
  visited: {
    visibility: 'visible',
    opacity: 1,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}))

const AddMaterialFormModal = ({ estimate }) => {
  const { form, name_and_section, material_wrapper, iconPlus, textButton, options, optionItem, visited, wrapper } = useStyles();
  const { changeEstimateApi } = useEstimateHook();
  const { closeModal } = useContext(ModalContext);
  const [load, setLoad] = useState(false);


  const [openStage, setOpenStage] = useState(false);
  const [stage, setStage] = useState('');

  const [openNameMaterial, setOpenNameMaterial] = useState(false);
  const [listMaterials, setListMaterials] = useState([]);
  const [addedMaterial, setAddedMaterial] = useState({});


  // const [materialSearch, setMaterialSearch] = useState('');

  const amount = useInput('', '', { isFilter: true, additionalProcessing: 'onlyNumbers'});
  const coeffIndividual = useInput(1, '', { isFilter: true, additionalProcessing: 'onlyNumbers'});

  // const [openSelectMaterialSearch, setOpenSelectMaterialSearch] = useState(false);

  const addMaterial = async (e) => {
    e.preventDefault();

    const dataMaterial = {
      stage: stage, //Этап проведения строительных работ
      amount: amount.value, // Количество основного материала
      coeffIndividual: coeffIndividual.value, //Индивидуальный повышающий коэффициент для основного материала
      ...addedMaterial, // выбранный материал
    }
    await changeEstimateApi({...estimate, items: [ ...estimate.items, dataMaterial] }, estimate.name);
    closeModal();
  }


  const selectedStage = (item) => {
    setStage(item);
    setOpenStage(false);
  };

  const openedMaterials = async () => {
    setLoad(true)
    setOpenNameMaterial(true);
    const res = await httpRequest('GET', `materials`);
    const arrBasic = res.data.materials.filter(item => item.purpose === 'basic');
    if (res.status === 200) {
      setListMaterials(arrBasic);
      setLoad(false);
    }
  }

  const selectedNameMaterial = (item) => {
    setAddedMaterial(item);
    setOpenNameMaterial(false);
  }


  const [listMaterialsSections, setListMaterialsSections] = useState([]);

  useEffect(() => {
    const listMaterialsSections = listMaterials.map((item) => {
      return item.category
    })
    setListMaterialsSections([...new Set(listMaterialsSections)])
  }, [listMaterials])

  return (
    <form className={form}>

      {stage.length <= 0 ? (
        <div className={wrapper}>
          <ButtonIcon styles={iconPlus} onClick={() => setOpenStage(true)}>
            <PlusIcon width={20} height={20} />
            <div className={textButton}>Выбрать раздел</div>
          </ButtonIcon>
        </div>
      ) : (
        <div className={wrapper}>
          <div>
            <span>Раздел: </span>
            <span>{stage}</span>
          </div>
          <ButtonIcon styles={iconPlus} onClick={() => setOpenStage(true)}>
            <EditIcon width={16} height={16} />
          </ButtonIcon>
        </div>
      )}

      <div className={`${options} ${openStage ? visited : ''}`}>
        {stageList.map((item) => {
          return <div onClick={() => selectedStage(item)} className={optionItem} key={item}>{item}</div>
        })}
      </div>


      {!addedMaterial.name ? (
        <div className={wrapper}>
          <ButtonIcon styles={iconPlus} onClick={openedMaterials}>
            <PlusIcon width={20} height={20} />
            <div className={textButton}>Выбрать материал</div>
          </ButtonIcon>
        </div>
      ) : (
        <div className={wrapper}>
          <div>
            <span>Материал: </span>
            <span>{addedMaterial.name}</span>
          </div>
          <ButtonIcon styles={iconPlus} onClick={openedMaterials}>
            <EditIcon width={16} height={16} />
          </ButtonIcon>
        </div>
      )}

      <div className={`${options} ${openNameMaterial ? visited : ''}`}>
        {listMaterialsSections.map((category) => {
          if (load) return <div>Загрузка</div>
          return (
            <div>
              <div style={{ textAlign: 'start', fontWeight: 700 }}>{category}</div>
              <div>
                {listMaterials.map((item) => {
                  if (item.category === category) {
                    return (
                      <div onClick={() => selectedNameMaterial(item)} className={optionItem} key={item._id}>
                        <span>{item.name}</span>
                        <span style={{ width: 60 }}>({item.unit})</span>
                        <span style={{ marginLeft: 'auto', textAlign: 'end', width: 80 }}>{item.priceNet} р.</span>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>


        {/*<div className={name_and_section}>*/}
        {/*  <div className={name_and_section}>*/}

        {/*    <Select*/}
        {/*      value={stage}*/}
        {/*      setValue={setStage}*/}
        {/*      options={stageList}*/}
        {/*      placeholder="Выбрать раздел"*/}
        {/*    />*/}

        {/*    <SelectSearch*/}
        {/*      value={materialSearch}*/}
        {/*      setValue={setMaterialSearch}*/}
        {/*      openSelect={openSelectMaterialSearch}*/}
        {/*      setOpenSelect={setOpenSelectMaterialSearch}*/}
        {/*      placeholder="Выбрать материал"*/}
        {/*      setAddedMaterial={setAddedMaterial}*/}
        {/*    />*/}

        {/*  </div>*/}

      <div className={material_wrapper}>
        <Input value={amount.value} setValue={(e) => amount.onChange(e)} placeholder="Кол-во" />
        <Input value={coeffIndividual.value} setValue={(e) => coeffIndividual.onChange(e)} placeholder="Коэффициент" />

      </div>

      <Button onClick={addMaterial} name="Добавить материал" type="button" />
        {/*</div>*/}

    </form>
  );
};

export default AddMaterialFormModal;
