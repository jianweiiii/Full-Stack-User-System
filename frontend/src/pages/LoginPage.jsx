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
    <div>
      <h2>{isRegister ? "Register Here!" : "Login Here!"}</h2>
      <form onSubmit={handleSubmit} className="flex justify-around">
        {isRegister && (
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-red-500 text-white px-4"
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <button type="button" onClick={handleToggleMode}>
          {isRegister ? "Back to Login" : "Go to Register"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
