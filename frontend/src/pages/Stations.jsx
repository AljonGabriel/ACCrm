import React, { useState, useEffect } from "react";
import StationCard from "../components/Stations/StationsCard";
import Navbar from "../components/Navbar";
import StationsGrid from "../components/Stations/StationGrid";
import Prd1Layout from "../components/Stations/Prd1Layout";
import Prd2Layout from "../components/Stations/Prd2Layout";
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
      <Prd1Layout stations={stations} employees={employees} />
      <Prd2Layout stations={stations} employees={employees} />
    </>
  );
};

export default Stations;
