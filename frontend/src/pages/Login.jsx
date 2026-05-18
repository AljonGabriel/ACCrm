import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { isAuthenticated } from "../utils/auth"; // ✅ use your utility

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      // ✅ Already logged in → redirect to home
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Left side branding */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center">
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">ActiveChase CRM</h1>
          <p className="text-lg">
            Manage your inventory, employees, and knowledge base in one place.
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
