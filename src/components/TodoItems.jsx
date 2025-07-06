import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export const TodoItems = ({ item, refetch }) => {
  // console.log("TodoItems:", item.status);
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access");

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.patch(
        `${URL}/task/todo/${taskId}/`, // Adjust this if your endpoint is different
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Status updated");
      // You can optionally update local state here if needed
      if (refetch) refetch();
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `${URL}/task/todo/${taskId}/`, // Adjust this if your endpoint is different
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Status Deleted");
      // You can optionally update local state here if needed
      if (refetch) refetch();
    } catch (error) {
      toast.error("Error deleting status");
      console.error("Error deleting status:", error);
    }
  };

  return (
    <div className="flex flex-col py-2 items-center justify-center transition-all duration-300 ease-in-out transform">
      <div className="bg-gray-200 w-96 text-black text-base p-3 rounded-md shadow-md hover:bg-gray-300 transition duration-300 space-y-2">
        {/* Title & Delete */}
        <div className="flex items-center justify-between">
          <span
            className={`cursor-pointer text-xl font-medium capitalize transition-all duration-300
    ${
      item.status === "completed"
        ? "line-through decoration-2 text-gray-600"
        : item.status === "in_progress"
        ? "text-cyan-600 italic"
        : ""
    }
  `}
          >
            {item.title}
          </span>
          <button
            onClick={() => handleDelete(item.id)}
            className="border-red-600 border-4 py-1 px-2 rounded-md hover:bg-red-600 hover:text-white"
          >
            X
          </button>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-gray-700 italic">{item.description}</p>
        )}

        {/* Priority */}
        <p className="text-sm">
          <span className="font-semibold">Priority:</span>{" "}
          <span
            className={`capitalize font-medium ${
              item.priority === "high"
                ? "text-red-600"
                : item.priority === "medium"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {item.priority}
          </span>
        </p>

        {/* Status (Editable) */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm">Status:</span>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
            className="p-1 border border-gray-300 rounded-md text-sm focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
