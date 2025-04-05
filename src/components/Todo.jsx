import { useState } from "react";
import { TodoItems } from "./TodoItems";

export default function Todo({ setStore, store }) {
  const [todo, setTodo] = useState({ name: "", done: false });

  function handleSubmit(e) {
    e.preventDefault();
    setStore([...store, todo]);
    setTodo({ name: "", done: false });
  }

  const sortedTodo = store
    .slice()
    .sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <>
      <div className="py-10">
        {/* Form for adding tasks */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
          <input
            onChange={(e) => setTodo({ name: e.target.value, done: false })}
            type="text"
            value={todo.name}
            placeholder="Enter a task..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </form>

        {/* Displaying the list of tasks */}
        <div className=" container mx-auto max-w-md rounded-md py-4 my-4 flex flex-col items-center bg-amber-50 ">
          {sortedTodo.length === 0 ? (
            <div className="bg-gray-200 w-96 text-black text-xl capitalize font-medium p-4 rounded-md shadow-md hover:bg-gray-300 transition duration-300">
              Nothing todo
            </div>
          ) : (
            sortedTodo.map((item, index) => (
              <div key={index}>
                <TodoItems item={item} store={store} setStore={setStore} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
