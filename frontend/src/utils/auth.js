// utils/auth.js

import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds

    if (decoded.exp && decoded.exp < currentTime) {
      // expired
      localStorage.removeItem("token");
      return false;
    }

    return true; // valid token
  } catch (error) {
    localStorage.removeItem("token"); // invalid token
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
