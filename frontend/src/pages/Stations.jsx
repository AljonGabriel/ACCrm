import React, { useState, useEffect } from "react";
import StationCard from "../components/Stations/StationsCard";
import Navbar from "../components/Navbar";
import StationsGrid from "../components/Stations/StationGrid";
import StationsLayout from "../components/Stations/StationsLayout";
import axios from "axios";
const Stations = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/station")
      .then((res) => setStations(res.data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  return (
    <>
      <Navbar />
      <StationsLayout stations={stations} />
    </>
  );
};

export default Stations;
