// StationCard.jsx
export default function StationCard({ station, onEdit }) {
  return (
    <div
      className={`w-40 h-auto border p-2 text-left shadow-md rounded-lg ${
        station?.status === "Online" ? "border-green-500" : "border-red-500"
      }`}
    >
      {/* Compact label:value rows */}
      <p className="text-xs">
        <span className="font-bold">H:</span> {station?.hostname || "hostname"}
      </p>
      <p className="text-xs">
        <span className="font-bold">S:</span>{" "}
        {station?.stationed || "Stationed"}
      </p>
      <p className="text-xs text-gray-600">
        <span className="font-bold">IP:</span> {station?.ip || "No IP yet"}
      </p>
      <p className="text-xs text-gray-600">
        <span className="font-bold">MAC:</span>{" "}
        {station?.mac_address || "No MAC"}
      </p>
      <p className="text-xs text-gray-600">
        <span className="font-bold">AD:</span>{" "}
        {station?.anydesk_id || "No Anydesk"}
      </p>

      {/* ✅ Button triggers modal */}
      <div className="mt-3 flex justify-center">
        <button
          onClick={() => onEdit(station)}
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
