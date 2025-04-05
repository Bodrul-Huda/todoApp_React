import React from "react";

export const TodoItems = ({ item, store, setStore }) => {
  function handleDelete(item) {
    setStore(store.filter((todo) => todo !== item));
    // console.log(index);
  }

  function handleMarkDone(name) {
    setStore(
      store.map((todo) =>
        todo.name === name ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  return (
    <div
      className={`flex flex-col py-2 items-center justify-center transition-all duration-300 ease-in-out transform ${
        item.done
          ? "translate-y-2 opacity-60 scale-[0.98]"
          : "translate-y-0 opacity-100 scale-100"
      }`}
    >
      <div className="bg-gray-200 w-96 text-black text-xl capitalize font-medium p-2 rounded-md shadow-md hover:bg-gray-300 transition duration-300">
        <div className="flex items-center justify-between">
          <span
            className={`cursor-pointer transition-all duration-300 ${
              item.done ? "line-through decoration-2 text-gray-600" : ""
            }`}
            onClick={() => handleMarkDone(item.name)}
          >
            {item.name}
          </span>
          <span>
            <button
              onClick={() => handleDelete(item)}
              className="border-red-600 border-4 py-2 px-2 rounded-md hover:bg-red-600 hover:text-white "
            >
              X
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
