import axios from "axios";

export default function InvDelItemBtn({ itemId, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/inventory/delete/${itemId}`,
      );
      alert(res.data.message);

      // ✅ Notify parent to refresh table
      if (onDeleted) onDeleted(itemId);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded shadow-md transition"
    >
      Delete
    </button>
  );
}
