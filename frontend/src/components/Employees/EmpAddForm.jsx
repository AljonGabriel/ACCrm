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
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* EMP ID */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M6 21v-2a6 6 0 0112 0v2"></path>
          </svg>
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16v16H4z"></path>
            <path d="M4 4l8 8 8-8"></path>
          </svg>
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l4 8H8l4-8zM2 22h20l-10-6-10 6z"></path>
          </svg>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="select select-ghost grow"
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h18v4H3zM3 10h18v11H3z"></path>
          </svg>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="select select-ghost grow"
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            <path d="M12 14v7"></path>
          </svg>
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="select select-ghost grow"
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-ghost grow"
            required
          >
            <option value="">Status *</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        {/* Contact */}
        <label className="input input-bordered w-full flex items-center gap-2">
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M22 16.92V21a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h4.09a2 2 0 012 1.72c.12.81.37 1.61.73 2.34a2 2 0 01-.45 2.11L9.91 10a16 16 0 006.09 6.09l1.83-1.46a2 2 0 012.11-.45c.73.36 1.53.61 2.34.73a2 2 0 011.72 2z"></path>
          </svg>
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
          <svg
            className="h-4 w-4 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l9 4-9 4-9-4 9-4zm0 8l9 4-9 4-9-4 9-4zm0 8l9 4-9 4-9-4 9-4z"></path>
          </svg>
          <select
            name="item_endorsed"
            value={formData.item_endorsed || ""}
            onChange={handleChange}
            className="select select-ghost grow"
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
