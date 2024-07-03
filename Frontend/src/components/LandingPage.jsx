import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const LandingPage = () => {
  return (
    <div className="bg-landing h-screen flex items-center justify-center w-full">
      <div className="flex flex-col justify-start text-center w-full">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Fugitive Capture Game
        </h1>
        <Link to="/select-city">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md">
            Start Game
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
