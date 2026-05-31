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
      <div className="space-y-4">
        {/* EMP ID */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <input
            type="text"
            name="emp_id"
            value={formData.emp_id}
            onChange={handleChange}
            className="grow"
            placeholder="EMP ID"
            required
          />
        </label>

        {/* Name */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="grow"
            placeholder="Name *"
            required
          />
        </label>

        {/* Email */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="grow"
            placeholder="Email"
          />
        </label>

        {/* Position */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="grow"
            required
          >
            <option value="">Position *</option>
            <option value="IT">IT</option>
            <option value="CSR">CSR</option>
            <option value="PDA">PDA</option>
            <option value="HR">HR</option>
            <option value="TL">TL</option>
            <option value="SME">SME</option>
            <option value="OM">OM</option>
            <option value="Manager">Manager</option>
          </select>
        </label>

        {/* Department */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="grow"
            required
          >
            <option value="">Department *</option>
            <option value="ITD">ITD</option>
            <option value="HRD">HRD</option>
            <option value="PROD">PROD</option>
          </select>
        </label>

        {/* Client */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="grow"
            required
          >
            <option value="">Client *</option>
            <option value="Internal">Internal</option>
            <option value="Andrienne Williams">Andrienne Williams</option>
            <option value="Shoppify">Shoppify</option>
          </select>
        </label>

        {/* Status */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="grow"
            required
          >
            <option value="">Status *</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        {/* Contact */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="grow"
            placeholder="Contact"
          />
        </label>

        {/* Item Endorsed */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <select
            name="item_endorsed"
            value={formData.item_endorsed || ""}
            onChange={handleChange}
            className="grow"
          >
            <option value="">Item Endorsed</option>
            <option value="None">None</option>
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
        </label>

        {/* Save Button */}
        <button type="submit" className="btn btn-primary w-full">
          Save Employee
        </button>
      </div>
    </form>
  );
}
