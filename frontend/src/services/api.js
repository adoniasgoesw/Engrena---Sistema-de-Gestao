import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // base da API
  withCredentials: true // permite cookies/JWT no futuro
});

export default api;
