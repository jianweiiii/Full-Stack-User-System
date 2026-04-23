import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [navigate]);

  function handleToggleMode() {
    setIsRegister(!isRegister);
    setName("");
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isRegister) {
        await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name,
          email,
          password,
        });

        alert("Register successful. Please log in.");

        setIsRegister(false);
        setName("");
        setPassword("");
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Error fetching data", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-slate-950/95 border border-slate-800 shadow-2xl shadow-slate-950/40 backdrop-blur-xl rounded-[2rem] p-8">
        <div className="text-center mb-6">
          <p className="text-sm text-cyan-400 uppercase tracking-[0.35em] font-semibold">
            {isRegister ? "Create account" : "Welcome back"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            {isRegister ? "Start your journey" : "Sign in to continue"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {isRegister
              ? "Enter your details below to create a new user account."
              : "Use your email and password to access your dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              autoComplete="name"
              value={name}
              className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={password}
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          <button
            type="button"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:bg-slate-900"
            onClick={handleToggleMode}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
