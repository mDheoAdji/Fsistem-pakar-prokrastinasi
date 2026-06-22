import axios from "axios";

const api = axios.create({
  baseURL:
    "https://sistem-pakar-prokrastinasi.vercel.app/api",
});

export default api;