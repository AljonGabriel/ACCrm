// StationsLayout.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";

export default function StationsLayout() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/station")
      .then((res) => setStations(res.data))
      .catch((err) => console.error("Error fetching stations:", err));
  }, []);

  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  return (
    <div className="m-auto max-w-6xl p-6">
      {/* TL Front */}
      <div className="mx-auto max-w-2xl">
        <h3 className="font-semibold text-center">TL Front</h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-0">
            {groupByLocation("TL Front").map((station) => (
              <StationCard key={station?._id} station={station} />
            ))}
          </div>
        </div>
      </div>

      {/* Left + Right beside each other */}
      <div className="flex justify-between">
        {/* Left Side (Front only) */}
        <div className="">
          <h3 className="font-semibold">Left Side</h3>
          <div className="flex flex-col gap-0">
            {groupByLocation("Left Front").map((station) => (
              <StationCard key={station?._id} station={station} />
            ))}
          </div>
        </div>

        {/* Right Side (Front + Back paired) */}
        <div className="">
          <h3 className="font-semibold text-right">Right Side</h3>
          <div className="flex flex-col gap-0 items-end">
            {groupByLocation("Right Front").map((frontStation, idx) => {
              const backStation = groupByLocation("Right Back")[idx];
              return (
                <div key={frontStation?._id} className="flex gap-0">
                  {backStation && (
                    <StationCard key={backStation?._id} station={backStation} />
                  )}
                  <StationCard station={frontStation} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Back-to-Back aligned under Left group, but wider */}
      <div>
        <h3 className="font-semibold">Back-to-Back</h3>
        <div className="flex">
          <div className="grid grid-cols-2 gap-0">
            {groupByLocation("Back-to-Back").map((station) => (
              <StationCard key={station?._id} station={station} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
