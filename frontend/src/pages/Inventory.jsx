import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import InvAddItemForm from "../components/Inventory/InvAddItemForm";
import GlobalModal from "../components/GlobalModal";
import InvItemTables from "../components/Inventory/InvItemTables";
import axios from "axios";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/employee/list")
      .then((res) => setEmployees(res.data.employees || []))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
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
          title="New Item"
        >
          <InvAddItemForm
            employees={employees}
            onSuccess={() => setIsModalOpen(false)}
          />
        </GlobalModal>

        <InvItemTables employees={employees} />
      </div>
    </>
  );
};

export default Inventory;
