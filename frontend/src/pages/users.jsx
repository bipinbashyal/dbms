import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

const Users = () => {
  const { token } = useAuth();
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  const [users, setUsers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  // useEffect(
  //   (async () => {
  //     const response = await axios.get("http://localhost:4567/getusers");
  //     console.log(response.data.users);
  //     setUsers(response.data.users);
  //   })(),
  //   []
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4567/getusers");
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []);
  return (
    // <div>hello</div>
    <div className="flex flex-col items-center justify-center mt-10">
      <div>Users Lists:</div>
      {/* {users ? (
        users.map((user) => (
          <div key={user.id}>
            ID:{user.id} Name:{user.name} email:{user.email}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )} */}

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>You are not a admin</div>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            ID:{user.id} Name:{user.name} email:{user.email}
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
