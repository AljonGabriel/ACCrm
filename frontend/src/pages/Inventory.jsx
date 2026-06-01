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
          className="btn btn-sm btn-primary mr-2"
          onClick={() => document.getElementById("add_item_modal").showModal()}
        >
          + Add
        </button>

        <button className="btn btn-sm btn-success mr-2">Excel</button>
        <button className="btn btn-sm btn-warning mr-2">Purge</button>

        {/* Global modal with AddItemForm inside */}
        <GlobalModal id="add_item_modal" title="New Item">
          <InvAddItemForm employees={employees} onSetItems={setItems} />
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
