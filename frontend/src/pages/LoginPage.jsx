import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: email,
        password: password,
      });
      const data = res.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else if (data.role === "USER") {
        navigate("/user");
      } else {
        navigate("/");
        console.log("ERROR");
      }
    } catch (e) {
      console.error("Error fetching data", e);
    }

    // setEmail("");
    // setPassword("");
  }

  return (
    <div>
      <h2>Login Here!</h2>
      <form onSubmit={handleSubmit} className="flex justify-around">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-red-500 text-white px-4"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
