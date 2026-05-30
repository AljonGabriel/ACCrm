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
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      {Object.keys(groupedEmployees).map((department) => (
        <div
          key={department}
          className="border rounded-lg shadow-md bg-white p-4"
        >
          {/* Department header */}
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            {department}
          </h3>

          {/* Employee table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left border">Name</th>
                  <th className="px-4 py-2 text-left border">Position</th>
                  <th className="px-4 py-2 text-left border">Department</th>
                  <th className="px-4 py-2 text-left border">Email</th>
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
                    <td className="px-4 py-2 border">{employee.name}</td>
                    <td className="px-4 py-2 border">{employee.position}</td>
                    <td className="px-4 py-2 border">{employee.department}</td>
                    <td className="px-4 py-2 border">{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpTables;
