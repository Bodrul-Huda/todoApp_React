import { useEffect, useState } from "react";
import { TodoItems } from "./TodoItems";
import TodoForm from "./TodoForm";
import axios from "axios";
import Footer from "./Footer";

export default function Todo() {
  const [store, setStore] = useState([]);
  const [show, setShow] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});

  const total = store.length;
  const completed = store.filter((item) => item.status === "completed").length;

  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("access");

  const fetchTasks = async (
    status = null,
    priority = null,
    currentPage = 1
  ) => {
    try {
      const params = { page: currentPage };
      if (status) params.status = status;
      if (priority) params.priority = priority;

      const response = await axios.get(`${URL}/task/todo/`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setStore(response.data.results);
      setPaginationInfo({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(statusFilter, priorityFilter, page);
  }, [statusFilter, priorityFilter, page]);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setPage(1); // Reset to first page when filtering
  };

  const handlePriorityFilter = (priority) => {
    setPriorityFilter(priority);
    setPage(1); // Reset to first page when filtering
  };

  // console.log("Store:", store);
  return (
    <>
      <div className="py-10">
        {/* Form for adding tasks */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShow(!show)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            {show ? "Hide Form" : "Add Task"}
          </button>
        </div>
        {show && <TodoForm setShow={setShow} />}

        {/* Displaying the list of tasks */}
        <div className="container mx-auto flex flex-row justify-center items-start gap-4 py-4">
          <div className="w-32 space-y-2">
            <h2 className="font-semibold text-lg">Status</h2>
            {["pending", "in_progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`w-full ${
                  statusFilter === status ? "bg-blue-400" : "bg-blue-100"
                } hover:bg-blue-300 text-sm capitalize px-2 py-1 rounded-md`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
            <button
              onClick={() => handleStatusFilter(null)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-sm capitalize px-2 py-1 rounded-md mt-2"
            >
              Clear Filter
            </button>
          </div>

          <div className=" container mx-auto justify-center flex flex-col max-w-2/3 rounded-md py-4 my-4 items-center bg-amber-50 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-6">
              {store?.length === 0 ? (
                <div className="bg-gray-200 w-96 text-black text-xl capitalize font-medium p-4 rounded-md shadow-md hover:bg-gray-300 transition duration-300">
                  Nothing todo
                </div>
              ) : (
                store?.map((item, index) => (
                  <div className="flex" key={index}>
                    <TodoItems item={item} refetch={fetchTasks} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-32 space-y-2">
            <h2 className="font-semibold text-lg">Priority</h2>
            {["high", "medium", "low"].map((priority) => (
              <button
                key={priority}
                onClick={() => handlePriorityFilter(priority)}
                className={`w-full ${
                  priorityFilter === priority ? "bg-blue-400" : "bg-blue-100"
                } hover:bg-blue-300 text-sm capitalize px-2 py-1 rounded-md`}
              >
                {priority.replace("_", " ")}
              </button>
            ))}
            <button
              onClick={() => handlePriorityFilter(null)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-sm capitalize px-2 py-1 rounded-md mt-2"
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!paginationInfo.previous}
            className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!paginationInfo.next}
            className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <Footer completed={completed} total={total} />
    </>
  );
}
