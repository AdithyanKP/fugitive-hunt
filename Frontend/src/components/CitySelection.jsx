import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CitySelection = () => {
  const [cities, setCities] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
    fetchCops();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchCops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cops");
      console.log(response);
      setSelectedItems(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleSelectCity = async (copId, cityId, copName) => {
    const selectedCity = cities.find((c) => c.id === cityId);
    if (!selectedCity) return;

    try {
      await axios.post("http://localhost:5000/api/select-city", {
        copId: copId,
        copName: copName,
        city: selectedCity.name,
        cityId: selectedCity.id,
      });
      const updatedCities = selectedItems.map((selection) =>
        selection.id === copId
          ? { ...selection, city: selectedCity.name }
          : selection
      );
      setSelectedItems(updatedCities);
    } catch (error) {
      console.error("Error selecting city:", error);
      alert(error.response?.data?.message || "Failed to select city");
    }
  };

  const handleSubmit = () => {
    if (selectedItems.every((selection) => selection.city !== null)) {
      navigate("/select-vehicle", { state: { selectedItems } });
    } else {
      alert("Please select a city for each cop");
    }
  };

  const handleBack = () => {
   axios.post("http://localhost:5000/api/reset-city");
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Select a City to Investigate</h2>
      {selectedItems.map((selection, copIndex) => (
        <div
          key={selection.id}
          className="flex flex-col justify-center mb-6 w-full"
        >
          <div className="flex justify-center">
            <h3 className="text-xl font-semibold mb-2">{selection.copName}</h3>
          </div>

          <div className="flex flex-wrap justify-center">
            {cities.map((city) => (
              <div
                key={city.id}
                className={`m-4 p-4 border rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selection.city === city.name
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  handleSelectCity(selection.id, city.id, selection.name)
                }
              >
                <img
                  src={city?.img}
                  alt={city?.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-semibold">{city.name}</h3>
                  <p>{city.distance} KM</p>
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

export default CitySelection;
