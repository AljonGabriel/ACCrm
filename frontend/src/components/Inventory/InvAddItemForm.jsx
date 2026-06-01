import { useState, useEffect } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";

export default function AddItemForm({ onSetItems, employees }) {
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
      const res = await api.post("/inventory/add", formData);
      // ✅ Update parent’s items list immediately
      if (onSetItems) {
        onSetItems((prev) => [...prev, res.data.item]);
      }

      setFormData({
        category: "",
        item_name: "",
        serial_number: "",
        status: "",
        stock: "",
        endorsed: "",
      });

      toast.success("Item added successfully!");
    } catch (err) {
      // ✅ Reliable error handling
      if (err.response && err.response.data && err.response.data.detail) {
        toast.error(err.response.data.detail); // e.g. "Serial number already exists"
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Category */}
        <label className="w-full input input-bordered flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <select
            defaultValue="Category..."
            value={formData.category}
            onChange={handleChange}
            className="select select-ghost w-full"
            required
          >
            <option disabled={true} value="">
              Category
            </option>
            <option value="Headset">Headset</option>
            <option value="Printer">Printer</option>
            <option value="Mouse">Mouse</option>
            <option value="Monitor">Monitor</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Item Name */}
        <label className="w-full input input-bordered flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            className="grow"
            placeholder="Item Name"
            required
          />
        </label>

        {/* Serial Number */}
        <label className="w-full input input-bordered flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M12 2v20M2 12h20"
            />
          </svg>
          <input
            type="text"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            className="grow"
            placeholder="Serial Number"
          />
        </label>

        {/* Status */}
        <label className="w-full input input-bordered flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-ghost w-full"
          >
            <option disabled={true} value="">
              Status...
            </option>
            <option value="Working">Working</option>
            <option value="Defective">Defective</option>
            <option value="Missing">Missing</option>
          </select>
        </label>

        {/* Stock */}
        <label className="w-full input input-bordered flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M4 4h16v16H4z"
            />
          </svg>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="grow"
            placeholder="Stock"
          />
        </label>

        {/* Endorsed By */}
        <label className="w-full input input-bordered flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"
            />
          </svg>
          <select
            name="endorsed"
            value={formData.endorsed}
            onChange={handleChange}
            className="select select-ghost w-full"
          >
            <option disabled={true} value="">
              Endorsed to?
            </option>
            <option value="Not Endorsed">Not Endorsed</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp.name}>
                {emp.name} — {emp.position}
              </option>
            ))}
          </select>
        </label>

        {/* Save Button */}
        <div className="pt-3">
          <button type="submit" className="btn btn-primary w-full">
            Save Item
          </button>
        </div>
      </div>
    </form>
  );
}
