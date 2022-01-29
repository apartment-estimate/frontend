import React, {useContext, useEffect, useState} from 'react';
import Table from "../../ui/Table/Table";
import TableHead from "../../ui/Table/TableHead";
import {estimateTableHeaderMock} from "../../../state/mock/materialsMock";
import TableBodyEstimate from "./TableBodyEstimate";
import {EstimateContext} from "../../../state/context/estimate.context";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles((theme) => ({
  cell_section: {
    height: 40,
    fontWeight: 'bold',
    verticalAlign: 'bottom',
  }
}))

const TableEstimate = () => {
  const { cell_section } = useStyles();

  const { estimates } = useContext(EstimateContext);
  const [stages, setStages] = useState([]);

  useEffect(() => {
    const arr = estimates[0].items.map((item) => item.stage)
    setStages([...new Set(arr)])
  }, [estimates])

  return (
    <Table>
      <TableHead cellHeader={estimateTableHeaderMock} />

      {stages.map((stage) => {
        return (
          <tbody key={stage}>

            <tr style={{ textAlign: 'center' }}>
              <td colSpan="5" className={cell_section}>{stage}</td>
            </tr>

            <TableBodyEstimate category={stage} />

          </tbody>
        )
      })}
    </Table>
  );
};

export default TableEstimate;
