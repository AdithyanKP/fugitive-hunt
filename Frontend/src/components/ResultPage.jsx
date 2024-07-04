import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResultPage = () => {
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}api/result`)
      .then((response) => response.json())
      .then((data) => setResult(data));
  }, []);

  const handleNewgame = () => {
    axios.post(`${BASE_URL}api/reset-city`);
    axios.post(`${BASE_URL}api/reset-vehicle`);
    navigate("/");
  };

  return (
    <div className="h-screen flex-col flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        {result ? (
          result.success ? (
            <p className="text-green-500 text-lg">
              Success! {result.copName} captured the fugitive.
            </p>
          ) : (
            <p className="text-red-500 text-lg">
              Failed! No cop captured the fugitive.
            </p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button
        onClick={handleNewgame}
        className="h-10 w-36 rounded-md bg-emerald-300 mt-6"
      >
        Start new game
      </button>
    </div>
  );
};

export default ResultPage;
