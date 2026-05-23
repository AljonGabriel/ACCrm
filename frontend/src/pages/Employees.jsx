import React from "react";
import Navbar from "../components/Navbar";
import EmpAddForm from "../components/Employees/EmpAddForm";
import GlobalModal from "../components/GlobalModal";
import { useState } from "react";
import EmpTables from "../components/Employees/EmpTables";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <EmpAddForm onSuccess={() => setIsModalOpen(false)} />
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
