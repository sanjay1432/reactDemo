import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `http://localhost:8000/api/`,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = { ...config.headers, Authorization: getAuthToken() };
    // you can also do other modification in config
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.config.url === "login") {
      // your success login  logic
      localStorage.setItem("bearer", response.data);
    }
    return response;
  },
  function (error) {
    if (error.response.code === 401) {
      localStorage.removeItem("bearer");
    }
    return Promise.reject(error);
  }
);
function getAuthToken() {
  return localStorage.getItem("bearer");
}
