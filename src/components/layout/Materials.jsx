import React from 'react';
import Table from "../ui/Table/Table";
import {materialsMock} from "../../state/mock/materialsMock";

const Materials = () => {

  return (
    <>
      <Table materialsMock={materialsMock} />
    </>
  );
};

export default Materials;
