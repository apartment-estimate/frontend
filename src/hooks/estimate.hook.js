import { httpRequest } from "../http/config";
import { useCallback, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {AlertContext} from "../state/context/alert.context";
import Alert from "../components/ui/Alert";
import {EstimateContext} from "../state/context/estimate.context";

export const useEstimateHook = () => {
  const { setEstimates } = useContext(EstimateContext);
  const [loading, setLoading] = useState(false);
  const { visibleAlert } = useContext(AlertContext);
  // const navigate = useNavigate();



  const getEstimates = useCallback( async (search = '') => {
    setLoading(true);
    const request = await httpRequest('GET',  `estimates?search=${search}`);
    if (request.status === 200) {
      setEstimates(request.data.estimates);
    }
    setLoading(false);
  }, [setEstimates]);



  const createEstimate = useCallback( async (data) => {
    setLoading(true);
    const request = await httpRequest('POST',  'estimates', data);

    if (request.status === 200) return request;
    if (request.status !== 200) {
      console.log(request)
      visibleAlert({
       children: <Alert code={request.status} text={request.message} />
      })
    }
    await getEstimates();
    setLoading(false);
  }, [getEstimates, visibleAlert])



  const changeEstimateApi = useCallback( async (data, name) => {
    setLoading(true);
    const request = await httpRequest('PUT',  `estimates/${name}`, data);

    if (request.status === 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Изменено" />
      })
      await getEstimates(name);
      setLoading(false);
      return request;
    }

    if (request.status !== 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Не удалось изменить" />
      })
    }
    setLoading(false);
  }, [getEstimates, visibleAlert])


  const deletedEstimate = async (name) => {
    const request = await httpRequest('DELETE', `estimates/${name}`);
    if (request.status === 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Удалено" />
      })
      await getEstimates(name);
    }
    if (request.status !== 200) {
      visibleAlert({
        children: <Alert code={request.status} text={request.message} />
      })
    }
    await getEstimates();
  }

  return {
    changeEstimateApi,
    createEstimate,
    getEstimates,
    deletedEstimate,
    loading,
  }
}
