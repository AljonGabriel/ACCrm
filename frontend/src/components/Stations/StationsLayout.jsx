// StationsLayout.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";
import GlobalModal from "../GlobalModal";
import StationAddInfoFrm from "./StationAddInfoFrm";

export default function StationsLayout({ stations }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  const handleCardClick = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  console.log("StationsLayout received stations:", selectedStation);
  return (
    <div className="m-auto max-w-6xl p-6 border border-gray-400 rounded-md shadow-sm space-y-8">
      {/* TL Front */}
      <div className="mx-auto max-w-2xl">
        <h3 className="font-semibold text-center">TL Front</h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-0">
            {groupByLocation("TL Front").map((station) => (
              <StationCard
                key={station?._id}
                station={station}
                onClick={handleCardClick}
              />
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
              <StationCard
                key={station?._id}
                station={station}
                onClick={handleCardClick}
              />
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
                    <StationCard
                      key={backStation?._id}
                      station={backStation}
                      onClick={handleCardClick}
                    />
                  )}
                  <StationCard
                    station={frontStation}
                    onClick={handleCardClick}
                  />
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
              <StationCard
                key={station?._id}
                station={station}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Global Modal */}
      <GlobalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedStation && (
          <StationAddInfoFrm
            station={selectedStation}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </GlobalModal>
    </div>
  );
}
