import { useEffect, useState } from "react";
import axios from "axios";
import InvDelItemBtn from "./InvDelItemBtn";
import GlobalModal from "../GlobalModal";
import InvUpdateItem from "./InvUpdateItem";

export default function InvItemTables({ employees, items, onSetItems }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Group items by category, excluding defective
  const groupedItems = items.reduce((acc, item) => {
    if (item.status === "Defective") {
      return acc; // ✅ skip defective items
    }
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Filter defective items
  const defectiveItems = items.filter((item) => item.status === "Defective");

  // ✅ Shared table style
  const tableClass =
    "w-full border border-gray-400 rounded-md shadow-sm text-sm";
  const cellClass = "px-2 py-1 border text-center";

  return (
    <div className="py-6 space-y-8 overflow-x-auto">
      {/* ✅ General table (searchable, newest first) */}
      <div className="overflow-x-auto max-w-full border border-gray-400 rounded-md shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold">All Items</h3>
          <small className="text-gray-600">({items.length})</small>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <table className={tableClass}>
          <thead className="bg-gray-100">
            <tr>
              <th className={cellClass}>Category</th>
              <th className={cellClass}>Item</th>
              <th className={cellClass}>SN</th>
              <th className={cellClass}>Status</th>
              <th className={cellClass}>Stock</th>
              <th className={cellClass}>Date Added</th>
              <th className={cellClass}>Endorsed</th>
              <th className={cellClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter(
                (item) =>
                  item.item_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.serial_number
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.status
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  item.endorsed
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
              )
              .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
              .map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className={cellClass}>{item.category}</td>
                  <td className={cellClass}>{item.item_name}</td>
                  <td className={cellClass}>{item.serial_number}</td>
                  <td className={cellClass}>{item.status}</td>
                  <td className={cellClass}>{item.stock}</td>
                  <td className={cellClass}>{item.date_added}</td>
                  <td className={cellClass}>
                    <b>{item.endorsed || "Not Endorsed"}</b>
                  </td>
                  <td className={cellClass}>
                    {item.status === "Defective" ? (
                      <small className="text-red-600 font-semibold">
                        Not Applicable
                      </small>
                    ) : (
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsModalOpen(true);
                          }}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded shadow-sm transition"
                        >
                          Update
                        </button>
                        <InvDelItemBtn
                          itemId={item._id}
                          onSetItems={onSetItems} // pass setter directly
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Category tables */}
      {Object.keys(groupedItems).map((category) => (
        <div
          key={category}
          className="max-w-full border border-gray-400 rounded-md shadow-sm p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{category}</h3>
            <small className="text-gray-600">
              ({groupedItems[category].length})
            </small>
          </div>

          <table className={tableClass}>
            <thead className="bg-gray-100">
              <tr>
                <th className={cellClass}>Name</th>
                <th className={cellClass}>SN</th>
                <th className={cellClass}>Status</th>
                <th className={cellClass}>Stock</th>
                <th className={cellClass}>Date Added</th>
                <th className={cellClass}>Endorsed</th>
                <th className={cellClass}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems[category].map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className={cellClass}>{item.item_name}</td>
                  <td className={cellClass}>{item.serial_number}</td>
                  <td className={cellClass}>{item.status}</td>
                  <td className={cellClass}>{item.stock}</td>
                  <td className={cellClass}>{item.date_added}</td>
                  <td className={cellClass}>
                    <b>{item.endorsed || "Not Endorsed"}</b>
                  </td>
                  <td className={cellClass}>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded shadow-sm transition"
                      >
                        Update
                      </button>
                      <InvDelItemBtn
                        itemId={item._id}
                        onSetItems={onSetItems} // pass setter directly
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* ✅ Defective Items table */}
      {defectiveItems.length > 0 && (
        <div className="overflow-x-auto max-w-full border border-gray-400 rounded-md shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-red-600">
              Defective Items
            </h3>
            <small className="text-gray-600">({defectiveItems.length})</small>
          </div>
          <table className={tableClass}>
            <thead className="bg-gray-100">
              <tr>
                <th className={cellClass}>Item</th>
                <th className={cellClass}>SN</th>
                <th className={cellClass}>Defective Date</th>
                <th className={cellClass}>Defective Issue</th>
                <th className={cellClass}>Last Use (Endorsed By)</th>
              </tr>
            </thead>
            <tbody>
              {defectiveItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className={cellClass}>{item.item_name}</td>
                  <td className={cellClass}>{item.serial_number}</td>
                  <td className={cellClass}>{item.defective_date || "—"}</td>
                  <td className={cellClass}>{item.defective_issue || "—"}</td>
                  <td className={cellClass}>
                    <b>{item.endorsed || "Not Endorsed"}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Single modal outside the loop */}
      <GlobalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Item"
      >
        {selectedItem && (
          <InvUpdateItem
            item={selectedItem}
            employees={employees}
            onSetItems={onSetItems} // pass setter
            onSuccess={() => setIsModalOpen(false)} // close modal
          />
        )}
      </GlobalModal>
    </div>
  );
}
