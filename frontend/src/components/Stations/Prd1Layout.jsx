// StationsLayout.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";
import GlobalModal from "../GlobalModal";
import StationAddInfoFrm from "./StationAddInfoFrm";

export default function StationsLayout({ stations, employees }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  const handleCardClick = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  console.log("StationsLayout received stations:", selectedStation);
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Prod 1</h3>

      {/* TL Front - flush, centered */}
      <section className="flex justify-center mb-4">
        <div className="grid grid-cols-3 ">
          {groupByLocation("TL Front").map((station) => (
            <StationCard
              key={station?._id}
              station={station}
              onEdit={handleCardClick}
            />
          ))}
        </div>
      </section>

      {/* Left + Right beside each other */}
      <section className="flex justify-between mb-6">
        {/* Left Side */}
        <div className="flex-1">
          <div className="flex flex-col">
            {groupByLocation("Left Front").map((station) => (
              <StationCard
                key={station?._id}
                station={station}
                onEdit={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex flex-col items-end">
            {groupByLocation("Right Front").map((frontStation, idx) => {
              const backStation = groupByLocation("Right Back")[idx];
              return (
                <div key={frontStation?._id} className="flex">
                  {backStation && (
                    <StationCard
                      key={backStation?._id}
                      station={backStation}
                      onEdit={handleCardClick}
                    />
                  )}
                  <StationCard station={frontStation} onEdi={handleCardClick} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Back-to-Back */}
      <section className="flex justify-start mt-4">
        <div className="grid grid-cols-2">
          {groupByLocation("Back-to-Back").map((station) => (
            <StationCard
              key={station?._id}
              station={station}
              onEdit={handleCardClick}
            />
          ))}
        </div>
      </section>

      {/* Global Modal */}
      <GlobalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedStation && (
          <StationAddInfoFrm
            station={selectedStation}
            employees={employees}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </GlobalModal>
    </div>
  );
}
