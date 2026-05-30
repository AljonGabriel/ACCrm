import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import api from "../../config/axios";
import { TailSpin } from "react-loader-spinner"; // ✅ spinner package

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = DOMPurify.sanitize(email.trim());
    const cleanPassword = DOMPurify.sanitize(password.trim());

    if (!cleanEmail || !cleanPassword) {
      setMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/auth/login",
        new URLSearchParams({ email: cleanEmail, password: cleanPassword }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setEmail("");
        setPassword("");
        navigate("/home");
      } else {
        setMessage(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data?.detail || "Login failed");
      } else {
        setMessage("Unable to connect to server");
      }
    } finally {
      setLoading(false);
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center px-4 py-2 rounded transition ${
          loading
            ? "bg-blue-200 text-blue-700 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <TailSpin height={20} width={20} color="blue" ariaLabel="loading" />
            <span className="ml-2">Logging in...</span>
          </>
        ) : (
          "Login"
        )}
      </button>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </form>
  );
};

export default LoginForm;
