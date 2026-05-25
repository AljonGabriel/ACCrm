// StationCard.jsx
export default function StationCard({ station, onClick }) {
  return (
    <div
      onClick={() => onClick(station)}
      className={`w-50 h-40 border p-4 text-center shadow-md cursor-pointer ${
        station?.status === "Online" ? "border-green-500" : "border-red-500"
      }`}
    >
      {/* Hostname */}
      <h3 className="font-bold text-lg">
        {station?.hostname || "Click to add hostname"}
      </h3>

      {/* Location */}
      <p className="text-sm text-gray-600">{station?.location}</p>

      {/* IP Address */}
      <p className="text-xs text-gray-500">{station?.ip || "No IP yet"}</p>

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
