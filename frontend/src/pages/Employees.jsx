import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmpAddForm from "../components/Employees/EmpAddForm";
import GlobalModal from "../components/GlobalModal";
import EmpTables from "../components/Employees/EmpTables";
import api from "../config/axios";

const Employees = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("inventory/list")
      .then((res) => {
        const grouped = res.data.grouped || {};
        const headsetGroup = grouped["Headset"] || [];
        const workingHeadsets = headsetGroup.filter(
          (item) => item.status !== "Defective",
        );
        setItems(workingHeadsets);
        console.log("Headset items (non-defective):", workingHeadsets);
      })
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Page container */}
      <div className="p-6 space-y-6">
        {/* Trigger button */}
        <div className="flex justify-start">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() =>
              document.getElementById("employee_modal").showModal()
            }
          >
            + Add
          </button>
        </div>

        {/* DaisyUI modal */}
        <GlobalModal id="employee_modal" title="New Employee">
          <div className="p-4">
            <EmpAddForm items={items} />
          </div>
        </GlobalModal>

        {/* Employee tables */}
        <div className="mt-6">
          <EmpTables />
        </div>
      </div>
    </>
  );
};

export default Employees;
