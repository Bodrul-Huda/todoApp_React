import React from "react";
import Todo from "../components/Todo";
import Footer from "../components/Footer";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="min-h-screen">
        {user ? (
          <Todo />
        ) : (
          <p className="text-gray-500 flex items-center justify-center py-20 font-semibold text-2xl">
            Please sign in to view your tasks.
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
