import React from 'react';
import Table from "../../ui/Table/Table";
import TableHead from "../../ui/Table/TableHead";
import {estimateTableHeaderMock} from "../../../state/mock/materialsMock";
import TableBodyEstimate from "./TableBodyEstimate";
// import {createUseStyles} from "react-jss";


// const useStyles = createUseStyles((theme) => ({
//
// }))

const TableEstimate = () => {
  // const {  } = useStyles();


  return (
    <>
      {/*{(materials.length > 0 || estimate.sections.length > 0) && (*/}
        <Table>
          <TableHead cellHeader={estimateTableHeaderMock} />
          <tbody >
            <TableBodyEstimate />
          </tbody>

          {/*{materials.map((section) => {*/}
          {/*  return (*/}
          {/*    <tbody key={section}>*/}

          {/*      <tr style={{ textAlign: 'center' }}>*/}
          {/*        <td className={cell_section}>{section}</td>*/}
          {/*      </tr>*/}

          {/*      <TableBodyEstimate estimates={estimate.materials} category={section} />*/}

          {/*    </tbody>*/}
          {/*  )*/}
          {/*})}*/}
        </Table>
      {/*)}*/}
    </>
  );
};

export default TableEstimate;
