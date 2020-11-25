import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `http://localhost:8000/api/`,
});
let refreshTokenTimeout;
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
  async function (response) {
    if (
      response.config.url === "login" ||
      response.config.url === "refreshToken"
    ) {
      // your success login  logic
      const { exp, iat } = jwt_decode(response.data);

      var d1 = new Date(exp * 1000);
      var d2 = new Date(iat * 1000);

      var seconds = (d1.getTime() - d2.getTime()) / 1000;
      // Refresh the token a minute early to avoid latency issues
      const expirationTime = seconds - 60;

      refreshTokenTimeout = setTimeout(async () => {
        const token = await refreshToken();
        localStorage.setItem("bearer", token.data);
      }, expirationTime * 1000);
      localStorage.setItem("bearer", response.data);
    }
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      clearTimeout(refreshTokenTimeout);
      localStorage.removeItem("bearer");
      localStorage.removeItem("store");
      // window.location.href = "/Login";
    }
    return Promise.reject(error);
  }
);
function getAuthToken() {
  return localStorage.getItem("bearer");
}
function refreshToken() {
  return axiosInstance.get("refreshToken");
}
