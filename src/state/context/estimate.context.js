import React, {createContext, useState} from 'react';

export const EstimateContext = createContext();

const EstimateContextProvider = ({ children }) => {

  const [estimate, setEstimate] = useState({
    name: null,
    sections: [],
    materials: [],
    materialsSearch: [],
    timerId: null,
  });
  // const [materials, setMaterials] = useState([]);

  return (
    <EstimateContext.Provider value={{ estimate, setEstimate }}>
      {children}
    </EstimateContext.Provider>
  );
}

export default EstimateContextProvider;
