// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/authContext";

// const Users = () => {
//   const { token } = useAuth();
//   axios.defaults.headers["Authorization"] = `Bearer ${token}`;
//   const [users, setUsers] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   const [isError, setError] = useState(false);
//   // useEffect(
//   //   (async () => {
//   //     const response = await axios.get("http://localhost:4567/getusers");
//   //     console.log(response.data.users);
//   //     setUsers(response.data.users);
//   //   })(),
//   //   []
//   // );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4567/getusers");
//         setUsers(response.data.users);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     // Call the async function
//     fetchData();
//   }, []);
//   return (
//     // <div>hello</div>
//     <div className="flex flex-col items-center justify-center mt-10">
//       <div>Users Lists:</div>
//       {/* {users ? (
//         users.map((user) => (
//           <div key={user.id}>
//             ID:{user.id} Name:{user.name} email:{user.email}
//           </div>
//         ))
//       ) : (
//         <div>Loading...</div>
//       )} */}

//       {isLoading ? (
//         <div>Loading...</div>
//       ) : isError ? (
//         <div>You are not a admin</div>
//       ) : (
//         users.map((user) => (
//           <div key={user.id}>
//             ID:{user.id} Name:{user.name} email:{user.email}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Users;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // Add the Authorization header with the token
//         const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
//         const response = await axios.get("http://localhost:4567/getusers", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(response.data.users); // Assuming the API returns a `users` array
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []); // Empty dependency array ensures it runs on mount

//   if (loading) return <div>Loading users...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Users List</h1>
//       <table className="w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 p-2">Name</th>
//             <th className="border border-gray-300 p-2">Email</th>
//             <th className="border border-gray-300 p-2">Admin</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="text-center">
//               <td className="border border-gray-300 p-2">{user.name}</td>
//               <td className="border border-gray-300 p-2">{user.email}</td>
//               <td className="border border-gray-300 p-2">
//                 {user.isAdmin ? "Yes" : "No"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4567/getusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Delete User
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4567/deleteuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the user list after deletion
      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Admin</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.isAdmin ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
