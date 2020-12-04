import axios from 'axios';
import { availableApi } from './utils';
const REQUEST_TIMEOUT = 60000;

export const requestHandler = async (
  apiKey: string,
  path: string,
  method: string = 'GET',
  params: object = {},
  headers: object = {},
  additional_options: any
) => {
  const api = availableApi(apiKey);
  const requestOptions = {
    method,
    headers,
    url: `${api}${path}`,
    timeout: REQUEST_TIMEOUT,
    ...additional_options
  };

  if (Object.values(params).length) {
    if (method === 'GET' && params && Object.keys(params).length) {
      requestOptions.params = params;
    } else {
      requestOptions.data = params;
    }
  }

  return axios(requestOptions)
    .then((res) => {
      return { success: true, status: res.status, data: res.data };
    })
    .catch((err) => {
      const error = handleAxiosError(err);
      console.error(err);

      return { success: false, ...error };
    });
};

interface RequestError {
  response: {
    status: number;
    data: any;
  };
  code: number;
  request: string;
}

interface ResponseError {
  status: number;
  data?: any;
  request?: string;
}

const handleAxiosError = (err: RequestError): ResponseError => {
  if (err.response) {
    return {
      status: err.response.status,
      data: err.response.data
    };
  }
  return { status: err.code, request: err.request };
};
