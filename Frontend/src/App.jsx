import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./components/LandingPage"));
const CitySelection = lazy(() => import("./components/CitySelection"));
const VehicleSelection = lazy(() => import("./components/VehicleSelection"));
const ResultPage = lazy(() => import("./components/ResultPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/select-city" element={<CitySelection />} />
            <Route path="/select-vehicle" element={<VehicleSelection />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
