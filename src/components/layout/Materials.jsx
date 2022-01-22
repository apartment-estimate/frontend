import React from 'react';
import Table from "../ui/Table/Table";
import {materialsMock} from "../../state/mock/materialsMock";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    marginTop: 50,
  },
}))


const Materials = () => {
  const { wrapper } = useStyles();

  return (
    <div className={wrapper}>
      <Table materialsMock={materialsMock} />
    </div>
  );
};

export default Materials;
