import { useState } from "react";
import axios from "axios";

export default function InvUpdateItem({ item, onUpdated }) {
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
      const res = await axios.put(
        `http://localhost:8000/inventory/update/${item._id}`,
        formData,
      );

      onUpdated(res.data.item); // callback to refresh parent table
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update item");
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
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500 rounded"
        >
          <option value="">... </option>
          <option value="Headset">Headset</option>
          <option value="Printer">Printer</option>
          <option value="Mouse">Mouse</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Monitor">Monitor</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Item Name</label>
        <input
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Serial Number</label>
        <input
          name="serial_number"
          value={formData.serial_number}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500 rounded"
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
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500 rounded"
        >
          <option value="">...</option>
          <option value="Working">Working</option>
          <option value="Defective">Defective</option>
          <option value="Missing">Missing</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Date Added</label>
        <input
          name="date_added"
          value={formData.date_added}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Endorsed</label>
        <input
          name="endorsed"
          value={formData.endorsed}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500 rounded"
        />
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
