import api from "../../config/axios";
import { toast } from "react-toastify";

export default function InvDelItemBtn({ itemId, onSetItems }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await api.delete(`/inventory/delete/${itemId}`);

      // ✅ Toast instead of alert
      toast.success(res.data.message);

      // ✅ Update parent state
      if (onSetItems) {
        onSetItems((prev) => prev.filter((i) => i._id !== itemId));
      }
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response?.data?.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error("Failed to delete item");
      }
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
