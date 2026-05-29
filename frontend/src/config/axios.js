import axios from "axios";

// Detect local vs deployed
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API_BASE = isLocal
  ? import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000"
  : import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
