import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MaterialPage from "./pages/MaterialPage";
import EstimatePage from "./pages/EstimatePage";
import NotFoundPage from "./pages/NotFoundPage";

import { Layout } from "./components/layout/Layout";
import EstimateCreatePage from "./pages/EstimateCreatePage";

function App() {
  return (
    <>
      <Routes >
        <Route path="/" element={ <Layout /> } >
          <Route index element={ <HomePage /> } />
          <Route path="material" element={ <MaterialPage /> } />
          <Route path="estimates" element={ <EstimatePage /> } />
          <Route path="estimates/:name" element={ <EstimateCreatePage /> } />
          <Route path="*" element={ <NotFoundPage /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
