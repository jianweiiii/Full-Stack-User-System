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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm text-cyan-400 uppercase tracking-[0.35em] font-semibold">
            User Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Welcome Back
          </h1>
        </div>

        <div className="bg-slate-950/95 border border-slate-800 shadow-2xl shadow-slate-950/40 backdrop-blur-xl rounded-[2rem] p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleGetProfile}
              className="rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              Get Your Profile
            </button>
            <button
              onClick={handleLogout}
              className="rounded-3xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:bg-slate-900"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {profile && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">
                Your Profile Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                  <span className="text-sm font-medium text-slate-300">
                    ID:
                  </span>
                  <span className="text-sm text-slate-100">{profile.id}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                  <span className="text-sm font-medium text-slate-300">
                    Name:
                  </span>
                  <span className="text-sm text-slate-100">{profile.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                  <span className="text-sm font-medium text-slate-300">
                    Email:
                  </span>
                  <span className="text-sm text-slate-100">
                    {profile.email}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
