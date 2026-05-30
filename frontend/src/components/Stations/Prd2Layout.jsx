import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";
import GlobalModal from "../GlobalModal";
import StationAddInfoFrm from "./StationAddInfoFrm";

export default function Prod2Layout({ stations, employees }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  const handleCardClick = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  const frontStations = groupByLocation("Front");
  const backStations = groupByLocation("Back");

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Prod 2</h3>

      {/* Front rows - 4 per row */}
      <section className="space-y-4">
        {Array.from({ length: Math.ceil(frontStations.length / 4) }).map(
          (_, rowIdx) => {
            const rowStations = frontStations.slice(rowIdx * 4, rowIdx * 4 + 4);
            return (
              <div key={rowIdx} className="flex justify-between">
                {/* First station separated */}
                <div className="flex-1 flex justify-start">
                  {rowStations[0] && (
                    <StationCard
                      key={rowStations[0]?._id}
                      station={rowStations[0]}
                      onEdit={handleCardClick}
                    />
                  )}
                </div>

                {/* Remaining 3 flush together */}
                <div className="flex">
                  {rowStations.slice(1).map((station) => (
                    <StationCard
                      key={station?._id}
                      station={station}
                      onEdit={handleCardClick}
                    />
                  ))}
                </div>
              </div>
            );
          },
        )}
      </section>

      {/* Back row - 2 stations aligned to the right */}
      <section className="mt-6">
        <div className="flex justify-end">
          <div className="flex">
            {backStations.map((station) => (
              <StationCard
                key={station?._id}
                station={station}
                onEdit={handleCardClick}
              />
            ))}
          </div>
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
