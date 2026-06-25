import { useEffect, useState } from "react";
import axios from "axios";
import StationCard from "./StationsCard";
import GlobalModal from "../GlobalModal";
import StationAddInfoFrm from "./StationAddInfoFrm";
import Skeleton from "react-loading-skeleton";
import StationSpecFrm from "./StationsSpecForm";
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

  const handleEditClick = (station) => {
    setSelectedStation(station);
    document.getElementById("edit-station-modal").showModal();
  };

  const handleSpecsClick = (station) => {
    setSelectedStation(station);
    document.getElementById("specs-station-modal").showModal();
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
                  key={station._id}
                  station={station}
                  onEdit={handleEditClick}
                  onSpecs={handleSpecsClick}
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
                    key={station._id}
                    station={station}
                    onEdit={handleEditClick}
                    onSpecs={handleSpecsClick}
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
                          onEdit={handleEditClick}
                          onSpecs={handleSpecsClick}
                        />
                      )}
                      <StationCard
                        station={frontStation}
                        onEdit={handleEditClick}
                        onSpecs={handleSpecsClick}
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
                  onEdit={handleEditClick}
                  onSpecs={handleSpecsClick}
                />
              ))}
        </div>
      </section>

      {/* Edit Modal */}
      <GlobalModal title="Update Station" id="edit-station-modal">
        {selectedStation && (
          <StationAddInfoFrm
            station={selectedStation}
            employees={employees}
            onClose={() => setSelectedStation(null)}
          />
        )}
      </GlobalModal>

      {/* Specs Modal */}
      <GlobalModal title="Station Specs" id="specs-station-modal">
        {selectedStation && (
          <StationSpecFrm
            station={selectedStation}
            onClose={() => setSelectedStation(null)}
          />
        )}
      </GlobalModal>
    </div>
  );
}
