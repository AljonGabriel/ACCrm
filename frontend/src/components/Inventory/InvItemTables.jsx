import { useEffect, useState } from "react";
import axios from "axios";
import InvDelItemBtn from "./InvDelItemBtn";
import GlobalModal from "../GlobalModal";
import InvUpdateItem from "./InvUpdateItem";

export default function InvItemTables({ employees }) {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/inventory/list")
      .then((res) => setItems(res.data.items || []))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="py-6 space-y-8 overflow-x-auto">
      {/* ✅ General table (newest first, searchable) */}
      <div className="max-w-full">
        <h3 className="text-lg font-semibold mb-2">All Items</h3>
        {/* ✅ Search bar only for general table */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <table className="table-fixed w-full border border-gray-300 rounded-lg shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 border">Category</th>
              <th className="px-2 py-1 border">Item</th>
              <th className="px-2 py-1 border">SN</th>
              <th className="px-2 py-1 border">Status</th>
              <th className="px-2 py-1 border">Stock</th>
              <th className="px-2 py-1 border">Date Added</th>
              <th className="px-2 py-1 border">Endorsed</th>
              <th className="px-2 py-1 border">Actions</th>
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
              .sort((a, b) => new Date(b.date_added) - new Date(a.date_added)) // ✅ newest first
              .map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border">{item.category}</td>
                  <td className="px-2 py-1 border">{item.item_name}</td>
                  <td className="px-2 py-1 border">{item.serial_number}</td>
                  <td className="px-2 py-1 border">{item.status}</td>
                  <td className="px-2 py-1 border">{item.stock}</td>
                  <td className="px-2 py-1 border">{item.date_added}</td>
                  <td className="px-2 py-1 border">
                    {item.endorsed || "Not Endorsed"}
                  </td>
                  <td className="px-2 py-1 border">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded shadow-md transition"
                      >
                        Update
                      </button>
                      <InvDelItemBtn itemId={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Category tables (no search, just grouped) */}
      {Object.keys(groupedItems).map((category) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <table className="min-w-full border border-gray-300 rounded-lg shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border">Name</th>
                <th className="px-2 py-1 border">SN</th>
                <th className="px-2 py-1 border">Status</th>
                <th className="px-2 py-1 border">Stock</th>
                <th className="px-2 py-1 border">Date Added</th>
                <th className="px-2 py-1 border">Endorsed</th>
                <th className="px-2 py-1 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems[category].map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border">{item.item_name}</td>
                  <td className="px-2 py-1 border">{item.serial_number}</td>
                  <td className="px-2 py-1 border">{item.status}</td>
                  <td className="px-2 py-1 border">{item.stock}</td>
                  <td className="px-2 py-1 border">{item.date_added}</td>
                  <td className="px-2 py-1 border">
                    {item.endorsed || "Not Endorsed"}
                  </td>
                  <td className="px-2 py-1 border">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded shadow-md transition"
                      >
                        Update
                      </button>
                      <InvDelItemBtn itemId={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

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
            onUpdated={(updated) => {
              setItems((prev) =>
                prev.map((i) => (i._id === updated._id ? updated : i)),
              );
              setIsModalOpen(false);
            }}
          />
        )}
      </GlobalModal>
    </div>
  );
}
