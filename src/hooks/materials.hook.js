import { httpRequest } from "../http/config";
import { useCallback, useContext, useState } from "react";
import { MaterialContext } from "../state/context/materials.context";
import {AlertContext} from "../state/context/alert.context";
import Alert from "../components/ui/Alert";

export const useMaterialsHook = () => {
  const { setMaterialsState } = useContext(MaterialContext);
  const [loading, setLoading] = useState(false);
  const { visibleAlert } = useContext(AlertContext);


  const getMaterials = useCallback( async (search = '') => {
    setLoading(true);
    const request = await httpRequest('GET',  `materials?search=${encodeURIComponent(search)}`);
    setMaterialsState(request.data.materials);
    setLoading(false);
    return request.data
  }, [setMaterialsState]);


  const createMaterials = useCallback( async (data) => {
    setLoading(true);
    const request = await httpRequest('POST',  'materials', data);

    if (request.status === 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Сохранено" />
      })
      await getMaterials();
    }
     if (request.status !== 200) {
       visibleAlert({
         children: <Alert code={request.status} text="Не удалось сохранить" />
       })
     }
    setLoading(false);
  }, [getMaterials, visibleAlert])


  const changeMaterialApi = useCallback( async (data, name) => {
    setLoading(true);
    const request = await httpRequest('PUT',  `materials/${encodeURIComponent(name)}`, data);

    if (request.status === 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Изменено" />
      })
      await getMaterials();
    }
    if (request.status !== 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Не удалось изменить" />
      })
    }
    setLoading(false);
  }, [getMaterials, visibleAlert])


  const deletedMaterial = async (name) => {
    const request = await httpRequest('DELETE', `materials/${encodeURIComponent(name)}`);
    if (request.status === 200) {
      visibleAlert({
        children: <Alert code={request.status} text="Удалено" />
      })
      await getMaterials();
    }
    if (request.status !== 200) {
      visibleAlert({
        children: <Alert code={request.status} text={request.message} />
      })
    }
    await getMaterials();
  }

  return {
    changeMaterialApi,
    createMaterials,
    getMaterials,
    deletedMaterial,
    loading,
  }
}
