import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const EmpTables = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedemployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/employee/list")
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
    <>
      {Object.keys(groupedEmployees).map((department) => (
        <div key={department}>
          <h3 className="text-lg font-semibold mb-2">{department}</h3>
          <table className="min-w-full border border-gray-300 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Position</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {groupedEmployees[department].map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{employee.name}</td>
                  <td className="px-4 py-2 border">{employee.position}</td>
                  <td className="px-4 py-2 border">{employee.department}</td>
                  <td className="px-4 py-2 border">{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default EmpTables;
