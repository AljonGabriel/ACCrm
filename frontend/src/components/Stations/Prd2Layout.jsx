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

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Prod 2</h3>

      {/* Front rows - 4 per row */}
      <section className="space-y-4">
        {Array.from({
          length: Math.ceil(groupByLocation("Front").length / 4),
        }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-4 border border-gray-400">
            {groupByLocation("Front")
              .slice(rowIdx * 4, rowIdx * 4 + 4)
              .map((station) => (
                <StationCard
                  key={station?._id}
                  station={station}
                  onEdit={handleCardClick}
                />
              ))}
          </div>
        ))}
      </section>

      {/* Back rows - 2 per row */}
      <section className="space-y-4 mt-6">
        {Array.from({
          length: Math.ceil(groupByLocation("Back").length / 2),
        }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-2 border border-gray-400">
            {groupByLocation("Back")
              .slice(rowIdx * 2, rowIdx * 2 + 2)
              .map((station) => (
                <StationCard
                  key={station?._id}
                  station={station}
                  onEdit={handleCardClick}
                />
              ))}
          </div>
        ))}
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
