import axios from 'axios';
export const URL = 'http://62.113.99.170:8281';

export const httpRequest = async (method, endpoint, data) => {
  try {
    return await axios({
      method: method,
      url: `${URL}/${endpoint}`,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token ? token : tokenClient}`,
      },
    });
  } catch (e) {
    return {
      status: e.response.status,
      message: e.response.data.error,
    }
  }
};
