import { useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

export default function InvUpdateItem({ item, onSetItems, employees }) {
  const [formData, setFormData] = useState({
    category: item.category,
    item_name: item.item_name,
    serial_number: item.serial_number,
    status: item.status,
    stock: item.stock,
    date_added: item.date_added,
    endorsed: item.endorsed,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/inventory/update/${item._id}`, formData);

      toast.success(res.data.message);

      // ✅ Update parent state
      if (onSetItems) {
        onSetItems((prev) =>
          prev.map((i) => (i._id === res.data.item._id ? res.data.item : i)),
        );
      }
    } catch (err) {
      // ✅ Reliable error handling
      if (err.response && err.response.data && err.response.data.detail) {
        toast.error(err.response.data.detail); // e.g. "Serial number already exists"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            ...
          </option>
          <option value="Printer">Printer</option>
          <option value="Mouse">Mouse</option>
          <option value="Monitor">Monitor</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Headset">Headset</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Item Name</label>
        <input
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Serial Number</label>
        <input
          name="serial_number"
          value={formData.serial_number}
          onChange={handleChange}
          className="w-full p-2 border  rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">...</option>
          <option value="Working">Working</option>
          <option value="Defective">Defective</option>
          <option value="Missing">Missing</option>
        </select>
      </div>

      {/* Show issue description only if Defective */}
      {formData.status === "Defective" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Defective Issue
          </label>
          <textarea
            name="defective_issue"
            value={formData.defective_issue || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Describe the issue..."
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endorsed By
        </label>
        <select
          name="endorsed"
          value={formData.endorsed}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="Not Endorsed">Not Endorsed</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.name}>
              {emp.name} — {emp.position}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
