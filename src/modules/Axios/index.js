import axios from "axios";

const REQUEST_TIMEOUT = 20000;

export const requestHandler = async (
  url,
  method = "GET",
  params,
  headers = {},
  additional_options
) => {
  let requestOptions = {
    method,
    headers,
    url,
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

  axios.interceptors.request.use((req) => {
    console.log(`${req.method} ${req.url}`);
    return req;
  });

  axios.interceptors.response.use((res) => {
    console.log(res.data);
    return res;
  });

  return axios(requestOptions)
    .then((res) => {
      return { success: true, ...res };
    })
    .catch((err) => {
      const error = handleAxiosError(err);
      console.error(error);
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
  return { status: err.code, url: err.config.baseURL, request: error.request };
};
