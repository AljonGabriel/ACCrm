import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AddItemForm from "../components/AddItemForm";
import GlobalModal from "../components/GlobalModal";

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
          + Add Item
        </button>

        {/* Global modal with AddItemForm inside */}
        <GlobalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Inventory Item"
        >
          <AddItemForm onSuccess={() => setIsModalOpen(false)} />
        </GlobalModal>
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <p>Welcome to the Inventory page!</p>
      </div>
    </>
  );
};

export default Inventory;
