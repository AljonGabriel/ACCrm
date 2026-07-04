// StationCard.jsx
export default function StationCard({ station, onEdit, onSpecs }) {
  console.log("specs", station?.specs);
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

      {/* ✅ Buttons trigger parent handler */}
      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={() => onEdit(station)} // pass station up
          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onSpecs(station)} // you can differentiate later
          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Specs
        </button>
      </div>
    </div>
  );
}
