import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  async function handleGetProfile() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      setProfile(data);
    } catch (error) {
      setError("Failed to fetch profile");
      console.error("Error fetching user profile", error);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }
  return (
    <div>
      <h1>User Page</h1>
      <div className="flex flex-col my-8">
        <button onClick={handleGetProfile}> Get your own profile!</button>
        <button onClick={handleLogout}> Logout!</button>
        <label>THIS IS YOUR PROFILE INFORMATION</label>

        {error && <p className="text-red-500">{error}</p>}
        {profile && (
          <ul>
            <li>
              <strong>ID:</strong> {profile.id}
            </li>
            <li>
              <strong>Name:</strong> {profile.name}
            </li>
            <li>
              <strong>Email:</strong> {profile.email}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserPage;
