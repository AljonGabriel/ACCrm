import React from "react";
import StationCard from "../components/Stations/StationsCard";
import Navbar from "../components/Navbar";
import StationsGrid from "../components/Stations/StationGrid";
import StationsLayout from "../components/Stations/StationsLayout";
const Stations = () => {
  return (
    <>
      <Navbar />

      <StationsLayout />
    </>
  );
};

export default Stations;
