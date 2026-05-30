import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import LoginForm from "../components/auth/LoginForm";
import { isAuthenticated } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const appTitle = DOMPurify.sanitize("ActiveChase CRM");
  const appSubtitle = DOMPurify.sanitize(
    "Manage your inventory, employees, and knowledge base in one place.",
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side branding with office background + vignette */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center text-white overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        {/* Blue vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800/80 via-blue-700/70 to-blue-900/90 mix-blend-multiply" />

        {/* Content */}
        <div className="relative p-10 text-center z-10">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">{appTitle}</h1>
          <p className="text-lg opacity-90">{appSubtitle}</p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {DOMPurify.sanitize("Login")}
          </h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
