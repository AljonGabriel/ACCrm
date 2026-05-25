// StationsGrid.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";

export default function StationsGrid() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/station")
      .then((res) => setStations(res.data));
  }, []);

  const handleClick = (station) => {
    // Open modal or form to edit hostname/IP
    console.log("Clicked station:", station);
  };

  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Prod 1 Stations</h2>

      {/* Left Front */}
      <h3 className="font-semibold">Left Front</h3>
      <div className="grid grid-cols-6 gap-4">
        {groupByLocation("Left Front").map((station) => (
          <StationCard
            key={station?._id}
            station={station}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Left Back */}
      <h3 className="font-semibold">Left Back</h3>
      <div className="grid grid-cols-6 gap-4">
        {groupByLocation("Left Back").map((station) => (
          <StationCard
            key={station?._id}
            station={station}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Right Front */}
      <h3 className="font-semibold">Right Front</h3>
      <div className="grid grid-cols-6 gap-4">
        {groupByLocation("Right Front").map((station) => (
          <StationCard
            key={station?._id}
            station={station}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Right Back */}
      <h3 className="font-semibold">Right Back</h3>
      <div className="grid grid-cols-6 gap-4">
        {groupByLocation("Right Back").map((station) => (
          <StationCard
            key={station?._id}
            station={station}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* TL Front */}
      <h3 className="font-semibold">TL Front</h3>
      <div className="grid grid-cols-3 gap-4">
        {groupByLocation("TL Front").map((station) => (
          <StationCard
            key={station?._id}
            station={station}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Back-to-Back */}
      <h3 className="font-semibold">Back-to-Back</h3>
      <div className="grid grid-cols-4 gap-4">
        {groupByLocation("Back-to-Back").map((station) => (
          <StationCard
            key={station?._id}
            station={station}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
