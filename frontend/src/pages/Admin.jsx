import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleSelectedUser(user) {
    setSelectedUser(user);
  }

  async function handleUpdateUser() {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/admin/${selectedUser.id}`,
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
      const res = await axios.delete(
        `http://localhost:8080/api/admin/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res);
      await fetchAllUser();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  }

  async function fetchAllUser() {
    try {
      const res = await axios.get("http://localhost:8080/api/admin", {
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
    <div>
      <h1>Admin Page!</h1>
      <button onClick={handleLogout}> Logout!</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update?</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td> {user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleSelectedUser(user)}>
                      Update user
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)}>
                      Delete user
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) => {
              setSelectedUser({ ...selectedUser, name: e.target.value });
            }}
          />
          <input
            type="text"
            value={selectedUser.email}
            onChange={(e) => {
              setSelectedUser({ ...selectedUser, email: e.target.value });
            }}
          />
          <select
            value={selectedUser.role}
            onChange={(e) => {
              setSelectedUser({ ...selectedUser, role: e.target.value });
            }}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button onClick={handleUpdateUser}>Save!</button>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
