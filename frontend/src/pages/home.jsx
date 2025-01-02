// import React from "react";
// import { useAuth } from "../context/authContext";

// const Home = () => {
//   const { user } = useAuth();
//   return (
//     <div className="flex flex-col items-center justify-center mt-10">
//       <div>Name: {user.name}</div>
//       <div>Email: {user.email}</div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));

        setFormData({
          name: user.name,
          email: user.email,
        });
      } catch (err) {
        console.error(
          "Failed to fetch user details:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:4567/edituser",
        { name: formData.name, email: formData.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user); // Update the user state with the updated data
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2 mt-1"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
