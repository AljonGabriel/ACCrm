import { useState } from "react";
import DOMPurify from "dompurify";
import api from "../../config/axios";
import { toast } from "react-toastify";

export default function EmpAddForm({ onAdded, items }) {
  const [formData, setFormData] = useState({
    emp_id: "EMP-0026-00",
    name: "",
    email: "",
    position: "",
    contact: "",
    department: "",
    client: "",
    status: "",
  });

  const handleChange = (e) => {
    const cleanValue = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: cleanValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Required fields validation
    const requiredFields = [
      "name",
      "position",
      "department",
      "client",
      "status",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    try {
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          DOMPurify.sanitize(value),
        ]),
      );

      const res = await api.post("/employee/add", sanitizedData);
      toast.success("Employee added successfully!");

      if (onAdded) onAdded(res.data.employee);

      setFormData({
        emp_id: "",
        name: "",
        email: "",
        position: "",
        contact: "",
        department: "",
        client: "",
        status: "",
      });
    } catch (err) {
      console.error("Error adding employee:", err);
      toast.error("Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* EMP ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          EMP ID
        </label>
        <input
          name="emp_id"
          value={formData.emp_id}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-600">*</span>
        </label>
        <input
          name="name"
          placeholder="ex.John Doe"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="@domain.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Position Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position <span className="text-red-600">*</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">...</option>
          <option value="CSR">CSR</option>
          <option value="PDA">PDA</option>
          <option value="HR">HR</option>
          <option value="TL">TL</option>
          <option value="SME">SME</option>
          <option value="OM">OM</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {/* Department Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Department <span className="text-red-600">*</span>
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">...</option>
          <option value="ITD">ITD</option>
          <option value="HRD">HRD</option>
          <option value="PROD">PROD</option>
        </select>
      </div>

      {/* Client Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client <span className="text-red-600">*</span>
        </label>
        <select
          name="client"
          value={formData.client}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">...</option>
          <option value="Andrienne Williams">Andrienne Williams</option>
          <option value="Shoppify">Shoppify</option>
        </select>
      </div>

      {/* Status Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status <span className="text-red-600">*</span>
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">...</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact
        </label>
        <input
          name="contact"
          placeholder="ex.0912******"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Generic Item Endorsed Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Item Endorsed
        </label>
        <select
          name="item_endorsed"
          value={formData.item_endorsed || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        >
          <option value="">...</option>
          {items && items.length > 0 ? (
            items.map((item) => (
              <option key={item._id} value={item.item_name}>
                {item.item_name}{" "}
                {item.serial_number ? `(${item.serial_number})` : ""}
              </option>
            ))
          ) : (
            <option disabled>No items available</option>
          )}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
      >
        Save Employee
      </button>
    </form>
  );
}
