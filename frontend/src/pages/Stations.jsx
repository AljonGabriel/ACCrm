import React, { useState, useEffect } from "react";
import StationCard from "../components/Stations/StationsCard";
import Navbar from "../components/Navbar";
import StationsGrid from "../components/Stations/StationGrid";
import StationsLayout from "../components/Stations/StationsLayout";
import api from "../config/axios";
const Stations = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    api
      .get("/station")
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
