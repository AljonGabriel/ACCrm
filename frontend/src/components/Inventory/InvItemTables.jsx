import { useEffect, useState } from "react";
import InvDelItemBtn from "./InvDelItemBtn";
import GlobalModal from "../GlobalModal";
import InvUpdateItem from "./InvUpdateItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InvItemTables({ employees, items, onSetItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ New state for category filters
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (items && items.length > 0) {
      setLoading(false);
    }
  }, [items]);

  // Group items by category, excluding defective
  const groupedItems = items.reduce((acc, item) => {
    if (item.status === "Defective") return acc;
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const defectiveItems = items.filter((item) => item.status === "Defective");

  // Skeleton row generator
  const SkeletonRow = ({ cols }) => (
    <tr>
      {Array.from({ length: cols }).map((_, idx) => (
        <td key={idx}>
          <Skeleton height={20} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="py-6 space-y-8 overflow-x-auto">
      {/* ✅ General table */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold">All Items</h3>
          <small className="text-gray-600">({items.length})</small>
        </div>

        {/* Search + Filters */}
        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
            disabled={loading}
          />

          {/* Category filter checkboxes */}
          <div className="flex flex-wrap gap-4">
            {[
              "Headset",
              "Printer",
              "Mouse",
              "Monitor",
              "Keyboard",
              "Laptop",
              "Desktop",
              "Other",
            ].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  checked={selectedCategories.includes(cat)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, cat]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== cat),
                      );
                    }
                  }}
                />
                <small>{cat}</small>
              </label>
            ))}
          </div>
        </div>

        {/* Table */}
        <table className="table table-xs table-fixed w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-28">Category</th>
              <th className="w-40">Item</th>
              <th className="w-32">SN</th>
              <th className="w-24">Status</th>
              <th className="w-20">Stock</th>
              <th className="w-36">Date Added</th>
              <th className="w-40">Endorsed</th>
              <th className="w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <SkeletonRow key={idx} cols={8} />
                ))
              : items
                  .filter((item) => {
                    const matchesSearch =
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
                        .includes(searchTerm.toLowerCase());

                    const matchesCategory =
                      selectedCategories.length === 0 ||
                      selectedCategories.includes(item.category);

                    return matchesSearch && matchesCategory;
                  })
                  .sort(
                    (a, b) => new Date(b.date_added) - new Date(a.date_added),
                  )
                  .map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td>{item.category}</td>
                      <td className="truncate">{item.item_name}</td>
                      <td className="truncate">{item.serial_number}</td>
                      <td>{item.status}</td>
                      <td>{item.stock}</td>
                      <td>{item.date_added}</td>
                      <td>
                        <b>{item.endorsed || "Stock"}</b>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => {
                              setSelectedItem(item);
                              document
                                .getElementById("update_item_modal")
                                .showModal();
                            }}
                          >
                            Update
                          </button>
                          <InvDelItemBtn
                            itemId={item._id}
                            onSetItems={onSetItems}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Category tables */}
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="overflow-x-auto">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{category}</h3>
            <small className="text-gray-600">
              ({groupedItems[category].length})
            </small>
          </div>

          <table className="table table-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-40">Item</th>
                <th className="w-32">SN</th>
                <th className="w-24">Status</th>
                <th className="w-20">Stock</th>
                <th className="w-36">Date Added</th>
                <th className="w-40">Endorsed</th>
                <th className="w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <SkeletonRow key={idx} cols={7} />
                  ))
                : groupedItems[category].map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td>{item.item_name}</td>
                      <td>{item.serial_number}</td>
                      <td>{item.status}</td>
                      <td>{item.stock}</td>
                      <td>{item.date_added}</td>
                      <td>
                        <b>{item.endorsed || "Stock"}</b>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          {/* Trigger button */}
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => {
                              setSelectedItem(item); // <-- make sure you set the item here
                              document
                                .getElementById("update_item_modal")
                                .showModal();
                            }}
                          >
                            Update
                          </button>
                          <InvDelItemBtn
                            itemId={item._id}
                            onSetItems={onSetItems}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      ))}

      {defectiveItems.length > 0 && (
        <div className="overflow-x-auto">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-red-600">
              Defective Items
            </h3>
            <small className="text-gray-600">({defectiveItems.length})</small>
          </div>
          <table className="table table-xs">
            <thead className="bg-gray-100">
              <tr>
                <th>Item</th>
                <th>SN</th>
                <th>Defective Date</th>
                <th>Defective Issue</th>
                <th>Last Use (Endorsed By)</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <SkeletonRow key={idx} cols={5} />
                  ))
                : defectiveItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td>{item.item_name}</td>
                      <td>{item.serial_number}</td>
                      <td>{item.defective_date || "—"}</td>
                      <td>{item.defective_issue || "—"}</td>
                      <td>
                        <b>{item.endorsed || "Not Endorsed"}</b>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Single modal outside the loop */}
      <GlobalModal title="Update Item" id="update_item_modal">
        {selectedItem && (
          <InvUpdateItem
            item={selectedItem}
            employees={employees}
            onSetItems={onSetItems}
          />
        )}
      </GlobalModal>
    </div>
  );
}
