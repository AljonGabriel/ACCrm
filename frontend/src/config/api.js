// src/config/api.js
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocal
  ? import.meta.env.VITE_API_BASE // local .env value
  : import.meta.env.VITE_API_BASE || "https://station-backend.onrender.com"; // fallback for deployed
