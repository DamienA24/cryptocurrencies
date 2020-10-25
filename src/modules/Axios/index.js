import axios from "axios";
import { availableApi } from "./utils.js";

const REQUEST_TIMEOUT = 60000;

export const requestHandler = async (
  apiKey,
  path,
  method = "GET",
  params = {},
  headers = {},
  additional_options
) => {
  const api = availableApi(apiKey);
  let requestOptions = {
    method,
    headers,
    url: `${api}${path}`,
    timeout: REQUEST_TIMEOUT,
    ...additional_options,
  };

  if (Object.values(params).length) {
    if (method === "GET" && params && Object.keys(params).length) {
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

const handleAxiosError = (err) => {
  if (err.response) {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
  return { status: err.code, request: err.request };
};
