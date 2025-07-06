import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TodoForm = ({ setShow }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
  });

  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.length === 0) {
      toast.error("Please fill in the task details.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/task/todo/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
      });
      toast.success("Task added successfully!");
      setShow(false); // Hide the form after submission
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      console.error(error);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        {/* Task Name */}
        <input
          onChange={handleChange}
          type="text"
          name="title"
          value={formData.title}
          placeholder="Enter a task..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          onChange={handleChange}
          name="description"
          value={formData.description}
          placeholder="Task description..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        {/* Status Radio Buttons */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Priority:</label>
          {["high", "medium", "low"].map((priority) => (
            <label key={priority} className="flex items-center gap-2">
              <input
                type="radio"
                name="priority"
                value={priority}
                checked={formData.priority === priority}
                onChange={handleChange}
              />
              <span className="capitalize">{priority}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
