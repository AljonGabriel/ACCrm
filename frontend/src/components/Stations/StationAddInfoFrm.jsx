// StationAddInfoFrm.jsx
import { useState } from "react";
import api from "../../config/axios";
import DOMPurify from "dompurify";

export default function StationAddInfoFrm({ station, onClose, employees }) {
  const [hostname, setHostname] = useState(station?.hostname || "");
  const [ip, setIp] = useState(station?.ip || "");
  const [status, setStatus] = useState(station?.status || "Offline");
  const [production, setProduction] = useState(station?.production);
  const [location, setLocation] = useState(station?.location || "");
  const [anydeskId, setAnydeskId] = useState(station?.anydesk_id || "");
  const [macAddress, setMacAddress] = useState(station?.mac_address || "");
  const [stationed, setStationed] = useState(station?.stationed || "");
  const [specs, setSpecs] = useState(station?.specs || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/station/update/${station?._id}`, // ✅ matches your router
        {
          hostname: DOMPurify.sanitize(hostname.trim()),
          ip: DOMPurify.sanitize(ip.trim()),
          status: DOMPurify.sanitize(status.trim()),
          production: DOMPurify.sanitize(production.trim()), // required
          location: DOMPurify.sanitize(location.trim()), // required
          anydesk_id: DOMPurify.sanitize(anydeskId.trim()),
          mac_address: DOMPurify.sanitize(macAddress.trim()),
          stationed: DOMPurify.sanitize(stationed.trim()),
          specs: DOMPurify.sanitize(specs.trim()),
        },
      );
      alert(response.data.message || "Station updated successfully!");
      if (onClose) onClose();
    } catch (err) {
      console.error("Error updating station:", err.response?.data || err);
      alert("Failed to update station");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-lg">Edit Station Info</h3>

      {/* Hostname */}
      <div>
        <label className="block text-sm font-medium">Hostname</label>
        <input
          type="text"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* IP Address */}
      <div>
        <label className="block text-sm font-medium">IP Address</label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      {/* AnyDesk ID */}
      <div>
        <label className="block text-sm font-medium">AnyDesk ID</label>
        <input
          type="text"
          value={anydeskId}
          onChange={(e) => setAnydeskId(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* MAC Address */}
      <div>
        <label className="block text-sm font-medium">MAC Address</label>
        <input
          type="text"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Stationed */}
      <div>
        <label className="block text-sm font-medium">Stationed</label>
        <select
          value={stationed}
          onChange={(e) => setStationed(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Employee --</option>
          {employees?.map((emp) => (
            <option key={emp._id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Specs */}
      <div>
        <label className="block text-sm font-medium">Specs</label>
        <textarea
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          className="w-full border p-2 rounded h-32"
          placeholder="Paste specs here..."
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
