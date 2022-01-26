import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "react-jss";
import { theme } from "./lib/theme";
import './index.css';
import ModalContextProvider from "./state/context/modal.context";
import MaterialContextProvider from "./state/context/materials.context";
import EstimateContextProvider from "./state/context/estimate.context";
import AlertContextProvider from "./state/context/alert.context";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MaterialContextProvider>
          <EstimateContextProvider>
            <AlertContextProvider>
              <ModalContextProvider>
                <App />
              </ModalContextProvider>
            </AlertContextProvider>
          </EstimateContextProvider>
        </MaterialContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
