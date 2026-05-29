import { useEffect, useState } from "react";
import api from "../../config/axios";

export default function EndorseButton({ item, onEndorsed }) {
  const [employees, setEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    api
      .get("/employee/list")
      .then((res) => setEmployees(res.data.employees || []))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleEndorse = async (empName) => {
    try {
      const res = await api.put(`/inventory/update/${item._id}`, {
        endorsed: empName,
      });
      if (onEndorsed) onEndorsed(res.data.item);
      setShowDropdown(false);
    } catch (err) {
      console.error("Error endorsing item:", err);
      alert("Failed to endorse item");
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${
          item.endorsed
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-600 hover:bg-gray-700"
        } text-white text-xs px-2 py-1 rounded shadow-md transition`}
      >
        {item.endorsed ? item.endorsed : "Endorse to?"}
      </button>

      {showDropdown && (
        <div className="absolute mt-1 bg-white border rounded shadow-lg z-10">
          {employees.map((emp) => (
            <button
              key={emp._id}
              onClick={() => handleEndorse(emp.name)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {emp.name} — {emp.position}
            </button>
          ))}
          <button
            onClick={() => handleEndorse("")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
          >
            Unendorse
          </button>
        </div>
      )}
    </div>
  );
}
