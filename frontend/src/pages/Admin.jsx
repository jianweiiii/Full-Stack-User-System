import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  function handleSelectedUser(user) {
    setSelectedUser(user);
  }

  async function handleUpdateUser() {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/${selectedUser.id}`,
        {
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res);

      await fetchAllUser();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user", error);
    }
  }

  async function handleDeleteUser(user) {
    const confirmDelete = window.confirm(`Delete ${user.name}?`);

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`${API_BASE_URL}/api/admin/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      await fetchAllUser();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  }

  async function fetchAllUser() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching all users", error);
    }
  }

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-cyan-400 uppercase tracking-[0.35em] font-semibold">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white">
              Manage Users
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-3xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:bg-slate-900"
          >
            Logout
          </button>
        </div>

        <div className="bg-slate-950/95 border border-slate-800 shadow-2xl shadow-slate-950/40 backdrop-blur-xl rounded-[2rem] p-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-800 hover:bg-slate-900/50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-100">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-100">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-100">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-100">
                      {user.role}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSelectedUser(user)}
                          className="rounded-lg bg-cyan-500 px-3 py-1 text-xs font-medium text-slate-950 transition hover:bg-cyan-400"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="rounded-lg border border-red-500 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <div className="mt-8 bg-slate-950/95 border border-slate-800 shadow-2xl shadow-slate-950/40 backdrop-blur-xl rounded-[2rem] p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Edit User
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="Name"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                placeholder="Email"
              />
              <select
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <button
              onClick={handleUpdateUser}
              className="mt-6 rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
