import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <p>Welcome to the Home page!</p>
      </div>
    </>
  );
};

export default Home;
