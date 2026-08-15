import axios from "axios";
import environment from "@/config/environment";

const api = axios.create({
  baseURL: environment.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;