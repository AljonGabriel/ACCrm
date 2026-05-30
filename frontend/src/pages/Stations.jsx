import React, { useState, useEffect } from "react";
import StationCard from "../components/Stations/StationsCard";
import Navbar from "../components/Navbar";
import Prd1Layout from "../components/Stations/Prd1Layout";
import Prd2Layout from "../components/Stations/Prd2Layout";
import api from "../config/axios";

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProd, setSelectedProd] = useState("Prod 1"); // default

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

      {/* Dropdown selector */}
      <div className="flex justify-center mt-6 mb-6">
        <select
          value={selectedProd}
          onChange={(e) => setSelectedProd(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 text-sm"
        >
          <option value="Prod 1">Prod 1</option>
          <option value="Prod 2">Prod 2</option>
        </select>
      </div>

      {/* Conditional rendering */}
      {selectedProd === "Prod 1" && (
        <Prd1Layout stations={stations} employees={employees} />
      )}
      {selectedProd === "Prod 2" && (
        <Prd2Layout stations={stations} employees={employees} />
      )}
    </>
  );
};

export default Stations;
