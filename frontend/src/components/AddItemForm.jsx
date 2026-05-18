import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    serial_number: "",
    status: "",
    stock: 0,
    endorsed: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/inventory/add", formData);
      onSuccess(); // close modal after success
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Item Name
        </label>
        <input
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Serial Number
        </label>
        <input
          name="serial_number"
          value={formData.serial_number}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <input
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endorsed By
        </label>
        <input
          name="endorsed"
          value={formData.endorsed}
          onChange={handleChange}
          className="w-full p-2 focus:outline-none border-b border-gray-300 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
      >
        Save Item
      </button>
    </div>
  );
};

export default AddItemForm;
