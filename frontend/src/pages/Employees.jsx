import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import EmpAddForm from "../components/Employees/EmpAddForm";
import GlobalModal from "../components/GlobalModal";
import { useState } from "react";
import EmpTables from "../components/Employees/EmpTables";
import api from "../config/axios";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("inventory/list")
      .then((res) => {
        const grouped = res.data.grouped || {};

        // ✅ Use the correct key from your JSON: "Headset"
        const headsetGroup = grouped["Headset"] || [];

        // ✅ Remove defective items
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

      {/* Trigger button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
      >
        + Add
      </button>

      {/* Global modal with AddItemForm inside */}
      <GlobalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Employee"
      >
        <EmpAddForm onSuccess={() => setIsModalOpen(false)} items={items} />
      </GlobalModal>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Employees Page</h1>
        <p>This is where employee management features will go.</p>
      </div>
      <EmpTables />
    </>
  );
};

export default Employees;
