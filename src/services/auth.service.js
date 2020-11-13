import axios from "axios";
import { axiosInstance } from "../plugins/axios";
export default class Auth {
  getAllUsers() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      console.log(persons);
    });
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
}
