import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";
import GlobalModal from "../GlobalModal";
import StationAddInfoFrm from "./StationAddInfoFrm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StationsLayout({ stations, employees }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading delay if stations are passed async
    if (stations && stations.length > 0) {
      setLoading(false);
    }
  }, [stations]);

  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  const handleCardClick = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Prod 1</h3>

      {/* TL Front */}
      <section className="flex justify-center mb-4">
        <div className="grid grid-cols-3 gap-2">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} height={100} className="rounded-md" />
              ))
            : groupByLocation("TL Front").map((station) => (
                <StationCard
                  key={station?._id}
                  station={station}
                  onEdit={handleCardClick}
                />
              ))}
        </div>
      </section>

      {/* Left + Right */}
      <section className="flex justify-between mb-6">
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <Skeleton key={idx} height={80} className="rounded-md" />
                ))
              : groupByLocation("Left Front").map((station) => (
                  <StationCard
                    key={station?._id}
                    station={station}
                    onEdit={handleCardClick}
                  />
                ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col items-end gap-2">
            {loading
              ? Array.from({ length: 7 }).map((_, idx) => (
                  <Skeleton key={idx} height={80} className="rounded-md" />
                ))
              : groupByLocation("Right Front").map((frontStation, idx) => {
                  const backStation = groupByLocation("Right Back")[idx];
                  return (
                    <div key={frontStation?._id} className="flex gap-2">
                      {backStation && (
                        <StationCard
                          key={backStation?._id}
                          station={backStation}
                          onEdit={handleCardClick}
                        />
                      )}
                      <StationCard
                        station={frontStation}
                        onEdit={handleCardClick}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* Back-to-Back */}
      <section className="flex justify-start mt-4">
        <div className="grid grid-cols-2 gap-2">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} height={80} className="rounded-md" />
              ))
            : groupByLocation("Back-to-Back").map((station) => (
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
