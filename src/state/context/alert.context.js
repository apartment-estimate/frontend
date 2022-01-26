import React, {createContext, useState} from 'react';
import Alert from "../../components/ui/Alert";

export const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState(null);


  const closeAlert = () => {
    // setTimeout(() => setAlertVisible(false), 4000)
    document.querySelector('body').style.overflow = 'auto';
    setAlertVisible(false)
    // return () => timer;
  };


  const visibleAlert = (modalConfig) => {
    document.querySelector('body').style.overflow = 'hidden';
    setAlertContent(modalConfig);
    setAlertVisible(true);
    // closeAlert();
  };


  return (
    <AlertContext.Provider
      value={{
        visibleAlert,
        closeAlert,
        alertVisible,
      }}
    >
      {alertVisible && <Alert {...alertContent} />}
      {children}
    </AlertContext.Provider>
  );
}
export default AlertContextProvider;
