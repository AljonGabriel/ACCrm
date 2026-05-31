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
          <div key={department}>
            {/* Department header */}
            <div className="flex items-center justify-between mb-4 pb-3">
              <h3 className="text-2xl font-bold">{department}</h3>
              <span className="text-sm text-gray-600">
                {groupedEmployees[department].length} employees
              </span>
            </div>

            {/* Employee table */}
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Dep</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Contact </th>
                    <th>Endorsed</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedEmployees[department].map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.emp_id}</td>
                      <td className="font-medium">{employee.name}</td>
                      <td>
                        <span>{employee.position}</span>
                      </td>
                      <td>{employee.department}</td>
                      <td>{employee.client}</td>
                      <td>{employee?.email || "N/A"}</td>
                      <td>{employee?.contact || "N/A"}</td>

                      <td>{employee.item_endorsed || "N/A"}</td>
                      <td
                        className={
                          employee.status === "Active"
                            ? "text-success font-bold"
                            : "text-error"
                        }
                      >
                        {employee.status}
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button className="btn btn-xs btn-warning">
                            Update
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
