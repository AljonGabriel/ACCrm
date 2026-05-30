import React, { useState, useEffect } from "react";
import api from "../../config/axios";

const EmpTables = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api
      .get("/employee/list")
      .then((res) => setEmployees(res.data.employees || []))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const groupedEmployees = employees.reduce((acc, employee) => {
    const department = employee.department || "Unassigned";
    if (!acc[department]) acc[department] = [];
    acc[department].push(employee);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-10">
      {Object.keys(groupedEmployees).length === 0 ? (
        <p className="text-center text-gray-600">No employees found.</p>
      ) : (
        Object.keys(groupedEmployees).map((department) => (
          <div
            key={department}
            className="border rounded-xl shadow-lg bg-white p-6"
          >
            {/* Department header */}
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-2xl font-semibold text-gray-800">
                {department}
              </h3>
              <span className="text-sm text-gray-500">
                {groupedEmployees[department].length} employees
              </span>
            </div>

            {/* Employee table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left border">Name</th>
                    <th className="px-4 py-3 text-left border">Position</th>
                    <th className="px-4 py-3 text-left border">Department</th>
                    <th className="px-4 py-3 text-left border">Email</th>
                    <th className="px-4 py-3 text-center border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedEmployees[department].map((employee, idx) => (
                    <tr
                      key={employee._id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="px-4 py-3 border font-medium text-gray-800">
                        {employee.name}
                      </td>
                      <td className="px-4 py-3 border">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">
                          {employee.position}
                        </span>
                      </td>
                      <td className="px-4 py-3 border text-gray-600">
                        {employee.department}
                      </td>
                      <td className="px-4 py-3 border text-gray-600">
                        {employee.email}
                      </td>
                      <td className="px-4 py-3 border text-center">
                        <div className="flex justify-center gap-2">
                          <button className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmpTables;
