import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify"; // ✅ sanitize inputs
import api from "../config/axios"; // ✅ use centralized API config

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Sanitize inputs
    const cleanEmail = DOMPurify.sanitize(email.trim());
    const cleanPassword = DOMPurify.sanitize(password.trim());

    // ✅ Basic validation before sending
    if (!cleanEmail || !cleanPassword) {
      setMessage("Email and password are required");
      return;
    }

    console.log(api);

    try {
      const response = await api.post(
        "/auth/login",
        new URLSearchParams({ email: cleanEmail, password: cleanPassword }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      if (response.data.success && response.data.token) {
        // ✅ Save token securely
        localStorage.setItem("token", response.data.token);

        // ✅ Clear sensitive fields
        setEmail("");
        setPassword("");

        // ✅ Redirect to Home
        navigate("/home");
      } else {
        setMessage(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      // ✅ More descriptive error handling
      if (error.response) {
        setMessage(error.response.data?.detail || "Login failed");
      } else {
        setMessage("Unable to connect to server");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default LoginForm;
