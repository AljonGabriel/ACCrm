// StationAddInfoFrm.jsx
import { useState } from "react";
import api from "../../config/axios";

export default function StationAddInfoFrm({ station, onClose }) {
  const [hostname, setHostname] = useState(station?.hostname || "");
  const [ip, setIp] = useState(station?.ip || "");
  const [status, setStatus] = useState(station?.status || "Offline");
  const [production, setProduction] = useState(station?.production || "Prod 1");
  const [location, setLocation] = useState(station?.location || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/station/update/${station?._id}`, // ✅ matches your router
        {
          hostname,
          ip,
          status,
          production, // required
          location, // required
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

      <div>
        <label className="block text-sm font-medium">Hostname</label>
        <input
          type="text"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">IP Address</label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

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

      <div>
        <label className="block text-sm font-medium">Production</label>
        <select
          value={production}
          onChange={(e) => setProduction(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="Prod 1">Prod 1</option>
          <option value="Prod 2">Prod 2</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
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
