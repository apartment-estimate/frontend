import React, {useContext} from 'react';
import Table from "../../ui/Table/Table";
import TableHead from "../../ui/Table/TableHead";
import {estimateTableHeaderMock} from "../../../state/mock/materialsMock";
import TableBodyEstimate from "./TableBodyEstimate";
import {EstimateContext} from "../../../state/context/estimate.context";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles(() => ({
  cell_section: {
    fontWeight: 700,
    height: 40,
  }
}))

const TableEstimate = () => {
  const { cell_section } = useStyles();
  const { estimate } = useContext(EstimateContext);


  return (
    <>
      {(estimate.materials.length > 0 || estimate.sections.length > 0) && (
        <Table>
          <TableHead cellHeader={estimateTableHeaderMock} />
          {estimate.sections.map((section) => {
            return (
              <tbody key={section}>

                <tr style={{ textAlign: 'center' }}>
                  <td className={cell_section}>{section}</td>
                </tr>

                <TableBodyEstimate estimates={estimate.materials} category={section} />

              </tbody>
            )
          })}
        </Table>
      )}
    </>
  );
};

export default TableEstimate;
