import React, { useEffect, useState } from "react";

const ResultPage = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/result")
      .then((response) => response.json())
      .then((data) => setResult(data));
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-red-100">
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
    </div>
  );
};

export default ResultPage;
