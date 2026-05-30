import React, { useState, useEffect } from "react";
import StationCard from "../components/Stations/StationsCard";
import Navbar from "../components/Navbar";
import StationsGrid from "../components/Stations/StationGrid";
import StationsLayout from "../components/Stations/StationsLayout";
import api from "../config/axios";
const Stations = () => {
  const [stations, setStations] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api
      .get("/station")
      .then((res) => setStations(res.data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  useEffect(() => {
    api
      .get("/employee/list")
      .then((res) => {
        setEmployees(res.data.employees || []);
        console.log("Employees:", res.data);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <>
      <Navbar />
      <StationsLayout stations={stations} employees={employees} />
    </>
  );
};

export default Stations;
