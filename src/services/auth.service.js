import axios from "axios";
import { axiosInstance } from "../plugins/axios";
export default class Auth {
  getAllUsers() {
    return axios.get(`https://jsonplaceholder.typicode.com/users`);
  }

  saveUser(data) {
    return axiosInstance.post(`register`, data);
  }
  getUser() {
    return axiosInstance.get(`/`);
  }
  authenticateUser(data) {
    return axiosInstance.post(`login`, data);
  }
  uploadProfile(data) {
    return axiosInstance.post(`/files/uploadFile`, data);
  }
  verifyEmail(data) {
    return axiosInstance.post(`/email/verify`, data);
  }
}
