/** @format */

import axios from "axios";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/",
  responseType: "json",
  withCredentials: true,
});

const fetchApi = async (url: string, config: any) => {
  return new Promise((resolve, reject) => {
    apiClient(url, config)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const configApi = ({ path, method, headers }: any) => {
  let url = "";
  const config: any = {
    method: "",
    headers: "",
    data: {},
  };

  if (method) {
    config.method = method;
  }

  if (headers) {
    config.headers = headers;
  }

  return function ({ data, pathParams, queryParams }: any): Promise<any> {
    let query = "";
    let params = "";
    if (queryParams) {
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          if (queryParams[key] !== undefined) {
            query += `&${key}=${queryParams[key]}`;
          }
        }
      }
      query = query.substring(1);
    }
    if (pathParams) {
      for (const key in pathParams) {
        if (Object.hasOwnProperty.call(pathParams, key)) {
          params += `/${pathParams[key]}`;
        }
      }
    }

    if (path) {
      url += `/${path}`;
    }
    if (pathParams) {
      url += `${params}`;
    }
    if (queryParams) {
      url += `?${query}`;
    }
    if (data) {
      config.data = data;
    }

    return fetchApi(url, config);
  };
};

export default configApi;
