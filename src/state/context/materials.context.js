import React, {createContext, useState} from 'react';

export const MaterialContext = createContext();

const MaterialContextProvider = ({ children }) => {

  const [materialsState, setMaterialsState] = useState([]);

  return (
    <MaterialContext.Provider value={{ materialsState, setMaterialsState }}>
      {children}
    </MaterialContext.Provider>
  );
}

export default MaterialContextProvider;
