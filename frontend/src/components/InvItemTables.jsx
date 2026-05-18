import GlobalModal from "./GlobalModal";
import InvUpdateItem from "./InvUpdateItem";
import { useEffect, useState } from "react";
import axios from "axios";
import InvDelItemBtn from "./InvDelItemBtn";

export default function InvItemTables() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/inventory/list")
      .then((res) => setItems(res.data.items || []))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="py-6 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Inventory Items</h2>

      {Object.keys(groupedItems).map((category) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          <table className="min-w-full border border-gray-300 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">SN</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Stock</th>
                <th className="px-4 py-2 border">Date Added</th>
                <th className="px-4 py-2 border">Endorsed</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems[category].map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.category}</td>
                  <td className="px-4 py-2 border">{item.item_name}</td>
                  <td className="px-4 py-2 border">{item.serial_number}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">{item.stock}</td>
                  <td className="px-4 py-2 border">{item.date_added}</td>
                  <td className="px-4 py-2 border">{item.endorsed}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item); // ✅ set the clicked item
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
            onUpdated={(updated) => {
              // Replace updated item in state
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
