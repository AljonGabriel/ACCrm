import React from "react";

// Station Box Component
function StationBox({ station }) {
  return (
    <div
      className={`border rounded-lg p-4 text-center shadow-md ${
        station?.status === "Online" ? "border-green-500" : "border-red-500"
      }`}
    >
      {/* Hostname */}
      <h3 className="font-bold text-lg">
        {station?.hostname || "Unknown Host"}
      </h3>

      {/* Production grouping */}
      <p className="text-xs text-gray-500">
        Prod: {station?.production || "N/A"}
      </p>

      {/* Location */}
      <p className="text-sm text-gray-600">
        {station?.location || "No Location"}
      </p>

      {/* IP Address */}
      <p className="text-xs text-gray-500">IP: {station?.ip || "No IP"}</p>

      {/* Status */}
      <p
        className={`text-xs font-semibold mt-2 ${
          station?.status === "Online" ? "text-green-600" : "text-red-600"
        }`}
      >
        {station?.status || "Unknown Status"}
      </p>
    </div>
  );
}

// Grid Component for Stations
export default function StationsGrid({ stations }) {
  // Separate Prod 1 and Prod 2
  const prod1Stations = stations.filter((s) => s?.production === "Prod 1");
  const prod2Stations = stations.filter((s) => s?.production === "Prod 2");

  return (
    <div className="space-y-10">
      {/* Prod 1 */}
      <div>
        <h2 className="text-xl font-bold mb-4">Production 1 (27 Stations)</h2>
        <div className="grid grid-cols-9 gap-4">
          {prod1Stations.map((station) => (
            <StationBox key={station?._id} station={station} />
          ))}
        </div>
      </div>

      {/* Prod 2 */}
      <div>
        <h2 className="text-xl font-bold mb-4">Production 2</h2>
        <div className="grid grid-cols-9 gap-4">
          {prod2Stations.map((station) => (
            <StationBox key={station?._id} station={station} />
          ))}
        </div>
      </div>
    </div>
  );
}
