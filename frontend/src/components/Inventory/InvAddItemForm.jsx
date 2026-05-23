import { useState, useEffect } from "react";
import axios from "axios";

export default function AddItemForm({ onAdded, employees }) {
  const [formData, setFormData] = useState({
    category: "",
    item_name: "",
    serial_number: "",
    status: "",
    stock: "1",
    endorsed: "", // stays empty unless user endorses
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/inventory/add",
        formData,
      );
      alert(res.data.message);
      if (onAdded) onAdded(res.data.item);
      setFormData({
        category: "",
        item_name: "",
        serial_number: "",
        status: "",
        stock: "",
        endorsed: "",
      });
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        >
          <option value="Headset">Headset</option>
          <option value="Printer">Printer</option>
          <option value="Mouse">Mouse</option>
          <option value="Monitor">Monitor</option>
          <option value="Keyboard">Keyboard</option>
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
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Serial Number</label>
        <input
          name="serial_number"
          value={formData.serial_number}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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
          <option value="Working">Working</option>
          <option value="Defective">Defective</option>
          <option value="Missing">Missing</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          name="stock"
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

      <div className="py-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
        >
          Save Item
        </button>
      </div>
    </form>
  );
}
