import axios from "axios";
import { getCookie } from "typescript-cookie";

const requst = axios.create({
  baseURL: "http://135.181.108.207",
  headers: { "Content-Type": "application/json" },
});

requst.interceptors.request.use(
  (config: any): any => {
    const token = getCookie("user");
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requst.interceptors.response.use(
  (response: any): any => {
    if (response.status === 401) {
      return (window.location.pathname = "/api/admin-login/");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { requst };
