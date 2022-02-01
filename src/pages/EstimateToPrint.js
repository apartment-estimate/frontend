import React, {useContext, useEffect, useRef} from 'react';
import {createUseStyles, useTheme} from "react-jss";
import {NavLink, useParams} from "react-router-dom";
import {useReactToPrint} from "react-to-print";
import {modPrice} from "../utils/modPrice";
import {EstimateContext} from "../state/context/estimate.context";
import {useEstimateHook} from "../hooks/estimate.hook";
import TitlePage from "../components/ui/TitlePage";
import ButtonIcon from "../components/ui/buttons/ButtonIcon";
import {PrintIcon} from "../components/ui/icons/Print.icon";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: 'gray',
  },
  wrapperA4: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 877,
    minHeight: 1240,
    boxShadow: '0px 0px 20px 0px #d7d7d782',
  },
  a4: {
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
    paddingLeft: 60,
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  table: {
    marginTop: 40,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 90px 80px 100px 100px',
    '&:first-child': {
      borderBottom: '1px solid #000000'
    },
  },
  cellHead: {
    fontWeight: 700,
    paddingBottom: 5,
    '&:first-child': {
      paddingLeft: 4,
    },
  },
  cellBody: {
    paddingTop: 8,
    paddingBottom: 8,
    '&:first-child': {
      paddingLeft: 4,
    },
    '&:last-child': {
      paddingRight: 4,
    },
  },
  center: {
    textAlign: 'center',
  },
  end: {
    textAlign: 'end',
  },
  start: {
    textAlign: 'start',
  },
  iconPrint: {
    position: 'absolute',
    top: 60,
    right: 90,
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 60,
    fontSize: 26,
    textAlign: 'end',
  },
  resultTotal: {
    // fontSize: 26,
    // fontWeight: 700,
    margin: '0 5px 0 20px',
  },
  dateText: {
    fontSize: 16,
  },
  linkToBack: {
    color: theme.color.dim,
    position: 'absolute',
    top: 38,
    left: 104,
    transition: 'all .4s',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const EstimateToPrint = () => {
  const { wrapper, wrapperA4, a4, table, footer, resultTotal, row, cellHead, cellBody, start, center, end, iconPrint, dateText, linkToBack } = useStyles();
  const { getEstimates } = useEstimateHook();
  const { name } = useParams();
  const { estimates } = useContext(EstimateContext);
  const componentRef = useRef();
  const theme = useTheme();
  let i = 1;

  useEffect(() => {
    getEstimates(name).then();
  }, [getEstimates, name])

  const estimate = estimates[0];


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const date = new Date(estimate?.date).toLocaleDateString();

  if (!estimate) return <div>Загрузка...</div>

  return (
    <div className={wrapper}>
      <ButtonIcon styles={iconPrint} onClick={handlePrint}>
        <PrintIcon width={50} height={50} fill={theme.color.dim}/>
      </ButtonIcon>
      <NavLink className={linkToBack} to={`/estimates/${name}`}>Вернуться к смете</NavLink>

      <div className={wrapperA4}>
        <div ref={componentRef} className={a4}>
          <h1 >{estimate.name}</h1>
          <p>Жилой комплекс:  {estimate.residence}</p>
          <p>Тип планировки:  {estimate.layout}</p>
          <p>Клиент:  {estimate.customer}</p>

          <div className={table}>
            <div className={row}>
              <div className={`${cellHead}`}>Материал/работа</div>
              <div className={`${cellHead} ${center}`}>Ед.изм.</div>
              <div className={`${cellHead} ${center}`}>Кол-во</div>
              <div className={`${cellHead} ${center}`}>Цена</div>
              <div className={`${cellHead} ${center}`}>Сумма</div>
            </div>
            {estimate.items.map((materialBase) => {

              return (
                <div key={i++} className={row}>
                  <div className={`${cellBody} ${start}`}>{materialBase.name}</div>
                  <div className={`${cellBody} ${center}`}>{materialBase.unit}</div>
                  <div className={`${cellBody} ${center}`}>{materialBase.amount}</div>
                  <div className={`${cellBody} ${end}`}>{materialBase.priceBrutto}</div>
                  <div className={`${cellBody} ${end}`}>{materialBase.totalBrutto}</div>
                </div>
              )
            })}
          </div>

          {/*<TableEstimate />*/}
          <div className={footer}>
            <span className={dateText}>{date}</span>
            <div>
              <span>ИТОГО: </span>
              <span className={resultTotal}>{modPrice(estimate.totalEstimate)}</span>
              <span>руб.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateToPrint;
