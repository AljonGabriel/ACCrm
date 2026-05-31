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
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        Object.keys(groupedEmployees).map((department) => (
          <div key={department} className="card bg-base-100 shadow-xl p-6">
            {/* Department header */}
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-2xl font-bold">{department}</h3>
              <span className="badge badge-outline">
                {groupedEmployees[department].length} employees
              </span>
            </div>

            {/* Employee table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedEmployees[department].map((employee) => (
                    <tr key={employee._id}>
                      <td className="font-medium">{employee.name}</td>
                      <td>
                        <span className="badge badge-info">
                          {employee.position}
                        </span>
                      </td>
                      <td>{employee.department}</td>
                      <td>{employee.email}</td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button className="btn btn-xs btn-warning">
                            Edit
                          </button>
                          <button className="btn btn-xs btn-error">
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
