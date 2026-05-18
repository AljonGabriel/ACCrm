import React, { useState } from "react";
import Navbar from "../components/Navbar";
import InvAddItemForm from "../components/Inventory/InvAddItemForm";
import GlobalModal from "../components/GlobalModal";
import InvItemTables from "../components/Inventory/InvItemTables";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <InvAddItemForm onSuccess={() => setIsModalOpen(false)} />
        </GlobalModal>

        <InvItemTables />
      </div>
    </>
  );
};

export default Inventory;
