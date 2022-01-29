import React, {createContext, useState} from 'react';

export const EstimateContext = createContext();

const EstimateContextProvider = ({ children }) => {

  const [estimates, setEstimates] = useState([]);

  return (
    <EstimateContext.Provider value={{ estimates, setEstimates }}>
      {children}
    </EstimateContext.Provider>
  );
}

export default EstimateContextProvider;
