import { useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

export default function EmpAddForm({ onAdded }) {
  const [formData, setFormData] = useState({
    emp_id: "EMP-0026-00",
    name: "",
    email: "",
    position: "",
    contact: "",
    department: "PROD",
    client: "",
    status: "Active",
  });

  const handleChange = (e) => {
    // ✅ sanitize input before saving to state
    const cleanValue = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: cleanValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ sanitize all fields before sending to backend
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          DOMPurify.sanitize(value),
        ]),
      );

      const res = await axios.post(
        "http://localhost:8000/employee/add",
        sanitizedData,
      );
      alert(res.data.message);

      if (onAdded) onAdded(res.data.employee);

      // Reset form
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
      alert("Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {field.replace("_", " ")}
          </label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white my-2 px-4 py-2 rounded shadow-md transition"
      >
        Save Employee
      </button>
    </form>
  );
}
