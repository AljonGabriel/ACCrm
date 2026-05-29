import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import InvAddItemForm from "../components/Inventory/InvAddItemForm";
import GlobalModal from "../components/GlobalModal";
import InvItemTables from "../components/Inventory/InvItemTables";
import api from "../config/axios";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/employee/list")
      .then((res) => setEmployees(res.data.employees || []))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  useEffect(() => {
    api
      .get("/inventory/list")
      .then((res) => setItems(res.data.items || []))
      .catch((err) => console.error("Error fetching inventory:", err));
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
            onSetItems={setItems}
            onSuccess={() => setIsModalOpen(false)}
          />
        </GlobalModal>

        <InvItemTables
          employees={employees}
          items={items}
          onSetItems={setItems}
        />
      </div>
    </>
  );
};

export default Inventory;
