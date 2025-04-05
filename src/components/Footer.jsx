import React from "react";

const Footer = ({ doneTodos, total }) => {
  return (
    <div className="bg-blue-500 text-white text-3xl font-bold p-4 shadow-lg text-center">
      <div className="flex justify-center items-center mx-auto mt-4">
        <span className="text-lg font-semibold text-black p-2 px-4">
          Total Todos: {total}
        </span>
        <span className="text-lg font-semibold text-white p-2 px-4">
          Completed: {doneTodos}
        </span>
      </div>
    </div>
  );
};

export default Footer;
