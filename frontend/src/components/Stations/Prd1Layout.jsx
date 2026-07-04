import { useEffect, useState } from "react";
import StationCard from "./StationsCard";
import GlobalModal from "../GlobalModal";
import StationAddInfoFrm from "./StationAddInfoFrm";
import Skeleton from "react-loading-skeleton";
import StationSpecFrm from "./StationsSpecForm";
import "react-loading-skeleton/dist/skeleton.css";

export default function StationsLayout({ stations, employees }) {
  const [selectedStation, setSelectedStation] = useState(null);
  const [modalType, setModalType] = useState(null); // "edit" or "specs"
  const [loading, setLoading] = useState(true);

  console.log("selectedStation", selectedStation);
  useEffect(() => {
    if (stations && stations.length > 0) {
      setLoading(false);
    }
  }, [stations]);

  const groupByLocation = (loc) => stations.filter((s) => s.location === loc);

  const openModal = (station, type) => {
    setSelectedStation(station);
    setModalType(type);
    const modalId =
      type === "edit" ? "edit-station-modal" : "specs-station-modal";
    document.getElementById(modalId)?.showModal();
  };

  const closeModal = () => {
    setSelectedStation(null);
    setModalType(null);
  };

  const renderSkeletons = (count, height = 80) =>
    Array.from({ length: count }).map((_, idx) => (
      <Skeleton key={idx} height={height} className="rounded-md" />
    ));

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Prod 1</h3>

      {/* TL Front */}
      <section className="flex justify-center mb-4">
        <div className="grid grid-cols-3 gap-2">
          {loading
            ? renderSkeletons(3, 100)
            : groupByLocation("TL Front").map((station) => (
                <StationCard
                  key={station._id}
                  station={station}
                  onEdit={() => openModal(station, "edit")}
                  onSpecs={() => openModal(station, "specs")}
                />
              ))}
        </div>
      </section>

      {/* Left + Right */}
      <section className="flex justify-between mb-6">
        <div className="flex-1">
          <div className="flex flex-col gap-2">
            {loading
              ? renderSkeletons(6)
              : groupByLocation("Left Front").map((station) => (
                  <StationCard
                    key={station._id}
                    station={station}
                    onEdit={() => openModal(station, "edit")}
                    onSpecs={() => openModal(station, "specs")}
                  />
                ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col items-end gap-2">
            {loading
              ? renderSkeletons(7)
              : groupByLocation("Right Front").map((frontStation, idx) => {
                  const backStation = groupByLocation("Right Back")[idx];
                  return (
                    <div key={frontStation?._id} className="flex gap-2">
                      {backStation && (
                        <StationCard
                          key={backStation._id}
                          station={backStation}
                          onEdit={() => openModal(backStation, "edit")}
                          onSpecs={() => openModal(backStation, "specs")}
                        />
                      )}
                      <StationCard
                        station={frontStation}
                        onEdit={() => openModal(frontStation, "edit")}
                        onSpecs={() => openModal(frontStation, "specs")}
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
            ? renderSkeletons(4)
            : groupByLocation("Back-to-Back").map((station) => (
                <StationCard
                  key={station._id}
                  station={station}
                  onEdit={() => openModal(station, "edit")}
                  onSpecs={() => openModal(station, "specs")}
                />
              ))}
        </div>
      </section>

      <GlobalModal title="Update Station" id="edit-station-modal">
        {selectedStation && modalType === "edit" && (
          <StationAddInfoFrm
            key={selectedStation._id} // 🔹 forces remount
            station={selectedStation}
            employees={employees}
            onClose={closeModal}
          />
        )}
      </GlobalModal>

      <GlobalModal title="Station Specs" id="specs-station-modal">
        {selectedStation && modalType === "specs" && (
          <StationSpecFrm
            key={selectedStation._id} // 🔹 forces remount
            station={selectedStation}
            onClose={closeModal}
          />
        )}
      </GlobalModal>
    </div>
  );
}
