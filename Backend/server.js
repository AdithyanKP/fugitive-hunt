import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const cities = [
  {
    id: 1,
    name: "Yapkashnagar",
    distance: 60,
    img: "/Yapkashnagar.png",
  },
  { id: 2, name: "Lihaspur", distance: 50, img: "/Lihaspur.png" },
  { id: 3, name: "Narmis City", distance: 40, img: "/NarmisCity.png" },
  { id: 4, name: "Shekharvati", distance: 30, img: "/Shekharvati.png" },
  { id: 5, name: "Nuravgram", distance: 20, img: "/Nuravgram.png" },
];

let cops = [
  { id: 1, copName: "Cop 1", city: null, selectedVehicle: null },
  { id: 2, copName: "Cop 2", city: null, selectedVehicle: null },
  { id: 3, copName: "Cop 3", city: null, selectedVehicle: null },
];

const vehicles = [
  { id: 1, type: "EV Bike", range: 60, count: 2, img: "/bike.png" },
  { id: 2, type: "EV Car", range: 100, count: 1, img: "/car.png" },
  { id: 3, type: "EV SUV", range: 120, count: 1, img: "/suv.png" },
];

let fugitiveLocation = cities[Math.floor(Math.random() * cities.length)].name;

app.get("/api/cities", (req, res) => {
  res.status(200).json(cities);
});

app.get("/api/cops", (req, res) => {
  res.status(200).json(cops);
});

app.get("/api/vehicles", (req, res) => {
  res.status(200).json(vehicles);
});

app.post("/api/select-city", (req, res) => {
  const { copId, city, cityId } = req.body;

  const cop = cops.find((cop) => cop.id === copId);
  if (!cop) {
    return res.status(404).json({ message: "Cop not found" });
  }

  const selectedCity = cities.find((c) => c.id === cityId);
  if (!selectedCity) {
    return res.status(404).json({ message: "City not found" });
  }

  const isCityTaken = cops.find((cop) => cop.city == city);

  if (isCityTaken) {
    return res.status(404).json({ message: "City already taken by other cop" });
  }

  cops.forEach((obj) => {
    if (obj.id === copId) {
      obj.city = city;
    }
  });

  res.status(200).json({ message: "City selection recorded" });
});

console.log("::::::::fugitiveLocation::::::::::", fugitiveLocation);

app.post("/api/select-vehicle", (req, res) => {
  const { copId, vehicleType } = req.body;
  const cop = cops.find((c) => c.id === copId);
  const vehicle = vehicles.find((v) => v.type === vehicleType);

  if (cop && vehicle) {
    if (cop.selectedVehicle === vehicleType) {
      // Deselecting the vehicle
      cop.selectedVehicle = null;
      vehicle.count += 1;
      res.send({ success: true, message: "Vehicle deselected" });
    } else {
      if (vehicle.count > 0) {
        if (cop.selectedVehicle) {
          const previousVehicle = vehicles.find(
            (v) => v.type === cop.selectedVehicle
          );
          previousVehicle.count += 1;
        }
        cop.selectedVehicle = vehicleType;
        vehicle.count -= 1;
        res.send({ success: true, message: "Vehicle selection recorded" });
      } else {
        res.send({ success: false, message: "Vehicle not available" });
      }
    }
  } else {
    res
      .status(404)
      .send({ success: false, message: "Cop or vehicle not found" });
  }
});

// Endpoint to get the result of the investigation
app.get("/api/result", (req, res) => {
  const successfulCop = cops.find(
    (cop) =>
      cop.city === fugitiveLocation &&
      vehicles.find((v) => v.type === cop.selectedVehicle).range >=
        cities.find((c) => c.name === cop.city).distance * 2
  );

  console.log(":::::::successfulCop:::", successfulCop);

  if (successfulCop) {
    res.send({ success: true, copName: successfulCop.copName });
  } else {
    res.send({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
