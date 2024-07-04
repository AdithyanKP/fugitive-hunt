import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VehicleSelection = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
    fetchCops();
  }, []);

  let navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchCops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cops");
      console.log(response);
      setSelectedCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSelectVehicle = async (copId, vehicleType) => {
    try {
      await axios.post("http://localhost:5000/api/select-vehicle", {
        copId: copId,
        vehicleType: vehicleType,
      });
      fetchVehicles();
      fetchCops();
      const updatedCities = selectedCities.map((selection) =>
        selection.id === copId
          ? { ...selection, vehicle: vehicleType }
          : selection
      );
      setSelectedCities(updatedCities);
    } catch (error) {
      console.error("Error selecting city:", error);
      alert(error.response?.data?.message || "Failed to select vehicle");
    }
  };

  const handleSubmit = () => {
    if (
      selectedCities.every((selection) => selection.selectedVehicle !== null)
    ) {
      navigate("/result");
    } else {
      alert("Please select vehicle");
    }
  };

  const handleBack = () => {
    axios.post("http://localhost:5000/api/reset-vehicle");
    navigate("/select-city");
  };
  console.log("selectedCities", selectedCities);

  return (
    <div className="h-full flex flex-col items-center justify-cente p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Select a Vehicle to Investigate</h2>
      {selectedCities.map((selection, copIndex) => (
        <div
          key={selection.id}
          className="flex flex-col justify-center mb-6 w-full"
        >
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold mb-2">{selection.copName}</h3>
          </div>

          <div className="flex flex-wrap justify-center">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`m-4 p-4 border rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selection?.selectedVehicle === vehicle.type
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelectVehicle(selection.id, vehicle.type)}
              >
                <img
                  src={vehicle?.img}
                  alt={vehicle?.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-semibold">{vehicle.type}</h3>
                  <p>Range {vehicle.range}</p>
                  <p> Count {vehicle.count} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex">
        <div className="flex m-2">
          <button
            onClick={handleBack}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Back
          </button>
        </div>
        <div className="flex m-2">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelection;
