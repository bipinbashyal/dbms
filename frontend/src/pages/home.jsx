import React from "react";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default Home;
