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
      <p className="text-sm">{station?.hostname || "Click to add hostname"}</p>

      {/* Stationed */}
      <p className="text-sm">{station?.stationed || "Stationed"}</p>

      {/* IP Address */}
      <p className="text-xs text-gray-500">{station?.ip || "No IP yet"}</p>
      {/* MAC Address */}
      <p className="text-xs text-gray-500">
        {station?.mac_address || "No MAC address yet"}
      </p>
      {/* Anydesk */}
      <p className="text-sm text-gray-600">
        {station?.anydesk_id || "No Anydesk ID yet"}
      </p>
    </div>
  );
}
